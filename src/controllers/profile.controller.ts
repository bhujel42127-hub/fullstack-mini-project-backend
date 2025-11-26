import type { Request, Response } from "express";
import { profileService } from "../services/profile.service.ts";

export async function updateProfile(req: Request, res: Response) {
  const userId = (req as any).userId;

  const updated = await profileService.updateProduct(userId, req.body);
  res.json({ message: "Updated", updated });
}
