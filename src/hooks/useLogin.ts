import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const showSnackbar = (message: string, type: "success" | "error" = "success") => {
    setSnackbar({ visible: true, message, type });
    setTimeout(() => setSnackbar((prev) => ({ ...prev, visible: false })), 3000);
  };

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.session) {
      showSnackbar(error?.message || "No active session", "error");
      setIsLoading(false);
      return;
    }

    showSnackbar("Login successful!", "success");
    setIsLoading(false);

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return {
    handleLogin,
    isLoading,
    snackbar,
    setSnackbar,
  };
};
