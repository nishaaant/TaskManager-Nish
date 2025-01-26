import React from "react";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

const HomePage: React.FC = () => {

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

      <div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
