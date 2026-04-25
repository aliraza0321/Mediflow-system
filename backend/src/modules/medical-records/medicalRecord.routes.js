import { Router } from "express";
import {
  createMedicalRecord,
  getMedicalRecordById,
  getMedicalRecords
} from "./medicalRecord.controller.js";
import { authenticate, authorize } from "../../middlewares/authMiddleware.js";
import ROLES from "../../config/roles.js";

const router = Router();

router.use(authenticate);
router.get("/", authorize(ROLES.ADMIN, ROLES.DOCTOR), getMedicalRecords);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.DOCTOR, ROLES.PATIENT), getMedicalRecordById);
router.post("/", authorize(ROLES.ADMIN, ROLES.DOCTOR), createMedicalRecord);

export default router;
