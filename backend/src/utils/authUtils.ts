import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "src/config/.env" });

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashed);
};

export const generateAccessToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (id: string): string => {
  return jwt.sign({ id }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error: any) {
    if (error.message === "jwt expired") {
      throw new Error("Access token expired");
    }
    throw new Error("Invalid access token");
  }
}

export const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET);
  } catch (error: any) {
    if (error.message === "jwt expired") {
      throw new Error("jwt expired");
    }
    throw new Error("Invalid refresh token");
  }
}
