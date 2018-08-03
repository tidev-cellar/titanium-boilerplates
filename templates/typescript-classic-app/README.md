# typescript-classic-app

> Use TypeScript to develop your classic Titanium app.

# Try it out

Navigate to this directory and run

```bash
appc new --import
appc run -p [android|ios]
```

# How it works

This project uses a [pre-compile hook](hooks/pre-compile.js) to compile TypeScript files down to JavaScript which can then be processed as usual by Titanium.

TypeScript compiler options can be set in [tsconfig.json](tsconfig.json).