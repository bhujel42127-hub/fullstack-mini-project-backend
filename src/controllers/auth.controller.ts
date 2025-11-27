import type { Request, Response } from "express";
import { authService } from "../services/auth.service.ts";
import { error } from "console";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password, bio } = req.body;
    const { user } = await authService.signup(name, email, password, bio);

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
    const { user, accessToken, refreshToken } = await authService.login(
      email,
      password
    );

    // console.log("Token created: ", accessToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 20 * 60 * 1000,
    });

    console.log("Cookie set: ");

    res.json({ message: "Login ok", user });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
export async function refresh(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token required" });
    }

    const { accessToken } = await authService.refresh(refreshToken);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    res.json({ message: "Token refreshed" });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export async function verifyEmail(req: Request, res: Response) {
  try {
    console.log("request body:", req.body);
    const { email } = req.body;
    console.log("Entered email:", email);
    const resetToken = await authService.verifyEmail(email);
    console.log("Reset token", resetToken);

    console.log(`http://localhost:5173/reset-password?token=${resetToken}`);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
export async function resetPassword(req: Request, res: Response) {
  console.log("in reset pass auth controller");

  try {
    console.log("in reset pass auth controller");
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    console.log("After resetting");
    res.json({ message: "Password reset successful" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await authService.logout(refreshToken);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    res.json({ message: "Logged out successfully" });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
