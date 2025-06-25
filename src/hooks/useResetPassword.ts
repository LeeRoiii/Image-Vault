// src/hooks/useResetPassword.ts
import { useState } from "react";
import { supabase } from "../supabase"; 
export const useResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (password: string) => {
    setIsLoading(true);
    setSuccess(false);

    const { error } = await supabase.auth.updateUser({ password });

    setIsLoading(false);
    if (!error) setSuccess(true);
  };

  return {
    handleResetPassword,
    isLoading,
    success,
  };
};
