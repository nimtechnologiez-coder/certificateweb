const { generateCertificate } = require('./server/certificate');
const fs = require('fs');
const path = require('path');

async function test() {
    try {
        const buffer = await generateCertificate('DHANUSH', '06/02/2026', 'NIM-2026-001');
        const outputPath = path.join(__dirname, 'final-certificate-check.png');
        fs.writeFileSync(outputPath, buffer);
        console.log('✅ Final validation certificate saved to:', outputPath);
    } catch (err) {
        console.error('❌ Failed to generate certificate:', err);
    }
}

test();
