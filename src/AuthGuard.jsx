import { Navigate, Outlet } from "react-router";

function AuthGuard() {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthGuard;