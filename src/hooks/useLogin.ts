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

  const handleLogin = async (email: string, password: string): Promise<"success" | "error" | "network-error"> => {
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error || !data.session) {
        const message = error?.message || "No active session";

        if (message.toLowerCase().includes("fetch") || message.toLowerCase().includes("network")) {
          showSnackbar("Network error. Please try again later.", "error");
          setIsLoading(false);
          return "network-error";
        }

        showSnackbar(message, "error");
        setIsLoading(false);
        return "error";
      }

      showSnackbar("Login successful!", "success");
      setIsLoading(false);

      setTimeout(() => {
        navigate("/");
      }, 1000);

      return "success";
    } catch (e) {
      showSnackbar("Unexpected error occurred.", "error");
      setIsLoading(false);
      return "network-error";
    }
  };

  return {
    handleLogin,
    isLoading,
    snackbar,
    setSnackbar,
  };
};
