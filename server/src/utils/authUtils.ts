import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";
configDotenv;

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

export const generateToken = (userId: string): string => {
	return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "1h" });
};

export const authenticateUser = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const token = req.headers.authorization?.split(" ")[1];

	if (!token) {
		res.status(401).json({ message: "Unauthorized: No token provided" });
		return;
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
		req.user = decoded.userId;
		next();
	} catch (err) {
		res.status(403).json({ message: "Forbidden: Invalid token" });
	}
};
