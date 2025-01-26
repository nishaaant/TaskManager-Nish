import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { loginUser } from "../services/api";

const Login: React.FC = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const auth = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await loginUser({ email, password });
			const { user, token } = response;
			auth.login(user, token);
			navigate("/home"); // Redirect to dashboard on successful login
		} catch (err: any) {
			setError(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="container mx-auto p-4">
			<h2 className="text-2xl font-bold mb-4">Login</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				{error && <p className="text-red-500">{error}</p>}
				<div>
					<label className="block mb-2">Email</label>
					<input
						type="email"
						className="border p-2 rounded w-full"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</div>
				<div>
					<label className="block mb-2">Password</label>
					<input
						type="password"
						className="border p-2 rounded w-full"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button
					type="submit"
					className="bg-blue-500 text-white p-2 rounded w-full"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
