import { Router } from "express";
import {
  createTurn,
  updateTurn,
  getTurns,
  getTurn
} from "../controllers/turn.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

/* Routes */
router.get("/", getTurns);
router.get("/:id", getTurn);
router.post("/", createTurn);
router.put("/", updateTurn);

export default router;
