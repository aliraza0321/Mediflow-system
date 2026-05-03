 #  MediFlow System

A web-based application designed to manage hospital operations including patient records, staff management, appointments, and treatments.

---

##  Project Overview

The **MediFlow System** is a full-stack web application developed to streamline and digitize hospital operations. It allows efficient management of:

- Managing patient records
- Scheduling appointments
- Handling prescriptions
- Managing hospital staff
- Tracking medicine inventory
- 
###  Target Users

* Doctors
* Staff
* Patients

###  Purpose

* Replace manual record-keeping
* Reduce human errors
* Ensure secure & organized data management

---

## Key Features

- Role-based authentication (Doctor / Patient / Staff)
- Appointment booking system
- Patient record management
- Prescription system
- Medicine inventory tracking
- Staff management dashboard
- Feedback & rating system
---

##  Authors

* **Ali Raza (Team Lead)** – Frontend Development
  🔗 https://github.com/aliraza0321

* **Abdul Rafay** – Backend Development & API integration 
  🔗 https://github.com/rafay35349

* **Abdul Ahad** – Frontend & Backend connection 
  🔗 https://github.com/ahad5616107-web

* **Irtaza Hussain** – Database & Documentation
  🔗 https://github.com/IrtazaHussain11223

---

##  Folder Hierarchy

```
Mediflow-system/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── DoctorProfile.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PatientProfile.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── StaffProfile.jsx
│   │   ├── layout/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── CreatePrescription.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── ManageUsers.jsx
│   │   │   ├── Medicine.jsx
│   │   │   ├── MyAppointments.jsx
│   │   │   ├── PatientDashboard.jsx
│   │   │   ├── Patients.jsx
│   │   │   ├── Prescriptions.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── RateDoctor.jsx
│   │   │   ├── Records.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── StaffDashboard.jsx
│   │   │   └── Support.jsx
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── config/
│   │   └──database/
│   │         └── schema.sql
|   │         └── queries.sql      
│   └── package.json
│
├   
│
└── README.md
```

---

##  Tech Stack

###  Frontend

| Technology   | Purpose        |
| ------------ | -------------- |
| React.js     | UI Development |
| Axios        | HTTP Requests  |
| Tailwind CSS | Styling        |

###  Backend

| Technology | Purpose             |
| ---------- | ------------------- |
| Node.js    | Runtime Environment |
| Express.js | Backend Framework   |
| MySQL      | Database            |

## Database Design
| Component    | Description                                      |
|-------------|--------------------------------------------------|
| Patients    | Stores patient information and records           |
| Staff       | Stores hospital staff data                       |
| Appointments| Manages scheduling between patients and doctors  |
| Admissions  | Tracks patient admissions and discharges         |
| Pharmacy    | Tracks medicine stock                            |

---

##  APIs & Services

| Service  | Purpose                          |
| -------- | -------------------------------- |
| REST API | Frontend ↔ Backend Communication |

---

##  Installation & Setup

###  Prerequisites

* Node.js (v18 or above)
* MySQL
* Git

---

### 1️ Clone Repository

```bash
git clone https://github.com/aliraza0321/Mediflow-system.git
cd Mediflow
```

---

### 2️ Install Dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

---

###  Environment Configuration

Create `.env` file in **backend** folder:

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=medicare
```

---

##  Run the Project

###  Backend

```bash
cd backend
npm run dev
```

 Runs on: http://localhost:3000

---

###  Frontend

```bash
cd frontend
npm start
```

 Runs on: http://localhost:5173

---

##  Features

### Core Features

* Patient Management
* Appointment Booking
* Staff Management
* Treatment Handling

---



##  ALL OOP PRINCIPALS FOLLOWED 

##  SOLID Principles

* **SRP** → Each class has one responsibility
* **OCP** → Extend without modifying
* **LSP** → Subclasses replace parent safely
* **ISP** → Small interfaces
* **DIP** → Depend on abstractions

---

##  Design Patterns

### MVC Pattern

* Separates Model, View, Controller

### Repository Pattern

* Abstracts database operations

---

##  API Documentation

### Endpoints

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /api/patients     | Get all patients |
| POST   | /api/patients     | Add patient      |
| PUT    | /api/patients/:id | Update patient   |
| DELETE | /api/patients/:id | Delete patient   |

---

### Example Request

```json
POST /api/patients

{
  "name": "Ali",
  "age": 22
}
```

---

##  Future Improvements

* Real-time notifications
* Better UI/UX
* Role-based authentication

---

##  Resources

* https://react.dev
* https://nodejs.org

---
