/* scripts/patch-zustand.js */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Adjust this path if your structure is different:
const filePath = path.resolve(
  __dirname,
  '../node_modules/zustand/esm/middleware.mjs',
);

if (!fs.existsSync(filePath)) {
  console.error('❌ Zustand middleware.mjs not found!');
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Replace any import.meta.env.MODE checks with React Native's __DEV__
content = content.replace(
  /\(import\.meta\.env\s?\?\s?import\.meta\.env\.MODE\s?:\s?(?:void 0|undefined)\)\s?!==\s?"production"/g,
  '__DEV__',
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ Zustand patched successfully!');
