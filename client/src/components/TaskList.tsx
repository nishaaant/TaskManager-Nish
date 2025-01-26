import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import { fetchTasks, deleteTask } from "../services/api";
import { Task } from "../types/Task";
import TaskStats from "./TaskStats";
import TaskForm from "./TaskForm";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const fetchAllTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      fetchAllTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Go Back to Home Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          ← Go Back to Home
        </button>
      </div>

      {/* Task Stats */}

      {/* Task Form */}
      <TaskForm onTaskAdded={() => fetchAllTasks()} />

      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Task List
      </h2>

      {/* Task List Display */}
      <div className="bg-white rounded-lg shadow-md p-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-600">No tasks available.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition duration-300"
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
                  className="bg-red-500 text-white py-1 px-3 rounded mt-3 hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
