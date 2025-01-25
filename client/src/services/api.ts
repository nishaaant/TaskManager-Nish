import axios from "axios";
import { Task } from "../types/Task";

const API_URL = "http://localhost:5000/api";

// Fetch all tasks
export const fetchTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

// Create a new task
export const createTask = async (task: Omit<Task, "_id">): Promise<Task> => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

// Update a task
export const updateTask = async (
  id: string,
  updatedTask: Partial<Task>
): Promise<Task> => {
  const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
  return response.data;
};

// Delete a task
export const deleteTask = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};
