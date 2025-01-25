import { Request, Response } from "express";
import Task from "../models/Task";

// Create a task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, startTime, endTime, priority, status } = req.body;

    // Validation
    if (!title || !startTime || !endTime || !priority || !status) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    if (priority < 1 || priority > 5) {
      res.status(400).json({ message: "Priority must be between 1 and 5." });
      return;
    }

    if (status !== "pending" && status !== "finished") {
      res.status(400).json({ message: "Status must be 'pending' or 'finished'." });
      return;
    }

    const newTask = new Task({ title, startTime, endTime, priority, status });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get all tasks
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find(); // Retrieve all tasks from the database
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single task by ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, startTime, endTime, priority, status } = req.body;

    // Validate input data
    if (priority && (priority < 1 || priority > 5)) {
      res.status(400).json({ message: "Priority must be between 1 and 5." });
      return;
    }

    if (status && status !== "pending" && status !== "finished") {
      res.status(400).json({ message: "Status must be 'pending' or 'finished'." });
      return;
    }

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, startTime, endTime, priority, status },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      res.status(404).json({ message: "Task not found" });
      return;
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
