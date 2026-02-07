const { generateCertificate } = require('./server/certificate');
const fs = require('fs');
const path = require('path');

async function test() {
    try {
        console.log('Generating certificate with new template...');
        const buffer = await generateCertificate('Test Student');
        fs.writeFileSync('test-cert-output.png', buffer);
        console.log('✅ Certificate generated successfully: test-cert-output.png');
    } catch (err) {
        console.error('❌ Error generating certificate:', err);
    }
}

test();
