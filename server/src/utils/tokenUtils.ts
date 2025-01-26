import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  const secretKey = process.env.JWT_SECRET || "secret";
  const expiresIn = "7d"; // Token expires in 7 days
  return jwt.sign({ id: userId }, secretKey, { expiresIn });
};
