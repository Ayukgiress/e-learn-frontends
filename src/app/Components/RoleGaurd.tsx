"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { API_BASE_URL } from "../constant/route";

interface RoleGuardProps {
  role: "admin" | "student" | "instructor";
  children: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ role, children }) => {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !hasChecked) {
      useAuthStore.getState().checkAuth();
      setHasChecked(true);
    }
  }, [hasChecked]);

  useEffect(() => {
    if (!isLoading && hasChecked) {
      console.log("Auth check complete:");
      console.log("User:", user);
      console.log("Expected role:", role);
      console.log("Current role:", user?.role);

      // If we don't have a user or role doesn't match, try to fetch from backend
      if (!user || !user.role) {
        const token = localStorage.getItem("token");
        if (token) {
          // Fetch current user data from backend
          fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => response.json())
            .then((userData) => {
              // Normalize role to lowercase
              const normalizedRole = userData.role?.toLowerCase() || "guest";

              useAuthStore.setState({
                user: {
                  ...userData,
                  role: normalizedRole,
                },
                isAdmin: normalizedRole === "admin",
                isStudent: normalizedRole === "student",
                isInstructor: normalizedRole === "instructor",
              });
            })
            .catch((error) => {
              console.error("Failed to fetch user data:", error);
              router.push("/unauthorized");
            });
        } else {
          router.push("/unauthorized");
        }
      } else if (user.role !== role) {
        router.push("/unauthorized");
      }
    }
  }, [user, isLoading, role, router, hasChecked]);

  if (isLoading || !hasChecked) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || user.role !== role) {
    return null;
  }

  return <>{children}</>;
};

export default RoleGuard;
