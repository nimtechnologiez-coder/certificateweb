const fs = require('fs');
const https = require('https');
const path = require('path');

const fileUrl = 'https://github.com/google/fonts/raw/main/ofl/greatvibes/GreatVibes-Regular.ttf';
const dest = path.join(__dirname, 'server', 'fonts', 'GreatVibes-Regular.ttf');

const file = fs.createWriteStream(dest);
console.log(`Downloading to ${dest}...`);

https.get(fileUrl, function (response) {
    response.pipe(file);
    file.on('finish', function () {
        file.close(() => {
            console.log('✅ Download completed.');
            const stats = fs.statSync(dest);
            console.log(`File size: ${stats.size} bytes`);
        });
    });
}).on('error', function (err) {
    fs.unlink(dest);
    console.error('❌ Error downloading:', err.message);
});
