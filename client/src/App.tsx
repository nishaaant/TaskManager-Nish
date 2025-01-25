import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskStats from "./components/TaskStats";

const App: React.FC = () => {
  const [view, setView] = useState<"tasks" | "stats">("tasks");

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task Management App</h1>
        <div>
          <button
            onClick={() => setView("tasks")}
            className={`py-2 px-4 rounded ${
              view === "tasks" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            View Tasks
          </button>
          <button
            onClick={() => setView("stats")}
            className={`ml-2 py-2 px-4 rounded ${
              view === "stats" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            View Statistics
          </button>
        </div>
      </div>
      {view === "tasks" ? <TaskList /> : <TaskStats />}
    </div>
  );
};

export default App;
