import { Router } from "express";
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.ts";
import { requireUser } from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/", requireUser, createProduct);
router.get("/", requireUser, getProducts);
router.put("/:id", requireUser, updateProduct);
router.delete("/:id", requireUser, deleteProduct);

export default router;
