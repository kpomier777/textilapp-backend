import { Router } from "express";
import {
  createProduct,
  updateProduct,
  getProducts,
  getProduct
} from "../controllers/product.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();
router.use(authenticate);

/* Routes */
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", createProduct);
router.put("/", updateProduct);

export default router;
