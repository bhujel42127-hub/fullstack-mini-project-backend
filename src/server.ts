import app from "./app.ts";
import { connectDB } from "./config/db.ts";
import dotenv from "dotenv";

dotenv.config();

connectDB();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
