import { Router } from "express";
import { createPatient, getPatientById, getPatients } from "./patient.controller.js";
import { authenticate, authorize } from "../../middlewares/authMiddleware.js";
import ROLES from "../../config/roles.js";

const router = Router();

router.use(authenticate);
router.get("/", authorize(ROLES.ADMIN, ROLES.DOCTOR, ROLES.RECEPTIONIST), getPatients);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.DOCTOR, ROLES.RECEPTIONIST, ROLES.PATIENT), getPatientById);
router.post("/", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST), createPatient);

export default router;
