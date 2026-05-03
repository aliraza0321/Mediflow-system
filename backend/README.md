# MediFlow Express Backend

Backend scaffolded around the frontend contract from `Mediflow-system-main/frontend`.


## Stack

- Express
- JavaScript (CommonJS)
- JWT authentication
- bcrypt password hashing
- Layered architecture with controllers, services, repositories, and entities
- - **Database:** MySQL / MariaDB via `mysql2`

## Project structure

```backend/
├── src/
│   ├── config/
│   │   ├── env.js
│   │   └── roles.js
│   ├── controllers/
│   │   ├── AppointmentController.js
│   │   ├── AuthController.js
│   │   ├── DoctorController.js
│   │   ├── PatientController.js
│   │   ├── PrescriptionController.js
│   │   ├── RatingController.js
│   │   └── StaffController.js
│   ├── core/
│   │   ├── errors/
│   │   │   └── AppError.js
│   │   ├── middleware/
│   │   │   ├── authenticate.js
│   │   │   ├── authorize.js
│   │   │   └── errorHandler.js
│   │   └── utils/
│   │       ├── asyncHandler.js
│   │       └── validators.js
│   ├── database/
│   │   ├── Medicare.sql
│   │   └── repareMedicare.sql
│   ├── domain/
│   │   └── entities/
│   │       ├── Appointment.js
│   │       ├── DoctorRating.js
│   │       ├── Medicine.js
│   │       ├── Prescription.js
│   │       ├── SupportTicket.js
│   │       └── User.js
│   ├── infrastructure/
│   │   ├── database/
│   │   ├── inMemoryDatabase.js
│   │   ├── mariaDb.js
│   │   └── seedData.js
│   ├── repositories/
│   │   ├── AppointmentRepository.js
│   │   ├── MedicineRepository.js
│   │   ├── PrescriptionRepository.js
│   │   ├── RatingRepository.js
│   │   ├── SupportRepository.js
│   │   └── UserRepository.js
│   ├── routes/
│   │   └── index.js
│   ├── services/
│   │   ├── AppointmentService.js
│   │   ├── AuthService.js
│   │   ├── DoctorService.js
│   │   ├── MedicineService.js
│   │   ├── PatientService.js
│   │   ├── PrescriptionService.js
│   │   ├── RatingService.js
│   │   ├── RecordService.js
│   │   ├── StaffService.js
│   │   ├── SupportService.js
│   │   └── UserPresenter.js
│   ├── app.js
│   └── server.js
├── test/
├── .env.example
├── .gitignore
├── README.md
├── package-lock.json
└── package.json
```

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```
## Database Setup

```bash
# Full schema + seed
mysql -u root -p < src/database/Medicare.sql

# Repair / re-migrate
mysql -u root -p < src/database/repareMedicare.sql
```

To run without a database, the project includes an in-memory store (`inMemoryDatabase.js` + `seedData.js`) that works out of the box.

## Default seed accounts

All seeded users share this password:

```text
Password123!
```

Accounts:

- Doctor: `doctor@mediflow.com`
- Doctor: `doctor2@mediflow.com`
- Patient: `patient@mediflow.com`
- Patient: `patient2@mediflow.com`
- Staff: `staff@mediflow.com`

## API coverage

Implemented routes include:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `GET /api/doctor/dashboard`
- `GET /api/doctor/patients`
- `GET /api/doctor/appointments`
- `GET /api/patient/dashboard`
- `GET /api/patient/appointments`
- `GET /api/staff/dashboard`
- `GET /api/doctors`
- `GET /api/prescriptions`
- `POST /api/prescriptions`
- `POST /api/appointments`
- `POST /api/rate-doctor`
- `GET /api/admin/users`
- `GET /api/support`
- `GET /api/records`
- `GET /api/medicines`






