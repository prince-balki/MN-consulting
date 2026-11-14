import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-paper">
        <div className="text-center">
          <span className="mx-auto block size-10 animate-spin rounded-full border-2 border-ink/15 border-t-gold" />
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
            Vérification de la session
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
