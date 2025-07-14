import { useState, useCallback } from "react";
import { toast } from "sonner";

interface UseErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const { showToast = true, logError = true } = options;
  const [error, setError] = useState<Error | null>(null);
  const [isError, setIsError] = useState(false);

  const handleError = useCallback(
    (error: unknown) => {
      const errorObj =
        error instanceof Error ? error : new Error(String(error));

      setError(errorObj);
      setIsError(true);

      if (logError) {
        console.error("Application Error:", errorObj);
      }

      if (showToast) {
        toast.error(errorObj.message || "Une erreur inattendue s'est produite");
      }
    },
    [showToast, logError]
  );

  const clearError = useCallback(() => {
    setError(null);
    setIsError(false);
  }, []);

  const resetError = clearError; // Alias pour plus de clarté

  return {
    error,
    isError,
    handleError,
    clearError,
    resetError,
  };
}
