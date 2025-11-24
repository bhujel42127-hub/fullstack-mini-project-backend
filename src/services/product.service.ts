import { Product } from "../models/product.model.ts";

export class ProductService {
  async createProduct(userId: string, name: string, price: number) {
    return Product.create({ name, price, userId });
  }

  async getProducts(userId: string) {
    return Product.find({ userId });
  }

  async updateProduct(userId: string, productId: string, data: any) {
    return Product.findOneAndUpdate(
      { _id: productId, userId },
      data,
      { new: true }
    );
  }

  async deleteProduct(userId: string, productId: string) {
    return Product.findOneAndDelete({ _id: productId, userId });
  }
}

export const productService = new ProductService();
