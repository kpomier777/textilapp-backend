import { Router } from "express";
import {
  createOccupation,
  updateOccupation,
  getOccupations,
  getOccupation
} from "../controllers/occupation.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

/* Routes */
router.get("/", getOccupations);
router.get("/:id", getOccupation);
router.post("/", createOccupation);
router.put("/", updateOccupation);

export default router;
