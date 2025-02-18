"use client";

import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthStore {
  user: UserData | null;
  isLoading: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  isInstructor: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  isAdmin: false,
  isStudent: false,
  isInstructor: false,

  login: async (token: string) => {
    try {
      console.log("Token received:", token);
      const decoded = jwtDecode<UserData>(token);
      console.log("Decoded token:", decoded);
      
      localStorage.setItem("token", token);
      
      set({
        user: decoded,
        isAdmin: decoded.role === "admin",
        isStudent: decoded.role === "student",
        isInstructor: decoded.role === "instructor",
        isLoading: false,
      });
    } catch (error) {
      console.error("Login failed:", error);
      throw error; 
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      user: null,
      isLoading: false,
      isAdmin: false,
      isStudent: false,
      isInstructor: false,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<UserData>(token);
        const currentTime = Date.now() / 1000;
        
        if ((decoded as any).exp && (decoded as any).exp < currentTime) {
          console.log("Token expired");
          set({
            user: null,
            isLoading: false,
            isAdmin: false,
            isStudent: false,
            isInstructor: false,
          });
        } else {
          console.log("Token valid");
          set({
            user: decoded,
            isAdmin: decoded.role === "admin",
            isStudent: decoded.role === "student",
            isInstructor: decoded.role === "instructor",
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Invalid token:", error);
        set({
          user: null,
          isLoading: false,
          isAdmin: false,
          isStudent: false,
          isInstructor: false,
        });
      }
    } else {
      console.log("No token found");
      set({
        user: null,
        isLoading: false,
        isAdmin: false,
        isStudent: false,
        isInstructor: false,
      });
    }
  },
}));