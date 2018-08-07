# typescript-alloy-app

> Use TypeScript to develop your Alloy based Titanium app.

# Try it out

Navigate to this directory and run

```bash
npm i # Install dependencies
appc new --import # Import the project to your organization
appc run -p [android|ios] # Run the app
```

# How it works

This project uses a [pre-compile hook](hooks/pre-compile.js) to compile TypeScript files down to JavaScript which can then be processed as usual by Titanium.

TypeScript compiler options can be set in [tsconfig.json](tsconfig.json).

> :bulb: Open this folder directly with VSCode to get full intelisense support with code completion and the correct path mappings for `import` statements from the `app/lib` folder.