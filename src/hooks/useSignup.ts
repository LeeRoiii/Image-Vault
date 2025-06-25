import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export const useSignup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({
    visible: false,
    message: "",
    type: "success",
  });

  const localShowSnackbar = (message: string, type: "success" | "error" = "success") => {
    setSnackbar({ visible: true, message, type });
    setTimeout(() => setSnackbar((prev) => ({ ...prev, visible: false })), 3000);
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSignup = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (!validateEmail(email)) {
      localShowSnackbar("Invalid email format.", "error");
      return;
    }

    if (password.length < 6) {
      localShowSnackbar("Password must be at least 6 characters.", "error");
      return;
    }

    if (password !== confirmPassword) {
      localShowSnackbar("Passwords do not match.", "error");
      return;
    }

    setIsLoading(true);

    await supabase.auth.signUp({ email, password });

    localShowSnackbar("Signup successful! Check your email.", "success");
    setIsLoading(false);
    setTimeout(() => navigate("/login"), 1500);
  };

  return {
    handleSignup,
    isLoading,
    snackbar,
    setSnackbar,
  };
};
