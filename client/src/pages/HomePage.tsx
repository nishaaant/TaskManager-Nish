import React from "react";
import { Link } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import Dashboard from "./Dashboard";

const HomePage: React.FC = () => {
  const handleTaskAdded = () => {
    // Refresh TaskList after adding a task
    window.location.reload();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg p-4 rounded-md mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Task Manager</h1>
        <div className="flex space-x-6">
          <Link
            to="/tasks"
            className="text-blue-500 font-semibold hover:text-blue-700"
          >
            Task List
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div>
        {/* Task Form Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
