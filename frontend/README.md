# MediFlow Frontend

This is the frontend of the **MediFlow Hospital Management System**, built using **React.js** and **Tailwind CSS**. It provides a modern UI for doctors, patients, and staff to interact with the system.

---

##  Overview

The frontend is a role-based web application that allows:

- Doctors to manage patients, prescriptions, and appointments
- Patients to book appointments and rate doctors
- Staff to manage users and support operations

---

##  User Roles

###  Doctor
- View dashboard
- Manage patients
- View appointments
- Create prescriptions
- Access pharmacy (medicine stock)
- View profile

###  Patient
- View doctors
- Book appointments
- View own appointments
- Rate doctors
- View profile

###  Staff
- Manage users
- View hospital records
- Handle support queries
- View profile

---

##  Features

- Role-based login system (Doctor / Patient / Staff)
- Dashboard for each role
- Appointment management system
- Prescription creation system
- Medicine inventory (Pharmacy)
- Doctor rating system
- Profile management
- Contact & feedback forms
- Responsive UI with Tailwind CSS

---

## Project Structure


frontend/
├── src/
│ ├── components/  components (Sidebar, Navbar, etc.)
│ ├── pages/ # Pages for Doctor, Patient, Staff
│ │
│ ├── layouts/ # Layouts (MainLayout)
│ ├── routes/ # Routing logic
│ ├── App.jsx # Main app component
│ └── main.jsx # Entry point
│
├── public/ # Static files
├── package.json
├── vite.config.js
└── tailwind.config.js


---

##  Tech Stack

| Technology     | Purpose |
|---------------|--------|
| React.js      | UI Development |
| Tailwind CSS  | Styling |
| React Router  | Routing |
| Fetch API     | API calls |

---

## Installation & Setup

###  Navigate to frontend (could switch between memory mod and db mod)

```bash
cd frontend
 Install dependencies
npm install
 Run the application
npm run dev
 Runs on:
http://localhost:5173
