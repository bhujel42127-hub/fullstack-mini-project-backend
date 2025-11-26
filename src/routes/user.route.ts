import { Router } from "express";
import { requireUser } from "../middlewares/auth.middleware.ts";
import { getProfile, updateProfile } from "../controllers/profile.controller.ts";

const router = Router();


router.get("/:id", requireUser, getProfile);
router.put("/:id", requireUser, updateProfile);

export default router;
