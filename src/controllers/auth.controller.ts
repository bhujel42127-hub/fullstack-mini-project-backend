import type { Request, Response } from "express";
import { authService } from "../services/auth.service.ts";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    const { user } = await authService.signup(name, email, password);

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   sameSite: "strict",
    //   maxAge: 60 * 60 * 1000,
    // });

    res.json({ message: "Signup success", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login(email, password);

    console.log("Token created: ", token);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    console.log("Cookie set: ");

    res.json({ message: "Login ok", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  try {
    const { email } = req.body;
    const exists = await authService.verifyEmail(email);
    res.json({ exists });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}


export async function logout(req: Request, res: Response) {
  res.clearCookie("token");
  res.json({ message: "logged out successfully!" });
}
