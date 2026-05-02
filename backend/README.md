# MediFlow Express Backend

Backend scaffolded around the frontend contract from `Mediflow-system-main/frontend`.
The frontend has also been copied into `frontend/` unchanged so the full stack lives in one folder.

## Stack

- Express
- JavaScript (CommonJS)
- JWT authentication
- bcrypt password hashing
- Layered architecture with controllers, services, repositories, and entities

## Project structure

```text
frontend/
src/
  config/
  controllers/
  core/
  domain/
  infrastructure/
  repositories/
  routes/
  services/
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

## Notes

- The project currently uses an in-memory seeded data store so you can connect the frontend and test flows quickly.
- The next upgrade path is replacing repositories with database-backed implementations without changing controller contracts.
- The backend was designed to preserve the current UI contract rather than forcing frontend changes.
