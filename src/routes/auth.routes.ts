import { Router } from "express";
import {
  signup,
  login,
  logout,
  refresh,
  verifyEmail,
  resetPassword,
} from "../controllers/auth.controller.ts";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.post("/verify-email", verifyEmail);
router.post("/reset-password", resetPassword);

export default router;
