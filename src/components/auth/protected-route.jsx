import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando...
      </div>
    );
    // Depois você pode trocar por um Skeleton do shadcn
  }

  if (!authenticated) {
    return <Navigate replace to="/login" />;
  }

  return children;
};
