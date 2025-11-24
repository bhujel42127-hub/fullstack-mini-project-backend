import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.ts";
import productRoutes from "./routes/product.routes.ts";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
    origin:"https://localhost:5173",
    credentials:true
}));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

export default app;
