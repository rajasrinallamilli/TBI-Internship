import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Get JWT token from browser localStorage
  const token = localStorage.getItem("token");

  // If token is not available, redirect user to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token is available, show the protected page
  return children;
}

export default ProtectedRoute;