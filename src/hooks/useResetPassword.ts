// src/hooks/useResetPassword.ts
import { useState } from "react";
import { supabase } from "../supabase";

export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async (password: string) => {
    setIsLoading(true);
    setSuccess(false);
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    setIsLoading(false);

    if (error) {
      console.error("Password reset failed:", error.message);
      setError("Failed to reset password. Please try again.");
    } else {
      setSuccess(true);
    }
  };

  return {
    handleResetPassword,
    isLoading,
    success,
    error,
  };
};
