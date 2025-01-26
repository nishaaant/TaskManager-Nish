import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const { token } = useAuth();

	return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
