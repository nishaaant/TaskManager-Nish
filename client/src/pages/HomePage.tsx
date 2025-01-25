import React from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const HomePage: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Task Manager</h1>
      <TaskForm onTaskAdded={() => window.location.reload()} />
      <TaskList />
    </div>
  );
};

export default HomePage;
