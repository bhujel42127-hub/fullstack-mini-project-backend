import { Router } from "express";
import { requireUser } from "../middlewares/auth.middleware.ts";
import { updateProfile } from "../controllers/profile.controller.ts";

const router = Router();

router.put("/", requireUser, updateProfile);

export default router;
