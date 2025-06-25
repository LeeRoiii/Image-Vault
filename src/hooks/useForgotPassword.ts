import { useState } from "react";
import { supabase } from "../supabase";
import type { SnackbarState } from "../utils/types";

export const useForgotPassword = (
  setSnackbar: React.Dispatch<React.SetStateAction<SnackbarState>>
) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (email: string) => {
    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "https://image-vault-puce.vercel.app/reset-password",
    });

    setIsLoading(false);

    if (error) {
      // You can still log the real error for debugging, but hide it from the user
      console.error("Reset error:", error.message);

      setSnackbar({
        visible: true,
        message: "Something went wrong. Please try again later.",
        type: "error",
      });
    } else {
      setSnackbar({
        visible: true,
        message: "If the account exists, a reset link has been sent.",
        type: "info", // You can use "info" here if your snackbar supports it
      });
    }
  };

  return {
    handleForgotPassword,
    isLoading,
  };
};
