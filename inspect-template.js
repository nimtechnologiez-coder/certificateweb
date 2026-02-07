const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function test() {
    const templatePath = path.join(__dirname, 'server', 'assets', 'certificate-template.png');
    const template = await loadImage(templatePath);
    const canvas = createCanvas(template.width, template.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(template, 0, 0, template.width, template.height);
    fs.writeFileSync('blank-template.png', canvas.toBuffer());
    console.log('✅ Blank template saved.');
}

test();
