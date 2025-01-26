import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
      <Routes>
				<Route path="/" element={auth.token ? <Navigate to="/home" /> : <Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
					{/* Home Page */}
					<Route path="/home" element={<HomePage />} />

					{/* Task List Page */}
					<Route path="/tasks" element={<TaskList />} />
				</Routes>
		</Router>
	);
};

export default App;
