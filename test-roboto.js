const { createCanvas, registerFont } = require('canvas');
const path = require('path');

try {
    const fontPath = path.join(__dirname, 'server', 'fonts', 'Roboto-Regular.ttf');
    console.log('Registering Roboto from:', fontPath);
    registerFont(fontPath, { family: 'Roboto' });
    console.log('✅ Roboto registered successfully.');

    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Roboto';
    ctx.fillText('Hello Roboto', 10, 50);
    console.log('✅ Text drawn with Roboto.');
} catch (err) {
    console.error('❌ Error with Roboto:', err);
}
