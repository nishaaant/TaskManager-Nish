import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../services/api";
import { Task } from "../types/Task";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchAllTasks = async () => {
    const data = await fetchTasks();
    setTasks(data);
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    fetchAllTasks(); // Refresh the task list
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li
            key={task._id}
            className="mb-4 p-4 border rounded shadow-sm bg-gray-50"
          >
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Start:</strong> {task.startTime}
            </p>
            <p>
              <strong>End:</strong> {task.endTime}
            </p>
            <button
              onClick={() => handleDelete(task._id)}
              className="bg-red-500 text-white py-1 px-2 rounded mt-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
