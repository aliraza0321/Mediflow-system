
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
 
## 🗄️ Database Setup (CMD / XAMPP)

1. Start MySQL from XAMPP Control Panel
   
2. Start MySQL Command Line(Open CMD)
```bash
mysql -u root -p
```
3. Create Database:
```bash
CREATE DATABASE medicare;
USE medicare;
```
4. Import SQL File:
```bash
cd Mediflow-system
mysql -u root medicare < backend\src\database\Medicare.sql
```




Notes:
- Default user: root
- Default password: empty (XAMPP)
- If error occurs, re-import SQL file



---
##  Features

### Core Features

* Patient Management
* Appointment Booking
* Staff Management
* Treatment Handling

---


## Object-Oriented Programming (OOP) Principles

The application is built around the four fundamental pillars of Object-Oriented Programming, ensuring data integrity and logical separation of code.

### 1. Encapsulation
**Concept:** Bundling data and the methods that operate on that data into a single unit (a class), while restricting direct access to some of the object's components.
**How we followed it:** 
Our classes strictly control their internal state. For example, the `UserRepository` encapsulates the `this.database` property. A Controller cannot reach in and manually alter `userRepository.database.users[0]`. Instead, the outside world must use the safe, public methods exposed by the class, such as `userRepository.create(user)` or `userRepository.findById(id)`. This prevents accidental data corruption and enforces strict data boundaries.

### 2. Abstraction
**Concept:** Hiding complex implementation details and showing only the essential features of the object.
**How we followed it:** 
Our Service layer acts as a powerful abstraction over complex business rules. When the `DoctorController` needs a list of a doctor's patients, it simply calls `this.doctorService.getAssignedPatients(doctorId)`. 
The Controller has no idea *how* this works—it is completely abstracted away from the fact that the Service must fetch appointments, extract unique patient IDs, fetch patient records, verify patient existence, and map the final data structure. By hiding this complexity behind a simple method signature, our Controllers remain exceptionally clean and readable.

### 3. Inheritance
**Concept:** A mechanism where a new class derives properties and behaviors from an existing class.
**How we followed it:** 
While our architecture heavily favors Composition over Inheritance (using Dependency Injection) to avoid rigid class hierarchies, we utilize Inheritance exactly where it shines: Custom Error Handling. 
Our `AppError` class uses the `extends` keyword to inherit from Node.js's built-in `Error` class (`class AppError extends Error`). This allows `AppError` to gain standard error behaviors (like capturing stack traces) while allowing us to add custom properties like HTTP `statusCode` and `details`.

### 4. Polymorphism
**Concept:** The ability to present the same interface for differing underlying forms (data types or classes).
**How we followed it:** 
In JavaScript, polymorphism is achieved seamlessly through "duck typing". Our Services expect a specific shape (methods) from the Repositories injected into them, rather than a strict class type. 
This means we can pass a completely different database repository (e.g., a `PostgresUserRepository`) into the `DoctorService`. Because the new repository polymorphically implements the same expected methods (like `findById()`), the Service will execute perfectly without caring about the underlying form of the object it was given. Furthermore, our global Error Handler acts polymorphically by catching both standard `Error` instances and custom `AppError` instances, formatting the HTTP response dynamically based on the type of error it receives.




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


Here is the highly polished, beautifully formatted version of that specific structure. It places the Creational patterns (Factory and Singleton) first as requested, and features refined, professional explanations for maximum clarity:


##  Design Patterns

To prevent tight coupling and ensure the codebase remains maintainable as it scales, we have heavily utilized several industry-standard design patterns. 

### Creational Patterns 
   
*   **Singleton Pattern :** 
    We strictly ensure that heavy, globally-shared resources most notably our database instance are created exactly once during the application lifecycle. By initializing the `database` at the root level (`app.js`) and injecting that exact same instance downward into all repositories, we naturally achieve an application-wide Singleton. This prevents memory leaks, eliminates connection pooling issues, and ensures all services remain perfectly in sync.
    
*   **Factory Method Pattern:** 
    Complex object creation is centralized using Factory methods rather than standard constructors. For example, our `InMemoryDatabase.build()` method encapsulates the complex, asynchronous logic required to seed initial data before returning a fully initialized database instance. This keeps our class constructors strictly synchronous, predictable, and free of heavy initialization logic.
    

### Structural Patterns
*   **Repository Pattern:** 
    We completely abstract our data-access layer using this pattern. Instead of polluting our core business logic with raw database queries, our Services interact with Repositories through clean, predictable interfaces (e.g., `userRepository.findByEmail()`). This creates a hard architectural boundary, ensuring our application remains entirely agnostic to the underlying storage mechanism.
    
*   **Dependency Injection (DI) Pattern:** 
    Instead of allowing classes to hardcode their own dependencies (e.g., calling `new UserRepository()` inside a Service), we "invert control" by injecting those dependencies directly into class constructors from the outside. This makes the entire system incredibly modular, loosely coupled, and allows us to effortlessly inject mock objects during unit testing to ensure complete isolation.


    
*   **Chain of Responsibility Pattern:** 
    This pattern is heavily utilized via our Express.js middleware architecture. When an incoming HTTP request enters the application, it passes sequentially through a predefined chain of handler functions (CORS validation -> JSON Parsing -> Route Controllers -> Global Error Handler). Each link in the chain acts independently to either process the request, modify the payload, or safely pass it down to the next link.
  
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



##  Resources

* https://react.dev
* https://nodejs.org

---
