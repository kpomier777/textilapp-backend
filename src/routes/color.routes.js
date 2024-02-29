import { Router } from "express";
import {
  createColor,
  getColor,
  getColors,
  updateColor,
} from "../controllers/color.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

/* Routes */
router.get("/", getColors);
router.get("/:id", getColor);
router.post("/", createColor);
router.put("/", updateColor);

export default router;
