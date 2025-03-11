'use server';


import { z } from "zod";

const validationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long").min(1, "Password is required"),
  role: z.string().min(1, "Please select a role"),
});

export async function validateRegistrationData(formData: FormData) {
  return validationSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });
}

export async function serverRegisterUser(formData: FormData) {
  const validatedFields = validationSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    role: formData.get('role'),
  });

  if (!validatedFields.success) {
    return { 
      success: false, 
      error: "Invalid form data" 
    };
  }

  try {
    const response = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    
    return { 
      success: true,
      verificationRequired: true, 
      email: validatedFields.data.email,
      data 
    };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Registration failed" 
    };
  }
}

export async function serverVerifyEmail(token: string) {
  try {
    // Notice the URL structure change - using query parameter instead of path parameter
    const response = await fetch(`http://localhost:5000/auth/verify-email?token=${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
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

export async function serverResendVerificationEmail(email: string) {
  try {
    const response = await fetch(`http://localhost:5000/auth/resend-verification`, {
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