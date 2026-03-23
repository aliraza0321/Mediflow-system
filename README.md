 #  Hospital Patient Management System

A web-based application designed to manage hospital operations including patient records, staff management, appointments, and treatments.

---

##  Project Overview

The **Hospital Patient Management System** is a full-stack web application developed to streamline and digitize hospital operations. It allows efficient management of:

* Patient records
* Appointment scheduling
* Treatment processes
* Billing system

###  Target Users

* Doctors
* Nurses
* Administrators
* Receptionists
* Patients

###  Purpose

* Replace manual record-keeping
* Reduce human errors
* Ensure secure & organized data management

---

##  Key Features

* Patient Registration
* Appointment Booking
* Staff Availability Checking
* Medical Record Management
* Report Generation

---

##  Authors

* **Ali Raza (Team Lead)** – Frontend Development
  🔗 https://github.com/aliraza0321

* **Abdul Rafay** – Backend Development
  🔗 https://github.com/rafay35349

* **Abdul Ahad** – API Integration
  🔗 https://github.com/ahad5616107-web

* **Irtaza Hussain** – Database & Documentation
  🔗 https://github.com/IrtazaHussain11223

---

##  Folder Hierarchy

```
hospital-patient-management-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── config/
│   └── package.json
│
├── database/
│   └── schema.sql
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
git clone https://github.com/aliraza0321/hospital-patient-management-system.git
cd hospital-patient-management-system
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
DB_PASSWORD=yourpassword
DB_NAME=hospital_db
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
* Billing System

---

###  Implementation Status

| Feature        | Status      | Description         |
| -------------- | ----------- | ------------------- |
| Login System   | In Progress | Authentication      |
| Patient System | In Progress | Manage patient data |
| Appointment    | In Progress | Scheduling          |
| Billing System | Planned     | Payments            |

---

##  Limitations

### Current Limitations

* No real-time notifications
* Basic UI

### Known Issues

* Slow API responses
* UI responsiveness needs improvement

---

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
