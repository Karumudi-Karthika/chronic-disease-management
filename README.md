# Chronic Disease Management System

A **full-stack healthcare management application** built with **React and ASP.NET Core Web API**, enabling healthcare providers to manage patient records, monitor health metrics, and receive real-time UI notifications.

This project demonstrates end-to-end full-stack development including REST API design, frontend–backend integration, form validation, and relational database management using Entity Framework Core.

🔗 **Live Repo:** https://github.com/Karumudi-Karthika/chronic-disease-management

---

## Features

- **Patient Record Management** — Create, update, and delete patient records with sequential auto-numbering
- **Form Validation** — Australian phone number format, email validation, and date of birth (YYYY-MM-DD)
- **Analytics Dashboard** — Real-time metrics including total patient count and average patient age
- **Responsive UI** — Scrollable patient table with navigation tabs (Patient List / Add Patient)
- **Notifications** — In-app success/error notifications for all CRUD operations
- **REST API** — Clean RESTful endpoints with full CRUD support via ASP.NET Core Web API

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React | UI framework |
| Axios | HTTP client for API integration |
| React Router | Client-side navigation |
| JavaScript (ES6+) | Application logic |
| HTML5 / CSS3 | Markup and responsive styling |

### Backend
| Technology | Purpose |
|------------|---------|
| ASP.NET Core Web API (.NET 10) | REST API framework |
| Entity Framework Core | ORM and database management |
| SQLite | Relational data persistence |
| C# | Server-side logic |

---

## Architecture

```
chronic-disease-management/
│
├── ChronicDiseaseApp1/          # ASP.NET Core Web API (Backend)
│   ├── Controllers/             # API endpoint controllers
│   ├── Models/                  # Data models
│   ├── Data/                    # EF Core DbContext
│   └── Program.cs               # App entry point and middleware config
│
├── src/                         # React Frontend
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Page-level components
│   ├── services/                # Axios API service layer
│   └── App.js                   # Root component and routing
│
├── public/                      # Static assets
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Retrieve all patient records |
| GET | `/api/patients/{id}` | Retrieve a specific patient |
| POST | `/api/patients` | Create a new patient record |
| PUT | `/api/patients/{id}` | Update an existing patient |
| DELETE | `/api/patients/{id}` | Delete a patient record |

---

## Getting Started

### Prerequisites
- [.NET 10 SDK](https://dotnet.microsoft.com/download)
- [Node.js](https://nodejs.org/) (v18+)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/Karumudi-Karthika/chronic-disease-management
cd chronic-disease-management
```

### 2. Run the Backend
```bash
cd ChronicDiseaseApp1
dotnet restore
dotnet run
```
Backend API runs on: **http://localhost:5000**

### 3. Run the Frontend
```bash
cd ..
npm install
npm start
```
Frontend runs on: **http://localhost:3000**

---

## Key Implementation Details

- **REST API design** — Clean separation of concerns with Controllers, Models, and Data layers
- **Entity Framework Core** — Code-first database approach with migrations for schema management
- **Frontend–backend integration** — Axios service layer abstracts all API calls from UI components
- **Form validation** — Client-side validation for Australian phone formats, email, and date fields
- **Responsive design** — Mobile-friendly layout with CSS-based responsive components

---

## What I'd Improve With More Time

- Migrate from SQLite to PostgreSQL for production-grade data persistence
- Add TypeScript to the React frontend for stronger type safety
- Implement unit tests (xUnit for backend, Jest/React Testing Library for frontend)
- Add a GitHub Actions CI/CD pipeline for automated build and test on push
- Add authentication using JWT tokens
- Deploy frontend to Vercel and backend to Azure App Service

---

## About the Developer

**Karumudi Karthika** — Full Stack Developer with 3 years of enterprise experience building fintech platforms at Fiserv.

- 🔗 [LinkedIn](https://linkedin.com/in/karumudi-karthika)
- 💻 [GitHub](https://github.com/Karumudi-Karthika)
- 📧 karthika.karumudi11@gmail.com
