import React, { useEffect, useState } from "react";
import { fetchTaskStats } from "../services/api";

interface TaskStats {
	totalTasks: number;
	completedPercent: number;
	pendingPercent: number;
	pendingTimeByPriority: {
		priority: number;
		timeLapsed: number;
		balanceTime: number;
	}[];
	avgCompletionTime: number;
}

const TaskStats: React.FC = () => {
	const [stats, setStats] = useState<TaskStats | null>(null);

	const fetchStatistics = async () => {
		const data = await fetchTaskStats();
		setStats(data);
	};

	useEffect(() => {
		fetchStatistics();
	}, []);

	if (!stats) return <p>Loading statistics...</p>;

	return (
		<div>
			<h2 className="text-xl font-bold mb-4">Task Statistics</h2>
			<p>
				<strong>Total Tasks:</strong> {stats.totalTasks}
			</p>
			<p>
				<strong>Completed Tasks:</strong> {stats.completedPercent}%
			</p>
			<p>
				<strong>Pending Tasks:</strong> {stats.pendingPercent}%
			</p>
			<h3 className="mt-4 font-semibold">Pending Time by Priority:</h3>
			<ul>
				{stats.pendingTimeByPriority.map((priorityStats) => (
					<li
						key={priorityStats.priority}
						className="mb-2 p-2 border rounded bg-gray-100"
					>
						<p>
							<strong>Priority:</strong> {priorityStats.priority}
						</p>
						<p>
							<strong>Time Lapsed:</strong>{" "}
							{priorityStats.timeLapsed.toFixed(2)} hours
						</p>
						<p>
							<strong>Balance Time:</strong>{" "}
							{priorityStats.balanceTime.toFixed(2)} hours
						</p>
					</li>
				))}
			</ul>
			<p className="mt-4">
				<strong>Average Completion Time:</strong>{" "}
				{stats.avgCompletionTime.toFixed(2)} hours
			</p>
		</div>
	);
};

export default TaskStats;
