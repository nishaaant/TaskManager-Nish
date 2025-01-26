import express from "express";
import {
	createTask,
	getTasks,
	getTaskById,
	updateTask,
	deleteTask,
	getTaskStats,
} from "../controllers/taskController";
import { authenticateUser } from "../utils/authUtils";

const router = express.Router();

// router.use(authenticateUser);
router.get("/tasks/stats", getTaskStats);
router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.get("/tasks/:id", getTaskById);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
