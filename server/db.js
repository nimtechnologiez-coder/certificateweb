const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

async function initDb() {
    const db = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            student_id TEXT,
            registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            attended BOOLEAN DEFAULT 0,
            certificate_sent BOOLEAN DEFAULT 0
        )
    `);

    return db;
}

module.exports = initDb;
