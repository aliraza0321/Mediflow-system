import { Router } from "express";
import { createDoctor, getDoctorById, getDoctors } from "./doctor.controller.js";
import { authenticate, authorize } from "../../middlewares/authMiddleware.js";
import ROLES from "../../config/roles.js";

const router = Router();

router.use(authenticate);
router.get("/", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.DOCTOR), getDoctors);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.DOCTOR), getDoctorById);
router.post("/", authorize(ROLES.ADMIN), createDoctor);

export default router;
