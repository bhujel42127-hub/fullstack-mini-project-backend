import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import cookieParser from "cookie-parser";
import profileRoute from "./routes/product.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/profile", profileRoute);

export default app;
