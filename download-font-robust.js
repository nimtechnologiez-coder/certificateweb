const https = require('https');
const fs = require('fs');
const path = require('path');

const dest = path.join(__dirname, 'server', 'fonts', 'GreatVibes-Regular.ttf');
const url = 'https://github.com/google/fonts/raw/main/ofl/greatvibes/GreatVibes-Regular.ttf';

function download(url, dest, cb) {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, function (response) {
        // Handle redirect
        if (response.statusCode === 301 || response.statusCode === 302) {
            console.log(`Redirecting to: ${response.headers.location}`);
            return download(response.headers.location, dest, cb);
        }

        response.pipe(file);
        file.on('finish', function () {
            file.close(cb);
        });
    }).on('error', function (err) {
        fs.unlink(dest);
        if (cb) cb(err.message);
    });
}

download(url, dest, (err) => {
    if (err) console.error('Error:', err);
    else {
        const stats = fs.statSync(dest);
        console.log(`✅ Download finished. File size: ${stats.size} bytes`);
    }
});
