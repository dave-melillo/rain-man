const fs = require('fs');
const path = require('path');

// Create a minimal 1x1 transparent PNG and scale it conceptually
// For a real PWA, you'd want to generate proper icons, but this works as a placeholder

// This is a base64-encoded 1x1 transparent PNG
const transparentPNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// For MVP, we'll just copy the same placeholder for both sizes
// In production, you'd generate proper sized icons

const publicDir = path.join(__dirname, '..', 'public');

// Create minimal placeholder PNG files
const pngBuffer = Buffer.from(transparentPNG, 'base64');

fs.writeFileSync(path.join(publicDir, 'icon-192.png'), pngBuffer);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), pngBuffer);

console.log('✓ Created placeholder icon files');
console.log('  Note: For production, replace with proper 192x192 and 512x512 PNG icons');
console.log('  SVG icon available at /icon.svg');
