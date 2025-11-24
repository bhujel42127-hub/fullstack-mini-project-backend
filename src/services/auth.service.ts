import { User } from "../models/user.model.ts";
import bcrypt from "bcryptjs";

export class AuthService {
  async signup(name: string, email: string, password: string) {
    const exists = await User.findOne({ email });
    if (exists) throw new Error("Email already used");

    const hashed = await bcrypt.hash(password, 10);

    return User.create({
      name,
      email,
      password: hashed,
      role: "USER",
    });
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Wrong password");

    return user;
  }
}

export const authService = new AuthService();
