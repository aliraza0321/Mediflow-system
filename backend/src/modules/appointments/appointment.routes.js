import { Router } from "express";
import {
  createAppointment,
  getAppointmentById,
  getAppointments
} from "./appointment.controller.js";
import { authenticate, authorize } from "../../middlewares/authMiddleware.js";
import ROLES from "../../config/roles.js";

const router = Router();

router.use(authenticate);
router.get("/", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.DOCTOR), getAppointments);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.DOCTOR, ROLES.PATIENT), getAppointmentById);
router.post("/", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST), createAppointment);

export default router;
