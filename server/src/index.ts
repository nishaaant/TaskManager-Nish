import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import dotenv from "dotenv";
import TaskModel from "./models/Task";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
    credentials: true, // Allow cookies if needed
  })
);
app.use(express.json());

// Define a seed function
const seedTasks = async () => {
  const tasks = [
    {
      title: "Task 1",
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 2 * 60 * 60 * 1000), // 2 hours later
      priority: 3,
      status: "pending",
    },
    {
      title: "Task 2",
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 4 * 60 * 60 * 1000), // 4 hours later
      priority: 5,
      status: "pending",
    },
    {
      title: "Task 3",
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 1 * 60 * 60 * 1000), // 1 hour later
      priority: 2,
      status: "finished",
    },
  ];

  // Remove all existing tasks and insert new ones
  await TaskModel.deleteMany({});
  await TaskModel.insertMany(tasks);
  console.log("Seeded tasks successfully!");
};

app.get("/tasks", (req, res) => {
  res.json([{ id: 1, title: "Sample Task" }]);
});

app.post("/tasks", (req, res) => {
  const task = req.body;
  task.id = new Date().getTime();
  res.status(201).json(task);
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/task_manager")
  .then(async () => {
    console.log("Connected to MongoDB");
    await seedTasks(); // Call the seed function here
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("Error connecting to MongoDB:", error));
