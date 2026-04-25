# Hospital & Patient Management System Backend

This is a modular Node.js backend for a Hospital & Patient Management System. It uses `Express`, `MySQL`, and object-oriented design patterns to keep the code clean and maintainable.

## Beginner Guide

This backend follows a simple request flow:

1. `Route` receives the URL.
2. `Controller` receives the request and sends the response.
3. `Service` contains the business logic.
4. `Repository` talks to the database.

Example:

- `POST /api/v1/appointments`
- route file sends request to appointment controller
- controller calls appointment service
- service checks business rules like doctor schedule conflict
- repository inserts data into MySQL

This structure is useful because each file has one clear responsibility.

## Features

- Role-based users: `admin`, `doctor`, `patient`, `receptionist`
- Authentication with JWT
- Patient registration and profile management
- Doctor profile and availability management
- Appointment booking and history
- Billing and payment recording
- Medical record management
- Centralized error handling
- OOP-based service and repository layers

## Project Structure

```text
src/
  app.js
  server.js
  config/
  middlewares/
  modules/
  shared/
  utils/
database/
  schema.sql
```



1. Install dependencies:

```powershell
npm.cmd install
```

2. Create a `.env` file by copying `.env.example`.

3. Make sure this line exists inside `.env`:

```env
STORAGE_MODE=memory
```

4. Start the server:

```powershell
npm.cmd run dev
```

5. Open this in your browser:

```text
http://localhost:5000/api/v1/health
```

If it works, you should get a small JSON response saying the backend is healthy.

### Option 2: Run With MySQL Later

Use this only if your teacher or team later decides to connect a real database.

1. Change this in `.env`:

```env
STORAGE_MODE=sql
```

2. Create the MySQL database and run:

```sql
SOURCE database/schema.sql;
```

3. Start the server:

```powershell
npm.cmd run dev
```

## What To Do After The Server Starts

You now have a backend API. This means the project runs through URLs called endpoints.

The easiest order to understand it is:

1. Test health route
2. Register a patient
3. Login
4. Use the returned token
5. Try protected routes

## Important Beginner Idea

Some routes are public and some are protected.

- Public route: works without login
- Protected route: needs a token after login

## First Routes To Test

### 1. Health Check

Method: `GET`

URL:

```text
http://localhost:5000/api/v1/health
```

### 2. Register a Patient

Method: `POST`

URL:

```text
http://localhost:5000/api/v1/auth/register-patient
```

Body:

```json
{
  "fullName": "Ali Khan",
  "email": "ali@example.com",
  "password": "123456",
  "phoneNumber": "03001234567",
  "gender": "male",
  "dateOfBirth": "2002-01-15",
  "bloodGroup": "O+",
  "address": "Karachi",
  "emergencyContactName": "Ahmed Khan",
  "emergencyContactPhone": "03007654321"
}
```

### 3. Login

Method: `POST`

URL:

```text
http://localhost:5000/api/v1/auth/login
```

Body:

```json
{
  "email": "ali@example.com",
  "password": "123456"
}
```

The response will contain a `token`.

### 4. Use The Token

For protected routes, send this header:

```text
Authorization: Bearer YOUR_TOKEN_HERE
```

## Routes You Can Show In A Demo

- `GET /api/v1/health`
- `POST /api/v1/auth/register-patient`
- `POST /api/v1/auth/login`
- `GET /api/v1/patients`
- `GET /api/v1/doctors`
- `POST /api/v1/appointments`
- `GET /api/v1/appointments`
- `POST /api/v1/bills`
- `PATCH /api/v1/bills/:id/pay`

## Best Tool For Testing

Use `Postman` or `Insomnia`.

If you use Postman:

1. Choose method like `GET` or `POST`
2. Paste the URL
3. If it is a `POST` request, open `Body`
4. Choose `raw`
5. Choose `JSON`
6. Paste the JSON body
7. Click `Send`

## How The Code Is Organized

This project is written in a clean structure so it does not look messy or auto-generated.

- `routes` decide which URL goes where
- `controller` receives request and returns response
- `service` contains business logic
- `repository` handles data storage
- `middlewares` handle shared logic like auth and errors

This is a normal professional backend pattern and also easy to explain in class.

## Main API Routes

- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register-patient`
- `GET /api/v1/users`
- `GET /api/v1/patients`
- `POST /api/v1/patients`
- `GET /api/v1/doctors`
- `POST /api/v1/doctors`
- `GET /api/v1/appointments`
- `POST /api/v1/appointments`
- `GET /api/v1/bills`
- `POST /api/v1/bills`
- `PATCH /api/v1/bills/:id/pay`
- `GET /api/v1/medical-records`
- `POST /api/v1/medical-records`

## Notes

- This project is written to be easy to explain in a classroom setting.
- Comments are included where they help beginners understand the design.
- The service layer uses classes to demonstrate encapsulation, inheritance-style reuse, abstraction, and strategy-based billing behavior.
- After we finish the backend, we can prepare it for GitHub with a clean commit history, `.gitignore`, and a push guide.
- The code is intentionally written in a simple, readable style so it feels like a student project with good structure, not flashy AI-style code.
