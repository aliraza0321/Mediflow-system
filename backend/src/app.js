const express = require("express");
const cors = require("cors");

const { env } = require("./config/env");
const { errorHandler } = require("./core/middleware/errorHandler");
const { InMemoryDatabase } = require("./infrastructure/database/inMemoryDatabase");
const { UserRepository } = require("./repositories/UserRepository");
const { AppointmentRepository } = require("./repositories/AppointmentRepository");
const { PrescriptionRepository } = require("./repositories/PrescriptionRepository");
const { RatingRepository } = require("./repositories/RatingRepository");
const { MedicineRepository } = require("./repositories/MedicineRepository");
const { SupportRepository } = require("./repositories/SupportRepository");
const { AuthService } = require("./services/AuthService");
const { DoctorService } = require("./services/DoctorService");
const { PatientService } = require("./services/PatientService");
const { AppointmentService } = require("./services/AppointmentService");
const { PrescriptionService } = require("./services/PrescriptionService");
const { RatingService } = require("./services/RatingService");
const { StaffService } = require("./services/StaffService");
const { MedicineService } = require("./services/MedicineService");
const { SupportService } = require("./services/SupportService");
const { RecordService } = require("./services/RecordService");
const { AuthController } = require("./controllers/AuthController");
const { DoctorController } = require("./controllers/DoctorController");
const { PatientController } = require("./controllers/PatientController");
const { AppointmentController } = require("./controllers/AppointmentController");
const { PrescriptionController } = require("./controllers/PrescriptionController");
const { RatingController } = require("./controllers/RatingController");
const { StaffController } = require("./controllers/StaffController");
const { buildRoutes } = require("./routes");

async function createApp() {
  const app = express();
  const database = await InMemoryDatabase.build();

  const userRepository = new UserRepository(database);
  const appointmentRepository = new AppointmentRepository(database);
  const prescriptionRepository = new PrescriptionRepository(database);
  const ratingRepository = new RatingRepository(database);
  const medicineRepository = new MedicineRepository(database);
  const supportRepository = new SupportRepository(database);

  const authService = new AuthService({
    database,
    userRepository,
    appointmentRepository,
  });
  const doctorService = new DoctorService({
    userRepository,
    appointmentRepository,
    ratingRepository,
  });
  const patientService = new PatientService({
    userRepository,
    appointmentRepository,
  });
  const appointmentService = new AppointmentService({
    database,
    userRepository,
    appointmentRepository,
  });
  const prescriptionService = new PrescriptionService({
    database,
    userRepository,
    appointmentRepository,
    prescriptionRepository,
  });
  const ratingService = new RatingService({
    database,
    appointmentRepository,
    ratingRepository,
  });
  const staffService = new StaffService({
    userRepository,
    supportRepository,
  });
  const medicineService = new MedicineService({
    medicineRepository,
  });
  const supportService = new SupportService({
    supportRepository,
    userRepository,
  });
  const recordService = new RecordService({
    userRepository,
    appointmentRepository,
    prescriptionRepository,
  });

  const controllers = {
    auth: new AuthController(authService),
    doctor: new DoctorController(doctorService, prescriptionRepository),
    patient: new PatientController(patientService, doctorService),
    appointment: new AppointmentController(appointmentService),
    prescription: new PrescriptionController(prescriptionService),
    rating: new RatingController(ratingService),
    staff: new StaffController(staffService, supportService, recordService, medicineService),
  };

  app.use(
    cors({
      origin: env.clientUrl,
      credentials: false,
    })
  );
  app.use(express.json());
  app.use("/api", buildRoutes(controllers));
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };
