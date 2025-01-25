import axios from "axios";

const BASE_URL = "http://localhost:5000/tasks";

export const fetchTasks = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await axios.post(BASE_URL, task);
  return response.data;
};

export const updateTask = async (id: string, task: any) => {
  const response = await axios.put(`${BASE_URL}/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
