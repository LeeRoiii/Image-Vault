import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";
import UnderDevelopmentPage from "./pages/UnderDevelopmentPage"; // 👈 import the page

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/under-development" element={<UnderDevelopmentPage />} /> {/* 👈 added route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
