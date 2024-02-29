import { Router } from "express";
import {
  createArea,
  getArea,
  getAreas,
  updateArea,
} from "../controllers/area.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

/* Routes */
router.get("/", getAreas);
router.get("/:id", getArea);
router.post("/", createArea);
router.put("/", updateArea);

export default router;
