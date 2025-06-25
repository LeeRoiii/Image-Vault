// src/routes/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase"; 
import type { JSX } from "react/jsx-runtime";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setAuthenticated(!!data.session);
    };
    getSession();
  }, []);

  if (authenticated === null) return null;
  return authenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
