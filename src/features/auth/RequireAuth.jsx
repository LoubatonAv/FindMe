import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // or return <div>Loading...</div>;
  if (!user) return <Navigate to="/signin" />;

  return children;
}
