import { Router } from "express";
import { login, registerPatient } from "./auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/register-patient", registerPatient);

export default router;
