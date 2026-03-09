# Chronic Disease Management System

A full-stack application built with **React** (frontend) and **.NET Core 10** (backend) for managing patient records in a healthcare context. 

### Features
- Add, edit, and delete patients
- Form validation for phone (Australian format), email (@gmail.com), and date of birth (YYYY-MM-DD)
- Metrics dashboard showing **total patients** and **average age**
- Sequential numbering of patients, updated after deletion
- Scrollable, styled table for easy viewing
- Notifications for successful edits and deletions
- Responsive design with tabs for Patients / Add Patient

### Tech Stack
- Frontend: React, Axios, React Router
- Backend: .NET Core Web API, Entity Framework, SQLite
- Styling: Inline CSS (can be migrated to CSS modules or Tailwind)
- Deployment-ready on Vercel (frontend) + Railway/Heroku (backend)

### Usage
1. Clone the repo
2. Run backend: `dotnet run` inside `/backend`
3. Run frontend: `npm install && npm start` inside  `frontend`
4. Open `http://localhost:3000` to interact with the app