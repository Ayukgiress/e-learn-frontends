"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

interface RoleGuardProps {
  role: "admin" | "student" | "instructor";
  children: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ role, children }) => {
  const { user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      useAuthStore.getState().checkAuth();

      if (!isLoading && (!user || user.role !== role)) {
        router.push("/unauthorized");
      }
    }
  }, [user, isLoading, role, router]);

  if (isLoading) {
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