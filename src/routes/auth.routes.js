import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();

/* Routes */
router.post("/create", createUser);
router.post("/login", loginUser);

export default router;
