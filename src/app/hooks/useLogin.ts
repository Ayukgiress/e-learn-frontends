import { useState } from 'react';
import { API_BASE_URL } from '../constant/route';
import { useMutation } from '@tanstack/react-query';

interface LoginData {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  message?: string;
  success?: boolean;
  refreshToken?: string;
  expiresIn?: number;
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: LoginData) => {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const responseData: LoginResponse = await response.json();
      return responseData;
    },
  });
}

export const useForgotPasswordMutation = () => {
    return useMutation({
      mutationFn: async (data: { email: string }) => {
        const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "An error occurred");
        }
  
        return response.json();
      },
    });
  };

  export const useResetPasswordMutation = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
  
    const resetPassword = async (data: { token: string; newPassword: string }) => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to reset password");
        }
  
        return await response.json();
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"));
        throw err;
      } finally {
        setIsLoading(false);
      }
    };
  
    const mutate = (
      data: { token: string; newPassword: string },
      options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
        onSettled?: () => void;
      }
    ) => {
      resetPassword(data)
        .then((result) => {
          if (options?.onSuccess) options.onSuccess(result);
        })
        .catch((err) => {
          if (options?.onError) options.onError(err);
        })
        .finally(() => {
          if (options?.onSettled) options.onSettled();
        });
    };
  
    return {
      mutate,
      isLoading,
      error,
    };
  };
