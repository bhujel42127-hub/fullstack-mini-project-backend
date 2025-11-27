import type { Request, Response } from "express";
import { productService } from "../services/product.service.ts";

export async function createProduct(req: Request, res: Response) {
  try {
    const userId = (req as any).userId;
    const { name, price, stock, description } = req.body;

    const product = await productService.createProduct(
      userId,
      name,
      price,
      stock,
      description
    );
    res.json({ message: "Product created", product });
  } catch {
    res.status(400).json({ message: "Error creating product" });
  }
}

export async function getProducts(req: Request, res: Response) {  
  const userId = (req as any).userId;
  // console.log("user id: ", userId);
  const products = await productService.getProducts(userId);
  res.json({ products });
}

export async function updateProduct(req: Request, res: Response) {
  const userId = (req as any).userId;
  const { id } = req.params;

  const updated = await productService.updateProduct(
    userId,
    id as string,
    req.body
  );
  res.json({ message: "Updated", updated });
}

export async function deleteProduct(req: Request, res: Response) {
  const userId = (req as any).userId;
  const { id } = req.params;

  await productService.deleteProduct(userId, id as string);
  res.json({ message: "Deleted" });
}
