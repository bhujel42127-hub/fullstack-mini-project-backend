import type { Request, Response } from "express";
import { authService } from "../services/auth.service.ts";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const user = await authService.signup(name, email, password);
    res.json({ message: "Signup success", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    res.json({ message: "Login ok", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
