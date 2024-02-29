import { Router } from "express";
import {
  createTitle,
  getTitle,
  getTitles,
  updateTitle,
} from "../controllers/title.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

/* Routes */
router.get("/", getTitles);
router.get("/:id", getTitle);
router.post("/", createTitle);
router.put("/", updateTitle);

export default router;
