import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage";
import { supabase } from "./supabase";
import type { JSX } from "react/jsx-dev-runtime";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setAuthenticated(!!data.session);
    };
    getSession();
  }, []);

  if (authenticated === null) return null; // or a loading spinner
  return authenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/under-development" element={<UnderDevelopmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
