import { User } from "../models/user.model.ts";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
  async signup(name: string, email: string, password: string) {
    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already used");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      role: "USER",
    });

    const JWT_SECRET = process.env.JWT_SECRET as string;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET not found!");
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    if (!user.password) throw new Error("Password didnot match!!");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Wrong password");

    const JWT_SECRET = process.env.JWT_SECRET as string;

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    };
  }
}

export const authService = new AuthService();
