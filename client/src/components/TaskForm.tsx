import React, { useState } from "react";
import { createTask } from "../services/api";

const TaskForm: React.FC<{ onTaskAdded: () => void }> = ({ onTaskAdded }) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [priority, setPriority] = useState<number>(1);
  const [status, setStatus] = useState<"pending" | "finished">("pending");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createTask({ title, startTime, endTime, priority, status });
    onTaskAdded(); // Refresh the task list
    setTitle("");
    setStartTime("");
    setEndTime("");
    setPriority(1);
    setStatus("pending");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-md">
      <h2 className="text-xl font-bold mb-4">Add New Task</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
        className="block w-full mb-2 p-2 border rounded"
      />
      <input
        type="datetime-local"
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        required
        className="block w-full mb-2 p-2 border rounded"
      />
      <select
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        required
        className="block w-full mb-2 p-2 border rounded"
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            Priority {num}
          </option>
        ))}
      </select>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as "pending" | "finished")}
        required
        className="block w-full mb-4 p-2 border rounded"
      >
        <option value="pending">Pending</option>
        <option value="finished">Finished</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
