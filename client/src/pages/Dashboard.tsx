import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { getTaskStats } from "../services/api";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getTaskStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch task stats:", error);
      }
    };
    fetchStats();
  }, []);

  if (!stats) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Navigation Back Button
      <div className="mb-6">
        <button
          onClick={() => navigate("/home")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
        >
          ← Go Back to Home
        </button>
      </div> */}

      {/* Dashboard Title */}
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Task Dashboard
      </h1>

      {/* Task Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Total Tasks</h2>
          <p className="text-2xl font-semibold text-blue-500">{stats.totalTasks}</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Completed Tasks</h2>
          <p className="text-2xl font-semibold text-green-500">{stats.completedPercent}%</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Pending Tasks</h2>
          <p className="text-2xl font-semibold text-yellow-500">{stats.pendingPercent}%</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Average Completion Time
          </h2>
          <p className="text-2xl font-semibold text-indigo-500">
            {stats.avgCompletionTime} hours
          </p>
        </div>
      </div>

      {/* Pending Task Breakdown */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">
          Pending Task Breakdown (By Priority)
        </h2>
        {stats.groupedPendingStats && Object.keys(stats.groupedPendingStats).length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-4 border border-gray-300">Priority</th>
                  <th className="p-4 border border-gray-300">Lapsed Time (hours)</th>
                  <th className="p-4 border border-gray-300">Remaining Time (hours)</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(stats.groupedPendingStats).map(([priority, data]: any) => (
                  <tr
                    key={priority}
                    className="hover:bg-gray-100 transition duration-200"
                  >
                    <td className="p-4 border border-gray-300 text-gray-700 font-medium">
                      Priority {priority}
                    </td>
                    <td className="p-4 border border-gray-300 text-red-500">
                      {data.totalLapsed} hours
                    </td>
                    <td className="p-4 border border-gray-300 text-green-500">
                      {data.totalBalance} hours
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No pending tasks to show.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
