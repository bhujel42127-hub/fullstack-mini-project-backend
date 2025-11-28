import { Product } from "../models/product.model.ts";

export class ProductService {
  async createProduct(
    userId: string,
    name: string,
    price: number,
    stock: number,
    description: string
  ) {
    return Product.create({ name, price, userId, stock, description });
  }

  async getProducts(
    userId: string,
    search: string,
    limit: number,
    skip: number
  ) {
    const searchedItem = await Product.find({
      name: { $regex: String(search), $options: "i" },
    }).limit(Number(limit));

    // console.log("Searched item:", searchedItem);

    // const allProducts = await Product.find({ userId });
    const [allProducts, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments(),
    ]);

    return { use  rId, allProducts, searchedItem, total };
  }

  async updateProduct(userId: string, productId: string, data: any) {
    return Product.findOneAndUpdate({ _id: productId, userId }, data, {
      new: true,
    });
  }

  async deleteProduct(userId: string, productId: string) {
    return Product.findOneAndDelete({ _id: productId, userId });
  }
}

export const productService = new ProductService();
