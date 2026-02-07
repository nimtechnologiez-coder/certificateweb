const opentype = require('opentype.js');
const path = require('path');

const fontPath = path.join(__dirname, 'server', 'fonts', 'GreatVibes-Regular.ttf');

opentype.load(fontPath, function (err, font) {
    if (err) {
        console.error('❌ Font could not be loaded:', err);
    } else {
        console.log('✅ Font loaded successfully!');
        const textPath = font.getPath('Hello World', 0, 0, 72);
        console.log('✅ Path generated:', textPath.commands.length, 'commands');
    }
});
