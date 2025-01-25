import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.use("/api", taskRoutes); 


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
