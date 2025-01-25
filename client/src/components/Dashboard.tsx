import React, { useEffect, useState } from "react";
import { getTaskStats } from "../services/api";

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);

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
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-bold">Total Tasks</h2>
          <p className="text-lg">{stats.totalTasks}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-bold">Completed Tasks</h2>
          <p className="text-lg">{stats.completedPercent}%</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-bold">Pending Tasks</h2>
          <p className="text-lg">{stats.pendingPercent}%</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h2 className="font-bold">Average Completion Time</h2>
          <p className="text-lg">{stats.avgCompletionTime} hours</p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold">Pending Task Breakdown (By Priority)</h2>
        <ul className="list-disc ml-5">
          {Object.entries(stats.groupedPendingStats).map(([priority, data]: any) => (
            <li key={priority}>
              <strong>Priority {priority}</strong>: 
              Lapsed: {data.totalLapsed.toFixed(2)} hours, 
              Remaining: {data.totalBalance.toFixed(2)} hours
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
