import { Navigate } from "react-router-dom";

export default function AdminProtectedRoute({
  children,
}: any) {
  const isLoggedIn =
    localStorage.getItem("admin");

  return isLoggedIn ? children : (
    <Navigate to="/admin/login" />
  );
}