const { createCanvas, registerFont } = require('canvas');
const path = require('path');

try {
    const fontPath = path.join(__dirname, 'server', 'fonts', 'GreatVibes-Regular.ttf');
    console.log('Registering font from:', fontPath);
    registerFont(fontPath, { family: 'GreatVibes' });
    console.log('Font registered.');

    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    ctx.font = '30px "GreatVibes"';
    ctx.fillText('Hello World', 10, 50);
    console.log('Text drawn with GreatVibes.');

    ctx.font = '30px Arial';
    ctx.fillText('Hello World', 10, 100);
    console.log('Text drawn with Arial.');
} catch (err) {
    console.error('CRITICAL ERROR:', err);
}
