Task Manager Application

A simple React.js + Tailwind CSS Task Manager application with CRUD operations, filtering, search, login, and session management.

Features

Login System: Email/password stored in sessionStorage, redirects to dashboard.

Task Management (CRUD): Add, edit, delete tasks; toggle complete/pending.

Filtering & Search: Filter by All/Completed/Pending/Priority; search by title/description (case-insensitive, debounced).

Session Management: User session persists until browser tab is closed.

Task Reminder: Simulated cron logs pending tasks every 20 seconds.

Responsive UI: Gradient background, rounded cards with shadow/hover, colorful priority badges.


Technologies Used

React.js, Tailwind CSS, React Router DOM

Installation

git clone https://github.com/Bhavana44444/Task-Manager.git
cd task-manager
npm install
npm start

Runs at http://localhost:3000

Usage

1. Login with any email/password


2. Add, edit, delete tasks


3. Toggle completion status


4. Filter and search tasks


5. Logout when done



Project Structure

task-manager/
├── src/
│   ├── components/ Login.jsx
│   ├── pages/ Dashboard.jsx
│   ├── App.js
│   └── index.css
├── package.json
├── README.md
└── tailwind.config.js

Author

Bhavana Biradar
Email: bhavanabiradar4@gmail.com
