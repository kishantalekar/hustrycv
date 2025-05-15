/* scripts/patch-draggable-flatlist.js */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Adjust this path if your structure is different:
const filePath = path.resolve(
  __dirname,
  '../node_modules/react-native-draggable-flatlist/src/components/NestableDraggableFlatList.tsx',
);

if (!fs.existsSync(filePath)) {
  console.error('❌ NestableDraggableFlatList.tsx not found!');
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Replace findNodeHandle with direct ref access
content = content.replace(
  /const nodeHandle = findNodeHandle\(scrollableRef\.current\);/g,
  'const nodeHandle = scrollableRef.current;',
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('✅ react-native-draggable-flatlist patched successfully!');
