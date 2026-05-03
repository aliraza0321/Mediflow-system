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
│   │   ├── config/
│   │   │   ├── env.js
│   │   │   └── roles.js
│   │   ├── controllers/
│   │   │   ├── AppointmentController.js
│   │   │   ├── AuthController.js
│   │   │   ├── DoctorController.js
│   │   │   ├── PatientController.js
│   │   │   ├── PrescriptionController.js
│   │   │   ├── RatingController.js
│   │   │   └── StaffController.js
│   │   ├── core/
│   │   │   ├── errors/
│   │   │   │   └── AppError.js
│   │   │   ├── middleware/
│   │   │   │   ├── authenticate.js
│   │   │   │   ├── authorize.js
│   │   │   │   └── errorHandler.js
│   │   │   └── utils/
│   │   │       ├── asyncHandler.js
│   │   │       └── validators.js
│   │   ├── database/
│   │   │   ├── Medicare.sql
│   │   │   └── repareMedicare.sql
│   │   ├── domain/
│   │   │   └── entities/
│   │   │       ├── Appointment.js
│   │   │       ├── DoctorRating.js
│   │   │       ├── Medicine.js
│   │   │       ├── Prescription.js
│   │   │       ├── SupportTicket.js
│   │   │       └── User.js
│   │   ├── infrastructure/
│   │   │   ├── database/
│   │   │   ├── inMemoryDatabase.js
│   │   │   ├── mariaDb.js
│   │   │   └── seedData.js
│   │   ├── repositories/
│   │   │   ├── AppointmentRepository.js
│   │   │   ├── MedicineRepository.js
│   │   │   ├── PrescriptionRepository.js
│   │   │   ├── RatingRepository.js
│   │   │   ├── SupportRepository.js
│   │   │   └── UserRepository.js
│   │   ├── routes/
│   │   │   └── index.js
│   │   ├── services/
│   │   │   ├── AppointmentService.js
│   │   │   ├── AuthService.js
│   │   │   ├── DoctorService.js
│   │   │   ├── MedicineService.js
│   │   │   ├── PatientService.js
│   │   │   ├── PrescriptionService.js
│   │   │   ├── RatingService.js
│   │   │   ├── RecordService.js
│   │   │   ├── StaffService.js
│   │   │   ├── SupportService.js
│   │   │   └── UserPresenter.js
│   │   ├── app.js
│   │   └── server.js
│   ├── test/
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── package-lock.json
│   └── package.json
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

 Here is a more refined, elaborative, and highly professional version of the S.O.L.I.D. principles section, perfect for a high-quality `README.md`:


### S.O.L.I.D. Principles

Our architecture rigorously adheres to the five S.O.L.I.D. principles to guarantee that the application remains highly modular, resistant to bugs during refactoring, and easy to scale.

*   **[S] Single Responsibility Principle (SRP):** 
    We enforce a strict separation of concerns across our N-Tier architecture so that no class ever attempts to do more than one job. 
    *   **Controllers** act exclusively as the entry and exit points of the application, handling HTTP lifecycles, extracting request data, and formatting JSON responses. 
    *   **Services** contain 100% of the core business rules and logic computations, completely unaware of HTTP context. 
    *   **Repositories** are dedicated solely to database transactions and data persistence. 
    This modularity ensures that a change in database logic will never accidentally break an HTTP endpoint route.

*   **[O] Open/Closed Principle (OCP):** 
    The application is designed to be fully open for extension, but completely closed for modification. By abstracting our data access layer, we can seamlessly introduce new features or infrastructure without rewriting existing code. For example, to migrate from our current `InMemoryDatabase` to MongoDB, we only need to write a new `MongoRepository` class and inject it. The existing `Service` and `Controller` classes require zero modifications to accommodate this massive infrastructure change.

*   **[L] Liskov Substitution Principle (LSP):** 
    We guarantee that any object can be replaced by an instance of a subtype without altering the correctness of the program. In our JavaScript environment, this is implemented via dynamic "duck-typing" and strict adherence to API contracts. Any repository dependency passed into a service can be safely substituted with an entirely different implementation (such as replacing a real database repository with a mock repository for unit testing), provided it exposes the expected method signatures like `findById()`. The Service layer will continue to function flawlessly.

*   **[I] Interface Segregation Principle (ISP):** 
    Clients should never be forced to depend on interfaces or methods they do not use. Instead of passing a monolithic, bloated object (like a global `database` instance) into our services, we inject only the highly specific, segregated repositories they actually require. For instance, the `DoctorService` is explicitly injected with the `userRepository`, `appointmentRepository`, and `ratingRepository`, but is completely isolated from the `medicineRepository`. This tight scoping prevents unintended data access and reduces the cognitive overhead of the class.

*   **[D] Dependency Inversion Principle (DIP):** 
    High-level policy modules (like our Controllers and Services) absolutely do not depend on low-level detail modules (like raw Database connections or ORMs). Instead, both depend on abstractions. We invert the traditional flow of control by instantiating database connections at the very top level of the application (`app.js`) and **injecting** them downwards into the constructors of our classes. Because our business logic only interacts with these injected abstractions, our system is loosely coupled and exceptionally easy to mock and unit test.
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
