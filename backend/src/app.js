import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import patientRoutes from "./modules/patients/patient.routes.js";
import doctorRoutes from "./modules/doctors/doctor.routes.js";
import appointmentRoutes from "./modules/appointments/appointment.routes.js";
import billingRoutes from "./modules/billing/billing.routes.js";
import medicalRecordRoutes from "./modules/medical-records/medicalRecord.routes.js";
import notFound from "./middlewares/notFound.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// Allow the frontend to call this backend from another origin during development.
app.use(cors());

// Convert incoming JSON request bodies into req.body objects.
app.use(express.json());

// Log each request in the terminal so it is easier to debug API calls.
app.use(morgan("dev"));

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Hospital backend is healthy."
  });
});

// Each module owns its own routes. This keeps the app organized by feature.
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/patients", patientRoutes);
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/bills", billingRoutes);
app.use("/api/v1/medical-records", medicalRecordRoutes);

// If no route matches, this middleware creates a clean 404 response.
app.use(notFound);

// This must be last so any thrown error is handled in one central place.
app.use(errorHandler);

export default app;
