import type { Request, Response } from "express";
import { profileService } from "../services/profile.service.ts";

export async function getProfile(req: Request, res: Response) {
  const userId = (req as any).userId;
  const profile = await profileService.getProfile(userId);
  res.json({ profile });
  
}
export async function updateProfile(req: Request, res: Response) {
  const userId = (req as any).userId;

  const updated = await profileService.updateProfile(userId, req.body);
  res.json({ message: "Updated", updated });
}
