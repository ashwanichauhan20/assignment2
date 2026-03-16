# Professional MERN Stack Portfolio

A dynamic, full-stack portfolio website built with MongoDB, Express, React, and Node.js. This project features a password-protected Admin Dashboard for real-time management of projects, skills, and contact messages.

## 🚀 Features

- **Dynamic Content:** Projects and Skills are fetched from MongoDB, not hardcoded.
- **Admin Dashboard:**
  - Secure Login system with JWT.
  - CRUD operations for Projects (Add, Edit, Delete).
  - Manage Skills (Add, Delete).
  - View incoming contact form messages.
- **Automated Notifications:** Receives email alerts via Nodemailer whenever a new message is submitted.
- **Modern UI:** Built with React and Material-UI for a premium, responsive experience.

## 🛠️ Tech Stack

- **Frontend:** React, Material-UI, Axios, Vite.
- **Backend:** Node.js, Express, JWT, Bcrypt, Nodemailer.
- **Database:** MongoDB.

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-link>
   cd assignment2
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file based on `.env.example`.
   - Run `node seed.js` to populate initial data.
   - Start server: `npm run dev`.

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

## 🔐 Admin Access
- **Path:** `/admin`
- **Default Credentials:** Defined in your `.env` file.
