import { Router } from "express";
import {
  createOperator,
  updateOperator,
  getOperators,
  getOperator
} from "../controllers/operator.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

/* Routes */
router.get("/", getOperators);
router.get("/:id", getOperator);
router.post("/", createOperator);
router.put("/", updateOperator);

export default router;
