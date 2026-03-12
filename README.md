# Chronic Disease Management System

A **full-stack healthcare management application** built with **React and ASP.NET Core Web API**, enabling healthcare providers to manage patient records, monitor vitals, and assess health risks in real time.

This project demonstrates end-to-end full-stack development including REST API design, frontend–backend integration, form validation, and relational database management using Entity Framework Core.

🔗 **Live Repo:** https://github.com/Karumudi-Karthika/chronic-disease-management

---

## Screenshots

### Patients Dashboard
![Patients Table](screenshots/patients-table.png)

### Add Patient
![Add Patient](screenshots/add-patient.png)

### Vitals & Risk Indicator
![Vitals](screenshots/vitals.png)

---

## Features

- **Patient Record Management** — Create, update, and delete patient records with sequential auto-numbering
- **Chronic Disease Tracking** — Assign diseases (Diabetes, Hypertension, Asthma, Heart Disease, etc.) to each patient
- **Vitals Monitoring** — Record temperature, heart rate, and blood pressure per patient
- **Risk Assessment** — Automatic 🟢 Low / 🟡 Medium / 🔴 High risk classification based on vitals
- **Analytics Dashboard** — Real-time metrics including total patient count, average age, and disease breakdown
- **Form Validation** — Australian phone number format, Gmail validation, and date of birth (YYYY-MM-DD)
- **Notifications** — In-app success/error notifications for all CRUD operations
- **REST API** — Clean RESTful endpoints with full CRUD support via ASP.NET Core Web API

---

## Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React | UI framework |
| Axios | HTTP client for API integration |
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
├── Backend/                     # ASP.NET Core Web API
│   ├── Controllers/
│   │   ├── PatientsController.cs
│   │   └── VitalsController.cs
│   ├── Models/
│   │   ├── Patient.cs
│   │   └── Vital.cs
│   ├── Data/
│   │   └── ChronicDbContext.cs
│   ├── Program.cs
│   ├── appsettings.json
│   └── Backend.csproj
│
├── src/                         # React Frontend
│   ├── components/
│   │   ├── ConfirmationDialog.js
│   │   └── Notification.js
│   ├── pages/
│   │   ├── Patients.js
│   │   └── AddOrEditPatient.js
│   ├── services/
│   │   └── api.js
│   └── App.js
│
├── screenshots/
├── public/
└── README.md
```

---

## API Endpoints

### Patients
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients` | Retrieve all patient records |
| GET | `/api/patients/{id}` | Retrieve a specific patient |
| POST | `/api/patients` | Create a new patient record |
| PUT | `/api/patients/{id}` | Update an existing patient |
| DELETE | `/api/patients/{id}` | Delete a patient record |

### Vitals
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/vitals?patientId={id}` | Get vitals for a specific patient |
| POST | `/api/vitals` | Record new vitals |
| PUT | `/api/vitals/{id}` | Update vitals |
| DELETE | `/api/vitals/{id}` | Delete vitals |

---

## Risk Assessment Logic

| Condition | Risk Level |
|-----------|------------|
| BP Systolic > 140 OR multiple abnormal readings | 🔴 High Risk |
| BP Systolic > 120 OR one abnormal reading | 🟡 Medium Risk |
| All readings within normal range | 🟢 Low Risk |

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
cd Backend
dotnet restore
ASPNETCORE_ENVIRONMENT=Development dotnet run
```
Backend API runs on: **http://localhost:5000**  
Swagger UI: **http://localhost:5000/swagger**

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
- **Entity Framework Core** — Code-first database with automatic schema creation on startup
- **Frontend–backend integration** — Axios service layer abstracts all API calls from UI components
- **Form validation** — Client-side validation for Australian phone formats, email, and date fields
- **Risk engine** — Vitals-based risk scoring logic built into the frontend

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

**Karumudi Karthika** — Full Stack Developer with experience building full-stack applications.

- 🔗 [LinkedIn](https://linkedin.com/in/karumudi-karthika)
- 💻 [GitHub](https://github.com/Karumudi-Karthika)
- 📧 karthika.karumudi11@gmail.com
