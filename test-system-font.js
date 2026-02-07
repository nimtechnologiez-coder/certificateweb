const { createCanvas } = require('canvas');

try {
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillText('Hello World', 10, 50);
    console.log('✅ Text drawn with Arial successfully.');
} catch (err) {
    console.error('❌ Error with Arial:', err);
}
