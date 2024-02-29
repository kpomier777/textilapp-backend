import { Router } from "express";
import {
  createClient,
  updateClient,
  getClient,
  getClients,
  getClientsEnabled,
  getClientsDisabled,
} from "../controllers/client.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

/* Routes */
router.get("/", getClients);
router.get("/enabled", getClientsEnabled);
router.get("/disabled", getClientsDisabled);
router.get("/:id", getClient);
router.post("/", createClient);
router.put("/", updateClient);

export default router;
