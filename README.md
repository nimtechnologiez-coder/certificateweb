# 🎓 Webinar Certificate Automation System

A high-performance, professional system for conducting webinars, tracking student attendance, and automatically issuing certificates to 300+ participants in seconds.

## ✨ Features

- **Modern Landing Page**: Premium "Glassmorphism" UI for student registration.
- **Attendance Verification**: Secure check-in system using unique Email IDs.
- **Bulk Certificate Engine**: Generates high-quality certificates on-the-fly using Node-Canvas.
- **Auto-Mailing**: Concurrent email delivery with certificate attachments.
- **Admin Dashboard**: One-click trigger for bulk processing.

## 🛠️ Project Structure

```text
├── public/                 # Frontend assets
│   ├── index.html          # Student landing & registration
│   ├── admin.html          # Admin dashboard
│   ├── css/style.css       # Premium design system
│   └── js/app.js           # Frontend logic
├── server/                 # Backend system
│   ├── index.js            # Express server & API
│   ├── db.js               # SQLite database setup
│   ├── certificate.js      # Image generation logic
│   └── mailer.js           # Email delivery service
├── .env                    # Configuration (Credentials)
└── package.json            # Dependencies
```

## 🚀 Setup Instructions

### 1. Installation
Install the required dependencies:
```bash
npm install
```

### 2. Configure Email (Gmail)
1. Go to your [Google Account](https://myaccount.google.com/security).
2. Enable **2-Step Verification**.
3. Create an **App Password** (search for "App Passwords" in the search bar).
4. Update your `.env` file:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
PORT=5000
```

### 3. Run the System
Start the server:
```bash
node server/index.js
```

## 📖 Usage Guide

### For Students
1. **Registration**: Students visit `http://localhost:5000/index.html` and register.
2. **Attendance**: During the webinar, students go to the **Attendance** section and verify their email.

### For Hosts (Admin)
1. Go to `http://localhost:5000/admin.html`.
2. See the total number of verified attendees.
3. Click **Issue Certificates Now** to send all certificates automatically.

## 🎨 Customizing the Certificate
To use your own design:
1. Create a `server/assets/` folder.
2. Add your design as `certificate-template.png` (Recommended size: 2000x1414px).
3. The system will automatically detect and use your image, placing the student's name in the center.

---
Built with ❤️ for rapid webinar management.
