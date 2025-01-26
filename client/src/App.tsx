import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./hooks/useAuth";
import HomePage from "./pages/HomePage";
import TaskList from "./components/TaskList";

const App: React.FC = () => {
	const auth = useAuth();

	const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
		return auth.token ? children : <Navigate to="/login" />;
	};

	return (
		<Router>
				{/* <Route path="/" element={auth.token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> */}
				<Routes>
					{/* Home Page */}
					<Route path="/home" element={<HomePage />} />

					{/* Dashboard Page */}
					<Route path="/dashboard" element={<Dashboard />} />

					{/* Task List Page */}
					<Route path="/tasks" element={<TaskList />} />
				</Routes>
		</Router>
	);
};

export default App;
