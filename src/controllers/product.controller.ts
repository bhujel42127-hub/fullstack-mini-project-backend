import type { Request, Response } from "express";
import { productService } from "../services/product.service.ts";
import { Product } from "../models/product.model.ts";

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
  console.log("calling get all products");
  const userId = (req as any).userId;
  const { search = "", limit = 5, page } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const products = await productService.getProducts(
    userId,
    search.toString(),
    Number(limit),
    skip
  );
  console.log("Auth service all products:", products.searchedItem);
  res.json({
    searchedProducts: products.searchedItem,
    products: products.allProducts,
    page,
    limit,
    skip,
    total: products.total,
  });
}

// export async

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
