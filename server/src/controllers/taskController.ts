import { Request, Response } from "express";
import Task from "../models/Task";

interface ITask {
    _id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    priority: number;
    status: "pending" | "finished";
  }
  
  interface PendingStats {
    totalLapsed: number;
    totalBalance: number;
  }
  
  interface TaskStats {
    totalTasks: number;
    completedPercent: number;
    pendingPercent: number;
    groupedPendingStats: Record<number, PendingStats>;
    avgCompletionTime: number;
  }

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, startTime, endTime, priority, status } = req.body;

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

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find(); 
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

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

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, startTime, endTime, priority, status } = req.body;

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

export const getTaskStats = async (req: Request, res: Response) => {
  try {
    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({ status: "finished" });
    const pendingTasks = totalTasks - completedTasks;
    const completedPercent = (completedTasks / totalTasks) * 100;
    const pendingPercent = 100 - completedPercent;

    const pendingTasksByPriority = await Task.aggregate([
      { $match: { status: "pending" } },
      {
        $group: {
          _id: "$priority",
          totalTimeLapsed: { $sum: { $subtract: [new Date(), "$startTime"] } },
          totalBalanceTime: { $sum: { $subtract: ["$endTime", new Date()] } },
        },
      },
    ]);

    const pendingTimeByPriority = pendingTasksByPriority.map((item) => ({
      priority: item._id,
      timeLapsed: item.totalTimeLapsed / (1000 * 60 * 60),
      balanceTime: item.totalBalanceTime / (1000 * 60 * 60),
    }));

    const completedTasksData = await Task.aggregate([
      { $match: { status: "finished" } },
      {
        $project: {
          actualTimeTaken: { $subtract: ["$endTime", "$startTime"] },
        },
      },
      { $group: { _id: null, avgTime: { $avg: "$actualTimeTaken" } } },
    ]);
    const avgCompletionTime = completedTasksData[0]
      ? completedTasksData[0].avgTime / (1000 * 60 * 60)
      : 0;

    res.json({
      totalTasks,
      completedPercent,
      pendingPercent,
      pendingTimeByPriority,
      avgCompletionTime,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


