require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const initDb = require('./db');
const { generateCertificate } = require('./certificate');
const { sendCertificateEmail } = require('./mailer');

const VERSION = "2.0.0-REFACTORED";
console.log(`[System] Starting Webinar Server Version: ${VERSION}`);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

let db;

// Registration Endpoint
app.post('/api/register', async (req, res) => {
    const { name, email, studentId } = req.body;
    try {
        await db.run(
            'INSERT INTO students (name, email, student_id) VALUES (?, ?, ?)',
            [name, email, studentId]
        );
        res.json({ success: true, message: 'Registration successful!' });
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }
        res.status(500).json({ success: false, message: 'Database error.' });
    }
});

// Admin: Get all students for the table
app.get('/api/admin/students', async (req, res) => {
    try {
        const students = await db.all('SELECT * FROM students ORDER BY registered_at DESC');
        res.json({ success: true, students });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to fetch students.' });
    }
});

// Admin: Delete a student
app.delete('/api/admin/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await db.run('DELETE FROM students WHERE id = ?', [id]);
        res.json({ success: true, message: 'Student deleted successfully.' });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to delete student.' });
    }
});

// Admin: Bulk Issue Certificates
app.post('/api/admin/issue-all', async (req, res) => {
    try {
        const students = await db.all('SELECT * FROM students WHERE certificate_sent = 0');

        if (students.length === 0) {
            return res.json({ success: true, message: 'No pending certificates to issue.' });
        }

        const results = [];
        for (const student of students) {
            try {
                const dateStr = student.registered_at ? new Date(student.registered_at).toLocaleDateString() : new Date().toLocaleDateString();
                const buffer = await generateCertificate(student.name, dateStr, student.student_id);
                await sendCertificateEmail(student.email, student.name, buffer);
                await db.run('UPDATE students SET certificate_sent = 1 WHERE id = ?', [student.id]);
                results.push({ status: 'fulfilled', value: student.email });

                // 200ms delay to keep SMTP connection stable
                await new Promise(resolve => setTimeout(resolve, 200));
            } catch (err) {
                console.error(`Failed to send to ${student.email}:`, err);
                results.push({ status: 'rejected', reason: err.message || err });
            }
        }

        res.json({
            success: true,
            message: `Processed ${results.length} certificates.`,
            results
        });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to process bulk issuance.' });
    }
});

app.get('/api/admin/test-email', async (req, res) => {
    const { email } = req.query;
    if (!email) return res.status(400).json({ success: false, message: 'Email query param required.' });

    try {
        const buffer = await generateCertificate('Test User');
        await sendCertificateEmail(email, 'Test User', buffer);
        res.json({ success: true, message: `Test email sent successfully to ${email}!` });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || err });
    }
});

const PORT = process.env.PORT || 5000;

process.on('uncaughtException', (err) => {
    console.error('CRITICAL: Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('CRITICAL: Unhandled Rejection at:', promise, 'reason:', reason);
});

initDb().then(database => {
    db = database;
    app.listen(PORT, () => {
        console.log(`🚀 Server Version ${VERSION} running on port ${PORT}`);
    });
}).catch(err => {
    console.error('❌ Database Initialization Failed:', err);
});
