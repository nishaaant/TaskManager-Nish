import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = express.Router();

router.post("/tasks", createTask); // Create a task
router.get("/tasks", getTasks); // Get all tasks
router.get("/tasks/:id", getTaskById); // Get a task by ID
router.put("/tasks/:id", updateTask); // Update a task
router.delete("/tasks/:id", deleteTask); // Delete a task

export default router;
