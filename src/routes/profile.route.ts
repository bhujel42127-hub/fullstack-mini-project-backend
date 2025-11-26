import { Router } from "express";
import { requireUser } from "../middlewares/auth.middleware.ts";
import { getAllProfile, getProfile, updateProfile } from "../controllers/profile.controller.ts";

const router = Router();


router.get("/", requireUser, getAllProfile);
router.get("/:id", requireUser, getProfile);
router.put("/:id", requireUser, updateProfile);

export default router;
