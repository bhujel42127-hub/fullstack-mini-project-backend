import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  email: string;
  role: string;
}

export function requireUser(req: Request, res: Response, next: NextFunction) {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const token = req.cookies.accessToken;

  console.log("JWT:", JWT_SECRET);

  console.log("Token: ", token  );

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }
  // console.log("Before token decoding ");

  try {
    // console.log("reached");
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // console.log("Token decoded ");

    (req as any).userId = decoded.userId;
    (req as any).email = decoded.email;
    (req as any).role = decoded.role;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
}
