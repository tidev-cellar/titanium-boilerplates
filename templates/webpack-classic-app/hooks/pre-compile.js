'use strict';

const { exec, execSync, spawn } = require('child_process');
const crypto = require('crypto');
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');
const which = require('which');

const AppcdClient = resolveAppcdClient();
const globalAppcdBinaryPath = which.sync('appcd', { nothrow: true });

exports.id = 'ti.webpack';
exports.init = (logger, config, cli) => {
	const projectPath = path.resolve(cli.argv['project-dir']);
	// @todo make this configurable
	const webpackConfigPath = path.join(projectPath, 'app', 'webpack.config.js');

	const webpackService = new WebpackService({
		logger,
		projectPath,
		configPath: webpackConfigPath
	});

	cli.on('build.pre.construct', (builder, callback) => {
		webpackService.connectToDaemon().then(callback, callback);
	});

	cli.on('build.pre.compile', {
		priority: 800,
		post(builder, callback) {
			webpackService.env = {
				production: builder.deployType === 'production',
				platform: cli.argv.platform
			}

			webpackService.ensureWebpackIsRunning(cli.argv)
				.then(() => webpackService.subcribeToWebpackStatusChanges())
				.then(() => webpackService.waitForCompilationComplete())
				.then(callback)
				.catch(callback);
		}
	});
};

function resolveAppcdClient() {
	try {
		return require('appcd-client').default;
	} catch { }
	const globalModulesPath = execSync('npm root -g').toString().trim();
	const globalAppcdClienPackagePath = path.join(globalModulesPath, 'appcd', 'node_modules', 'appcd-client');
	if (!fs.existsSync(globalAppcdClienPackagePath)) {
		throw new Error('Could not find the appcd-client package. Please install the Appcelerator Daemon ("npm i -g appcd") or use the Appcelerator CLI.');
	}
	var packageJson = JSON.parse(fs.readFileSync(path.join(globalAppcdClienPackagePath, 'package.json')).toString());
  var globalAppcdClientMainPath = path.join(globalAppcdClienPackagePath, packageJson.main);
  return require(globalAppcdClientMainPath).default;
}

class WebpackService {
	constructor(options) {
		this.client = new AppcdClient();
		this.logger = options.logger;
		this.debugLog = message => {
			this.logger.debug(`[${'Webpack'.cyan}] ${message}`);
		};
		this.options = options;
		this.env = {};
		this.appcdCommand =  globalAppcdBinaryPath ? 'appcd' : 'appc appcd';
		this.jobIdentifier = this.generateJobIdentifier(options.configPath);
		this.pluginVersion = 'latest';
		this.basePath = `/webpack/${this.pluginVersion}`;
		this.webpackStatusEmitter = new EventEmitter();
		this.webpackStatus = { state: 'unknown' };
	}

	connectToDaemon() {
		return new Promise((resolve, reject) => {
			this.client
				.connect({ startDaemon: true })
				.on('connected', () => {
					this.debugLog('Succesfully connected to Appc Daemon');
					resolve();
				})
				.on('error', err => {
					this.debugLog(`Failed to connected to Appc Daemon. ${err}`);
					reject(err);
				});
		});
	}

	ensureWebpackIsRunning(argv) {
		this.debugLog('Making sure Webpack build job is running');

		const useHot = argv.hot ? true : false;
		const options = {
			identifier: this.jobIdentifier,
			projectPath: this.options.projectPath,
			configPath: this.options.configPath,
			env: this.env,
			hot: useHot
		};

		return new Promise((resolve, reject) => {
			this.client
				.request({
					path: `${this.basePath}/status`,
					data: options
				})
				.once('response', response => {
					if (response.state === 'error') {
						this.debugLog('Webpack build job is running but in error state, restarting...');
						this.startWebpack(options).then(resolve, reject);
					} else if (response.state === 'ready') {
						this.debugLog('Webpack build job running and up-to-date.');
						this.webpackStatus = response;
						return resolve();
					} else {
						// @todo check options and restart webpack if neccessary
					}
				})
				.once('error', error => {
					this.debugLog('Webpack not running, requesting appcd to start new Webpack instance');
					this.startWebpack(options).then(resolve, reject);
				});
		});
	}

	subcribeToWebpackStatusChanges() {
		if (this.webpackStatus.state === 'ready') {
			return Promise.resolve();
		}

		this.debugLog('Subscribing to Webpack status changed');

		return new Promise((resolve, reject) => {
			this.client
				.request({
					path: `${this.basePath}/status/${this.jobIdentifier}`,
					type: 'subscribe'
				})
				.on('response', response => {
					if (typeof response === 'string' && response === 'Subscribed') {
						this.debugLog('Succesfully subscribed for Webpack status changes!');
						return resolve();
					}

					this.webpackStatusEmitter.emit('changed', response)
				})
				.on('error', err => {
					reject(err);
				});
		})
	}

	waitForCompilationComplete() {
		if (this.webpackStatus.state === 'ready') {
			return Promise.resolve();
		}

		this.logger.info('Waiting for Webpack compilation to complete...');

		return new Promise((resolve, reject) => {
			this.webpackStatusEmitter.on('changed', status => {
				this.debugLog(`Webpack status changed from ${this.webpackStatus.state.cyan} to ${status.state.cyan}`);
				this.webpackStatus = status;

				switch (status.state) {
					case 'ready': return resolve()
					case 'error': return reject(new Error(status.error));
				}
			});

			// @todo what to do in this case? Give useful tips!
			setTimeout(() => reject(new Error('Did not receive success message from Webpack appcd plugin within 30s, aborting...')), 30000);
		});
	}

	startWebpack(options) {
		this.debugLog(`Starting Webpack with options: ${JSON.stringify(options)}`);

		return new Promise((resolve, reject) => {
			this.client
				.request({
					path: `${this.basePath}/start`,
					data: options
				})
				.once('response', resolve)
				.once('error', reject);
		});
	}

	generateJobIdentifier(webpackConfigPath) {
		const hash = crypto.createHash('sha1');
		hash.update(webpackConfigPath);
		return hash.digest('hex');
	}
}
