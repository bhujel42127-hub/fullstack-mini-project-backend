import { User } from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { RefreshToken } from "../models/refreshToken.model.ts";

export class AuthService {
  private generateAccessToken(userId: String, email: String, role: String) {
    const JWT_SECRET = process.env.JWT_SECRET as string;

    return jwt.sign(
      {
        userId,
        email,
        role,
      },
      JWT_SECRET,
      { expiresIn: "15m" }
    );
  }
  private async generateRefreshToken(userId: String) {
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 20 * 60 * 1000);

    await RefreshToken.create({
      token,
      userId,
      expiresAt,
    });

    return token;
  }

  async signup(name: string, email: string, password: string, bio: string) {
    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already used");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      bio,
      role: "USER",
    });

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };

    // if (!JWT_SECRET) {
    //   throw new Error("JWT_SECRET not found!");
    // }
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    if (!user.password) throw new Error("Password didnot match!!");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Wrong password");

    const accessToken = this.generateAccessToken(
      user._id.toString(),
      user.email,
      user.role
    );
    const refreshToken = await this.generateRefreshToken(user._id.toString());
    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }
  async refresh(refreshToken: string) {
    const storedToken = await RefreshToken.findOne({
      token: refreshToken,
      expiresAt: { $gt: new Date() },
    });

    if (!storedToken) {
      throw new Error("Invalid or expired refresh token");
    }

    const user = await User.findById(storedToken.userId);
    if (!user) throw new Error("User not found");

    const accessToken = this.generateAccessToken(
      user._id.toString(),
      user.email,
      user.role
    );

    return { accessToken };
  }

  async logout(refreshToken: string) {
    await RefreshToken.deleteOne({ token: refreshToken });
  }

  async verifyEmail(email: string) {
    console.log("User email:", email);

    const user = await User.findOne({ email });

    if (!user) return console.log("User not found");
    console.log("User id:", user._id.toString());
    // console.log("JWT", process.env.JWT_SECRET as string);

    const resetToken = jwt.sign(
      {
        userId: user._id.toString(),
        type: "reset-token",
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "10m" }
    );
    console.log("reset token:", resetToken);

    return resetToken;
  }
  async resetPassword(token: string, newPassword: string) {
    console.log("in reset password auth service");
    const JWT_SECRET = process.env.JWT_SECRET as string;
    console.log("token:", token);
    let decoded;
    try {
      console.log("in reset password auth service try block");

      decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      console.log("in reset password auth service try block after decoded");

      console.log("Decoded token:", decoded);

      const userId = decoded.userId;

      const user = await User.findById(userId);
      console.log("user found:", user);

      if (!user) return;

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      user.password = hashedPassword;
      await user.save();
    } catch (error) {
      console.log("Error while reseting password:", error);
    }
  }
}

export const  authService = new AuthService();
