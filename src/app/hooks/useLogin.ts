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
