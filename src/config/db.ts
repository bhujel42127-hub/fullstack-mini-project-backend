import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI!);
    // console.log("db uri", process.env.DB_URI)
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err);
  }
}