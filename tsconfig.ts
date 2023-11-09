{
    "compilerOptions": {
      "module": "CommonJS",
      // Import non-ES modules as default imports.
      "esModuleInterop": true,
      // Target latest version of ECMAScript.
      "target": "ES2022",
      // Process & infer types from .js files.
      "allowJs": false,
      // Enable strictNullChecks & noImplicitAny.
      "strictNullChecks": true,
      "noImplicitAny": true,
      "strict": true,
      "strictFunctionTypes": false,
      "noImplicitThis": false,
      // Search under node_modules for non-relative imports.
      "moduleResolution": "node",
      // Import .json files
      "resolveJsonModule": true,
      "sourceMap": true,
      "outDir": "build",
      "baseUrl": ".",
      "paths": {
        "*": ["node_modules/*", "src/types/*"]
      }
    },
    "include": ["app.ts", "src/**/*"],
    "exclude": [".templates"]
  }
  