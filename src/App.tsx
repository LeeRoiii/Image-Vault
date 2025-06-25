// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";

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
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <GuestRoute>
              <SignupPage />
            </GuestRoute>
          }
        />
        <Route path="/under-development" element={<UnderDevelopmentPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
