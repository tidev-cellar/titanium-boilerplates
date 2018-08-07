# typescript-classic-app

> Use TypeScript to develop your classic Axway Titanium app.

A very simple greeter example app written in TypeScript.

# Try it out

Navigate to this directory and run

```bash
# Install dependencies
npm i

# Import the project to your organization
appc new --import

# Run the app
appc run -p [android|ios]
```

# What's included?
- [x] TypeScript support for your classic Axway Titanium app.
- [x] A basic `tsconfig.json` prepared to work with classic Titanium.
- [x] Linting setup in `tslint.json`. Run `npm run lint` to lint all our TypeScript files inside the `Resources` folder.
- [x] Full typings for the `Ti` namespace.
- [x] Visual Studio Code workspace settings to hide `.js` files if a matching `.ts` file is present.

# How it works

This project uses a [pre-compile hook](hooks/pre-compile.js) to compile TypeScript files down to JavaScript which can then be processed as usual by Titanium.

TypeScript compiler options can be set in [tsconfig.json](tsconfig.json). You can edit your linting rules to fit your needs in [tslint.json](tslint.json).

> :bulb: Open this folder directly with VSCode to get full intelisense support with code completion.