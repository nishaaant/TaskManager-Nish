import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchTasks, deleteTask } from "../services/api";
import { Task } from "../types/Task";
import TaskForm from "./TaskForm";

const TaskList: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [showAddForm, setShowAddForm] = useState(false);
	const [showEditForm, setShowEditForm] = useState<Task | null>(null);
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

	// const handleEdit = async (id: string, updatedTask: Partial<Task>): Promise<void> => {
	//   try {
	//     await updateTask(id, updatedTask);
	//     fetchAllTasks();
	//     setShowEditForm(null);
	//   } catch (error) {
	//     console.error("Error updating task:", error);
	//   }
	// };

	useEffect(() => {
		fetchAllTasks();
	}, []);

	return (
		<div className="p-6 bg-gray-100 min-h-screen">
			<div className="mb-6 flex justify-between items-center">
				<button
					onClick={() => navigate("/home")}
					className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
				>
					← Go Back to Home
				</button>
				<button
					onClick={() => setShowAddForm(!showAddForm)}
					className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
				>
					+ Add Task
				</button>
			</div>

			{showAddForm && (
				<TaskForm
					onTaskAdded={() => {
						fetchAllTasks();
						setShowAddForm(false);
					}}
				/>
			)}

			<h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
				Task List
			</h2>

			<div className="bg-white rounded-lg shadow-md p-4">
				{tasks.length === 0 ? (
					<p className="text-center text-gray-600">No tasks available.</p>
				) : (
					<table className="w-full border-collapse border border-gray-200">
						<thead>
							<tr className="bg-gray-200">
								<th className="border p-2">Task ID</th>
								<th className="border p-2">Title</th>
								<th className="border p-2">Priority</th>
								<th className="border p-2">Status</th>
								<th className="border p-2">Start Time</th>
								<th className="border p-2">End Time</th>
								<th className="border p-2">Total Time (hrs)</th>
								<th className="border p-2">Edit</th>
								<th className="border p-2">Delete</th>
							</tr>
						</thead>
						<tbody>
							{tasks.map((task) => (
								<tr key={task._id} className="text-center hover:bg-gray-50">
									<td className="border p-2">{task._id}</td>
									<td className="border p-2">{task.title}</td>
									<td className="border p-2">{task.priority}</td>
									<td className="border p-2">{task.status}</td>
									<td className="border p-2">{task.startTime}</td>
									<td className="border p-2">{task.endTime}</td>
									<td className="border p-2">
										{(
											(new Date(task.endTime).getTime() -
												new Date(task.startTime).getTime()) /
											(1000 * 60 * 60)
										).toFixed(2)}
									</td>
									<td className="border p-2">
										<button
											onClick={() => setShowEditForm(task)}
											className="text-blue-500 hover:text-blue-700"
										>
											✎
										</button>
									</td>
									<td className="border p-2">
										<button
											onClick={() => handleDelete(task._id)}
											className="text-red-500 hover:text-red-700"
										>
											❌
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
			{showEditForm && (
				<TaskForm
					taskId={showEditForm._id}
					onTaskAdded={async () => {
						await fetchAllTasks();
						setShowEditForm(null);
					}}
				/>
			)}
		</div>
	);
};

export default TaskList;
