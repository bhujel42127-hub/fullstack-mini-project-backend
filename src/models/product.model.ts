import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Product = mongoose.model("Product", productSchema);
