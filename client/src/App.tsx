import React, { useEffect, useState } from "react";
import { createTask, fetchTasks, updateTask, deleteTask } from "./services/api";

const App: React.FC = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        console.log(tasks);
        setTasks(tasks)
      } catch (error) {
        console.error(error);
      }
    };
    loadTasks();
  }, []);
  
  
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Task List</h1>
      <ul>
        {tasks.map((task: any) => (
          <li key={task._id}>
            {task.title} - {task.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
