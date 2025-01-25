import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";

import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/tasks", taskRoutes);

// Database connection
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
