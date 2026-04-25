import { Router } from "express";
import { getUserById, getUsers } from "./user.controller.js";
import { authenticate, authorize } from "../../middlewares/authMiddleware.js";
import ROLES from "../../config/roles.js";

const router = Router();

router.use(authenticate);
router.get("/", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST), getUsers);
router.get("/:id", authorize(ROLES.ADMIN, ROLES.RECEPTIONIST), getUserById);

export default router;
