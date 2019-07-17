# webpack-classic-app

> Use WebPack to develop your classic Axway Titanium app.

Load and transform all your assets with Webpack (incl. easy use of Node modules in Titanium)

## Try it out

Navigate to this directory and run

```bash
# Install dependencies
npm i

# Run the app
ti build -p [android|ios]
```

## What's included?

- [x] Webpack support for your classic Axway Titanium app.
- [x] Linting setup in `eslint.yml`. Run `npm run lint` to lint all our JavaScript files inside the `app/src` folder.
- [x] Easy use of Node modules in Titanium thanks to Webpack bundling.

## How it works

This project uses a [pre-compile hook](hooks/pre-compile.js) to run Webpack.

Webpack configuration can be found in [app/webpack.config.js](app/webpack.config.js). It contains a default configuration that will use `app/src/main.js` as the entry point and transpile all Javascript code with Babel. Change loaders and plugins to configure your favorite dev tools to work in Titanium.

You can edit your linting rules to fit your needs in [.eslintrc.yml](.eslintrc.yml).

## Directory structure

Compared to a normal Titanium classic project you don't work directly on the `Resources` directory. This directory will be managed by Webpack and all your files should be under the `app` folder instead.

The following directories are configured in the default Webpack configuration:

| Path | Description |
| --- | --- |
| `app/src` | All your JavaScript sources should be in this directory. |
| `app/assets` | Contains assets such as images. |

## Platform specific JavaScript
