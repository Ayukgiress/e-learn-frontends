'use server';

import { Import } from "lucide-react";
import { z } from "zod";
import { API_BASE_URL } from "../constant/route";

const validationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long").min(1, "Password is required"),
  role: z.string().min(1, "Please select a role"),
});

export async function registerUser(formData: FormData) {
  const validatedFields = validationSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    const errorMessage = Object.values(fieldErrors)
      .flat()
      .join(', ');
    
    return { 
      success: false, 
      error: errorMessage || "Invalid form data" 
    };
  }

  try {
    const checkEmailResponse = await fetch(`${API_BASE_URL}/auth/check-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: validatedFields.data.email }),
    });

    if (!checkEmailResponse.ok) {
      const errorData = await checkEmailResponse.json();
      if (errorData.code === "EMAIL_EXISTS") {
        return { 
          success: false, 
          error: "This email is already registered. Please use a different email or try logging in." 
        };
      }
    }

    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    
    if (data.verificationRequired) {
      return { 
        success: true,
        verificationRequired: true,
        email: validatedFields.data.email,
        data 
      };
    }
    
    return { 
      success: true, 
      data 
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Registration failed. Please try again later." 
    };
  }
}

export async function verifyEmail(token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Email verification failed");
    }

    const data = await response.json();
    return { 
      success: true, 
      data 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Email verification failed" 
    };
  }
}

export async function resendVerificationEmail(email: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to resend verification email");
    }

    return { 
      success: true
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to resend verification email" 
    };
  }
}