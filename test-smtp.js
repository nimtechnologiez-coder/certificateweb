const nodemailer = require('nodemailer');
require('dotenv').config();

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

console.log('Running Isolated SMTP Test...');
console.log('User:', emailUser);
console.log('Password length:', emailPass ? emailPass.length : 0);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailUser,
        pass: emailPass
    }
});

transporter.verify((err, success) => {
    if (err) {
        console.error('❌ VERIFICATION FAILED:', err.message);
        console.log('Please ensure 2-Step Verification is ON and you used a 16-character App Password.');
    } else {
        console.log('✅ VERIFICATION SUCCESSFUL! Your credentials are correct.');

        console.log('Sending a test email to yourself...');
        transporter.sendMail({
            from: emailUser,
            to: emailUser,
            subject: 'SMTP Test Successful',
            text: 'If you receive this, your certificate system is ready to go!'
        }, (sendErr, info) => {
            if (sendErr) {
                console.error('❌ SEND FAILED:', sendErr.message);
            } else {
                console.log('✅ TEST EMAIL SENT! Check your inbox (and spam).');
                process.exit(0);
            }
        });
    }
});
