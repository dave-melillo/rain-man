// Simple icon generator using Canvas API
// This creates placeholder icons for the PWA

const fs = require('fs');
const { createCanvas } = require('canvas');

function generateIcon(size, outputPath) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background (casino dark)
  ctx.fillStyle = '#0d0d1a';
  ctx.fillRect(0, 0, size, size);

  // Casino chip circle
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.35;

  // Outer ring (gold)
  ctx.fillStyle = '#ffc107';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.fill();

  // Inner circle (felt green)
  ctx.fillStyle = '#0f3d3e';
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius * 0.8, 0, 2 * Math.PI);
  ctx.fill();

  // Text "RM"
  ctx.fillStyle = '#ffc107';
  ctx.font = `bold ${size * 0.25}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RM', centerX, centerY);

  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Generated ${outputPath}`);
}

// Check if canvas package is available
try {
  require.resolve('canvas');
  generateIcon(192, './public/icon-192.png');
  generateIcon(512, './public/icon-512.png');
} catch (e) {
  console.log('Canvas package not available, creating placeholder files...');
  // Create minimal valid PNG files as fallback
  const placeholder192 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  const placeholder512 = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==', 'base64');
  
  fs.writeFileSync('./public/icon-192.png', placeholder192);
  fs.writeFileSync('./public/icon-512.png', placeholder512);
  console.log('Created placeholder icon files (install canvas package for proper icons)');
}
