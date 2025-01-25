import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTaskStats
} from "../controllers/taskController";

const router = express.Router();

router.get("/tasks/stats", getTaskStats);
router.post("/tasks", createTask); 
router.get("/tasks", getTasks); 
router.get("/tasks/:id", getTaskById); 
router.put("/tasks/:id", updateTask); 
router.delete("/tasks/:id", deleteTask); 

export default router;
