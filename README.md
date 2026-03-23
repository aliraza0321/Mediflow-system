 '''
 # Hospital Patient Management System

A web-based application designed to manage hospital operations including patient records, staff management, appointments, and treatments.

---

# Project Overview

The Hospital Patient Management System is a full-stack web application developed to streamline and digitize hospital operations. It allows efficient management of patient records, appointment scheduling, treatment processes, and billing within a centralized system.

The target users of this system include hospital staff such as doctors, nurses, administrators, and receptionists, as well as patients. This application solves the problem of manual record-keeping, reduces human errors, and ensures secure and organized data management.

Key features include patient registration, appointment booking, staff availability checking, medical record handling, and report generation. The system improves communication between different roles and enhances overall hospital efficiency.

---

# Authors


Ali Raza (Team Lead)| Front-end development| https://github.com/aliraza0321

Abdul Rafay |Backend Development| https://github.com/rafay35349

Abdul Ahad | API Integration| https://github.com/ahad5616107-web

Irtaza Hussain | Testing & Documentation| https://github.com/IrtazaHussain11223

---

# Folder Hierarchy

hospital-patient-management-system/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ └── App.jsx
│ └── package.json
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── services/
│ │ └── config/
│ └── package.json
│
├── database/
│ └── schema.sql
│
└── README.md

---

# Tech Stack

Frontend

Technology | Purpose
React.js | User Interface Development
Axios| HTTP Requests
Tailwind CSS| Styling

---

# Backend

Technology | Purpose
Node.js| Runtime Environment
Express.js| Backend Framework
MySQL| Database

---

# APIs & Services

Service | Purpose
REST API| Communication between frontend and backend

---

# Installation and Setup Instructions

Prerequisites

- Node.js (v18 or above)
- MySQL
- Git

---

Step 1: Clone the Repository

git clone https://github.com/aliraza0321/hospital-patient-management-system.git
cd hospital-patient-management-system

---

Step 2: Install Dependencies

cd backend
npm install

cd ../frontend
npm install

---

# Environment Configuration

Create a ".env" file in the backend directory:

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=hospital_db

---

# How to Run the Project

Terminal 1 (Backend)

cd backend
npm run dev

Backend will run at: http://localhost:3000

---

Terminal 2 (Frontend)

cd frontend
npm start

Frontend will run at: http://localhost:5173

---

# Features

Core Features

- Patient Registration and Record Management
- Appointment Booking System
- Staff Management
- Medicine and Treatment Handling
- Billing System

---

# Implemented Features

Feature | Status| Description
Login System | In Progress | User authentication
Patient Management |  In Progress| Manage patient data
Appointment System | In Progress| Booking and scheduling
Billing System |  Planned| Payment handling

---

# Limitations

Current Limitations

1. No real-time notifications
2. Basic user interface

---

Known Issues

- Some APIs may respond slowly
- UI responsiveness needs improvement

---

# SOLID Principles Implemented

# Single Responsibility Principle (SRP)

Each class handles a single responsibility.

class PatientService {
  createPatient() {}
  getPatient() {}
}

---

# Open/Closed Principle (OCP)

class Payment {
  process() {}
}

class CashPayment extends Payment {}
class CardPayment extends Payment {}

---

# Liskov Substitution Principle (LSP)

Subclasses can replace their parent class without affecting functionality.

---

# Interface Segregation Principle (ISP)

Small, specific interfaces are used instead of large ones.

---
 
# Dependency Inversion Principle (DIP)

High-level modules depend on abstractions, not concrete implementations.

---

# Design Patterns Implemented

# MVC Pattern

- Category: Architectural
- Purpose: Separates concerns (Model, View, Controller)

---

# Repository Pattern

- Category: Structural
- Purpose: Abstracts database operations

---

# API Documentation

Endpoints

Method | Endpoint| Description
GET | /api/patients| Get all patients
POST | /api/patients| Add new patient
PUT | /api/patients/:id| Update patient
DELETE | /api/patients/:id| Delete patient

---

Example Request

POST /api/patients

{
  "name": "Ali",
  "age": 22
}

---

# Future Improvements

- Add real-time notifications
- Improve UI/UX
- Implement role-based authentication

---

# Resources

- https://react.dev
- https://nodejs.org

---
'''
