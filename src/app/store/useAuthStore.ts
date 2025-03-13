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
  exp?: number; 
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

export const useAuthStore = create<AuthStore>((set, get) => ({
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
      
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
      
      const currentState = get();
      const currentUser: UserData = currentState.user || {} as UserData;
      
      const normalizedRole = decoded.role?.toLowerCase() || currentUser.role?.toLowerCase() || "guest";
      
      const updatedUser = {
        ...currentUser, 
        id: decoded.id,  
        email: decoded.email || currentUser.email,
        firstName: decoded.firstName || currentUser.firstName,
        lastName: decoded.lastName || currentUser.lastName,
        createdAt: decoded.createdAt || currentUser.createdAt,
        updatedAt: decoded.updatedAt || currentUser.updatedAt,
        role: normalizedRole, 
        exp: decoded.exp,
      };
      
      set({
        user: updatedUser,
        isAdmin: normalizedRole === "admin",
        isStudent: normalizedRole === "student",
        isInstructor: normalizedRole === "instructor",
        isLoading: false,
      });
    } catch (error) {
      console.error("Login failed:", error);
      set({ isLoading: false });
      throw error;
    }
  },
  
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
    set({
      user: null,
      isLoading: false,
      isAdmin: false,
      isStudent: false,
      isInstructor: false,
    });
  },
  
  checkAuth: () => {
    if (!get().isLoading) {
      set({ isLoading: true });
      
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      
      if (token) {
        try {
          const decoded = jwtDecode<UserData>(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp && decoded.exp < currentTime) {
            console.log("Token expired");
            set({
              user: null,
              isAdmin: false,
              isStudent: false,
              isInstructor: false,
              isLoading: false,
            });
          } else {
            console.log("Token valid");
            const normalizedRole = decoded.role?.toLowerCase() || "guest"; 
            set({
              user: {
                ...decoded,
                role: normalizedRole
              },
              isAdmin: normalizedRole === "admin",
              isStudent: normalizedRole === "student",
              isInstructor: normalizedRole === "instructor",
              isLoading: false,
            });
          }
        } catch (error) {
          console.error("Invalid token:", error);
          set({
            user: null,
            isAdmin: false,
            isStudent: false,
            isInstructor: false,
            isLoading: false,
          });
        }
      } else {
        console.log("No token found");
        set({
          user: null,
          isAdmin: false,
          isStudent: false,
          isInstructor: false,
          isLoading: false,
        });
      }
    }
  },
}));