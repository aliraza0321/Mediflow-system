
# Mediflow System Backend

This is the backend for Mediflow . It is built with node js and express and uses a modular structure to keep the code simple and organized.

## features

- role based users: admin doctor patient receptionist
- jwt authentication
- patient registration
- doctor management
- appointment management
- billing and payments
- medical records
- memory mode for testing without a database

## project structure

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

## how to run

1. install dependencies

```powershell
npm.cmd install
```

2. create a `.env` file by copying `.env.example`

3. use this in `.env`

```env
PORT=5000
NODE_ENV=development
STORAGE_MODE=memory
JWT_SECRET=myprojectsecret
JWT_EXPIRES_IN=1d
```

4. start the server

```powershell
npm.cmd run dev
```

5. test this route in browser or postman

```text
http://localhost:5000/api/v1/health
```

## memory mode

this backend can run in memory mode so a real database is not required for now. data resets when the server restarts.

## first routes to test

### health check

`GET /api/v1/health`

### register patient

`POST /api/v1/auth/register-patient`

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

### login

`POST /api/v1/auth/login`

```json
{
  "email": "ali@example.com",
  "password": "123456"
}
```

## how the code is organized

- routes handle urls
- controllers handle request and response
- services contain business logic
- repositories handle data access
- middlewares handle shared logic like auth and errors

## note

the project is ready for sql integration later but currently runs in memory mode for easy testing and demo purposes (YES IRTAZA WE ARE WAITING FOR YOU)
