const nodemailer = require('nodemailer');
require('dotenv').config();

// Simple, direct reading
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    },
    // Adding pool for bulk support
    pool: true,
    maxConnections: 1,
    rateDelta: 1000,
    rateLimit: 1
});

// Test connection on boot
transporter.verify((error, success) => {
    if (error) {
        console.log('--- SMTP ERROR REPORT ---');
        console.log('User:', emailUser);
        console.log('Pass Length:', emailPass ? emailPass.length : 0);
        console.error('Error Details:', error.message);
        console.log('-------------------------');
    } else {
        console.log(`✅ SMTP Connection SUCCESSFUL for ${emailUser}`);
    }
});

async function sendCertificateEmail(studentEmail, name, certificateBuffer) {
    const mailOptions = {
        from: `"Webinar Academy" <${emailUser}>`,
        to: studentEmail,
        subject: `Success! Your Certificate for ${name}`,
        text: `Hello ${name},\n\nCongratulations on completing the webinar! Attached is your certificate.\n\nBest regards,\nNIM Academy Team`,
        attachments: [
            {
                filename: `certificate_${name.replace(/\s+/g, '_')}.png`,
                content: certificateBuffer
            }
        ]
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendCertificateEmail };
