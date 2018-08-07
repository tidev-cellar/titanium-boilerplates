declare function require(moduleName: string): any;

// You can't use import statements in a classic app.js file.
// As a workaorund just move your code to another file and require it here.
// In all other files you can write your TypeScript code as usual.
// tslint:disable-next-line:no-var-requires
require('./lib/bootstrap');
