# Chronic Disease Management System 
 
A **full-stack healthcare management application** built with **React and ASP.NET Core Web API** that enables healthcare providers to manage patient records and monitor basic health metrics. 
 
This project demonstrates modern **full-stack development practices including REST API design, frontend–backend integration, and database management using Entity Framework.** 
 
Repository:   
https://github.com/Karumudi-Karthika/chronic-disease-management 
 
--- 
 
# Features 
 
- Create, update, and delete patient records   
- Form validation for: 
  * Australian phone numbers   
  * Email validation (`@gmail.com`)   
  * Date of birth format (`YYYY-MM-DD`) 
 
- Patient metrics dashboard displaying: 
  * Total patients 
  * Average patient age 
 
- Sequential patient numbering automatically updated after deletions 
 
- Scrollable and responsive table for patient records 
 
- UI notifications for successful updates and deletions 
 
- Responsive interface with navigation tabs: 
  * Patient List
  * Add Patient 
 
--- 
 
# Tech Stack 
 
## Frontend 
- React 
- Axios 
- React Router 
- JavaScript 
- HTML / CSS 
 
## Backend 
- ASP.NET Core Web API (.NET 10) 
- Entity Framework Core 
- SQLite 
--- 
 
# Project Structure 

chronic-disease-management
│
├── backend
│ ├── Controllers
│ ├── Models
│ ├── Data
│ └── Program.cs
│
├── frontend
│ ├── components
│ ├── pages
│ ├── services
│ └── App.js

--- 
 
# Running the Project Locally 
 
## 1. Clone the Repository 
 
```bash 
git clone https://github.com/Karumudi-Karthika/chronic-disease-management 

## 2. Run the Backend 

cd backend 
dotnet run 

Backend runs on: http://localhost:5000 

## 3. Run the Frontend 

cd frontend 
npm install 
npm start 

Frontend runs on: http://localhost:3000 

 
```markdown 
## Screenshots 
 
![Dashboard](screenshots/dashboard.png) 
