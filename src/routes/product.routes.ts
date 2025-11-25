import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.ts";
import { requireUser } from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/", requireUser, createProduct);
router.get("/", requireUser, getProducts);
router.put("/:id", requireUser, updateProduct);
router.delete("/:id", requireUser, deleteProduct);

// router.post("/", createProduct);
// router.get("/", getProducts);
// router.put("/:id", updateProduct);
// router.delete("/:id", deleteProduct);

export default router;
