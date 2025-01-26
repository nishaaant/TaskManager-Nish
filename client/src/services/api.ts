import axios from "axios";
import { Task } from "../types/Task";

const API_URL = "http://localhost:5000/api";

export const fetchTasks = async (): Promise<Task[]> => {
	const response = await axios.get(`${API_URL}/tasks`);
	return response.data;
};

export const createTask = async (task: Omit<Task, "_id">): Promise<Task> => {
	const response = await axios.post(`${API_URL}/tasks`, task);
	return response.data;
};

export const getTaskStats = async () => {
	const response = await axios.get(`${API_URL}/tasks/stats`);
	return response.data;
};

export const updateTask = async (
	id: string,
	updatedTask: Partial<Task>
): Promise<Task> => {
	const response = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
	return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
	await axios.delete(`${API_URL}/tasks/${id}`);
};

export const fetchTaskStats = async (): Promise<any> => {
	const response = await axios.get(`${API_URL}/tasks/stats`);
	return response.data;
};

export const loginUser = async (credentials: {
	email: string;
	password: string;
}) => {
	const response = await axios.post(`${API_URL}/login`, credentials);
	return response.data;
};

export const registerUser = async (credentials: {
	email: string;
	password: string;
}) => {
	const response = await axios.post(`${API_URL}/register`, credentials);
	return response.data;
};
