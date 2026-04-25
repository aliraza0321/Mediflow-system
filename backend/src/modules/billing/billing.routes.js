import { Router } from "express";
import { createBill, getBillById, getBills, payBill } from "./billing.controller.js";
import { authenticate, authorize } from "../../middlewares/authMiddleware.js";
import ROLES from "../../config/roles.js";

const router = Router();

router.use(authenticate);
router.get("/", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST), getBills);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST, ROLES.PATIENT), getBillById);
router.post("/", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST), createBill);
router.patch("/:id/pay", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST), payBill);

export default router;
