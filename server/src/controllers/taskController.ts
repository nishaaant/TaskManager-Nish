import { Request, Response } from "express";
import Task from "../models/Task";

// Task type definition
interface ITask {
    _id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    priority: number;
    status: "pending" | "finished";
  }
  
  // Pending task statistics type
  interface PendingStats {
    totalLapsed: number;
    totalBalance: number;
  }
  
  // Overall task statistics type
  interface TaskStats {
    totalTasks: number;
    completedPercent: number;
    pendingPercent: number;
    groupedPendingStats: Record<number, PendingStats>;
    avgCompletionTime: number;
  }

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

export const getTaskStats = async (req: Request, res: Response): Promise<void> => {
    try {
      // Fetch tasks with minimal memory overhead
      const tasks: ITask[] = await Task.find({}, { title: 0, __v: 0 }); // Exclude unnecessary fields

      // Initialize counters
      const totalTasks = tasks.length;
      let completedTasks = 0;
      let totalActualCompletionTime = 0;
  
      const pendingStats: Record<number, PendingStats> = {}; // Grouped by priority
      const currentTime = new Date();
  
      // Iterate through tasks
      tasks.forEach((task) => {
        if (task.status === "finished") {
          completedTasks++;
          const startTime = new Date(task.startTime);
          const endTime = new Date(task.endTime);
          totalActualCompletionTime += (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Convert to hours
        } else if (task.status === "pending") {
          const startTime = new Date(task.startTime);
          const endTime = new Date(task.endTime);
  
          const timeLapsed =
            currentTime > startTime ? (currentTime.getTime() - startTime.getTime()) / (1000 * 60 * 60) : 0; // In hours
          const balanceTime =
            currentTime < endTime ? (endTime.getTime() - currentTime.getTime()) / (1000 * 60 * 60) : 0; // In hours
  
          // Group by priority
          if (!pendingStats[task.priority]) {
            pendingStats[task.priority] = { totalLapsed: 0, totalBalance: 0 };
          }
          pendingStats[task.priority].totalLapsed += timeLapsed;
          pendingStats[task.priority].totalBalance += balanceTime;
        }
      });
  
      // Calculate percentages
      const pendingTasks = totalTasks - completedTasks;
      const completedPercent = ((completedTasks / totalTasks) * 100).toFixed(2) || "0";
      const pendingPercent = ((pendingTasks / totalTasks) * 100).toFixed(2) || "0";
  
      // Calculate average completion time
      const avgCompletionTime = totalActualCompletionTime / completedTasks || 0;
  
      // Prepare response data
      const stats: TaskStats = {
        totalTasks,
        completedPercent: parseFloat(completedPercent),
        pendingPercent: parseFloat(pendingPercent),
        groupedPendingStats: pendingStats,
        avgCompletionTime: parseFloat(avgCompletionTime.toFixed(2)),
      };
  
      res.status(200).json(stats);
    } catch (error) {
      console.error("Error fetching task stats:", error);
      res.status(500).json({ message: "Failed to fetch task statistics" });
    }
  };


