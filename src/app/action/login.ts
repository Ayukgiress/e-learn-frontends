"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Enhanced validation schema
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

interface LoginResponse {
  success: boolean;
  user?: {
    token: string;
    role: string;
    expiresIn?: number;
  };
  error?: string;
}

export async function loginUser(formData: { email: string, password: string, rememberMe?: boolean }): Promise<LoginResponse> {
  try {
    // Validate input
    const validatedFields = loginSchema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.errors[0]?.message || "Invalid input data",
      };
    }

    const { email, password, rememberMe } = validatedFields.data;

    // API call
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, rememberMe }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Handle specific error cases
      if (response.status === 401) {
        return { success: false, error: "Invalid credentials" };
      }
      if (response.status === 429) {
        return { success: false, error: "Too many attempts. Please try again later." };
      }

      return {
        success: false,
        error: errorData.message || `Login failed with status ${response.status}`,
      };
    }

    const data = await response.json();

    // Validate response data
    if (!data.token || !data.user?.role) {
      console.error("Invalid server response:", data);
      return { success: false, error: "Invalid server response" };
    }

    // Set cookie with appropriate options
    const cookieStore = cookies();
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60; // 30 days : 24 hours

    cookieStore.set("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    });

    return {
      success: true,
      user: {
        token: data.token,
        role: data.user.role,
        expiresIn: maxAge,
      },
    };

  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again.",
    };
  }
}
