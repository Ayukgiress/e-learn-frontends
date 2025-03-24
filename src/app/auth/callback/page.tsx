"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { jwtDecode } from "jwt-decode";
import { PROTECTED_ROUTES } from "@/app/constant/route";
import { Loader2 } from "lucide-react";
import RoleSelectionModal from "../../Components/RoleSelectorModal";
import { API_BASE_URL } from "@/app/constant/route";

interface DecodedToken {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  exp?: number;
  [key: string]: any;
}

export default function AuthCallback() {
  const [status, setStatus] = useState("Processing authentication...");
  const [error, setError] = useState<string | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const processAuthCallback = async () => {
      try {
        console.log("Starting auth callback processing");

        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");
        const needsRoleParam = urlParams.get("needsRole");
        
        if (!tokenFromUrl) {
          setError("No authentication token found");
          setTimeout(() => router.push("/login?error=no-token"), 2000);
          return;
        }

        try {
          const decoded = jwtDecode(tokenFromUrl) as DecodedToken;
          console.log("Decoded token:", decoded);
          
          const needsRole = needsRoleParam === "true";
          
          if (needsRole) {
            console.log("Role selection needed");
            setStatus("Please select your role to continue.");
            setShowRoleModal(true);
            return;
          }
          
          await login(tokenFromUrl);
          setStatus("Authentication successful! Redirecting...");
          
          if (decoded.id) {
            localStorage.setItem(`roleSelected_${decoded.id}`, "true");
          }
          
          redirectBasedOnRole(decoded.role?.toLowerCase() || "");
          
        } catch (decodeError) {
          console.error("Token decode error:", decodeError);
          setError("Invalid authentication token");
          setTimeout(() => router.push("/login?error=invalid-token"), 2000);
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setError("Authentication failed. Please try again.");
        setTimeout(() => router.push("/login?error=process-failed"), 2000);
      }
    };

    processAuthCallback();
  }, [router, login]);

  const redirectBasedOnRole = (role: string) => {
    const normalizedRole = role.toLowerCase();
    setTimeout(() => {
      switch (normalizedRole) {
        case "admin":
          router.push(PROTECTED_ROUTES.MANAGEMENT);
          break;
        case "instructor":
          router.push(PROTECTED_ROUTES.INSTRUCTOR);
          break;
        case "student":
          router.push(PROTECTED_ROUTES.STUDENT);
          break;
        default:
          router.push("/dashboard");
      }
    }, 1000);
  };

  const handleRoleSelection = async (selectedRole: string) => {
    setIsProcessing(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      
      if (!token) {
        throw new Error("No token available");
      }

      const response = await fetch(`${API_BASE_URL}/auth/update-role`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      const data = await response.json();
      
      const updatedToken = data.token || token;
      
      await login(updatedToken);
      
      const decoded = jwtDecode(updatedToken) as DecodedToken;
      
      if (decoded.id) {
        localStorage.setItem(`roleSelected_${decoded.id}`, "true");
      }

      setStatus("Role updated successfully! Redirecting...");
      redirectBasedOnRole(selectedRole);
    } catch (err) {
      console.error("Role update error:", err);
      setError("Failed to update role. Please try again.");
      setTimeout(() => router.push("/login"), 2000);
    } finally {
      setIsProcessing(false);
      setShowRoleModal(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-white">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-xl font-semibold mb-4">{error ? error : status}</h1>
        {!error && !showRoleModal && (
          <div className="flex justify-center">
            <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
          </div>
        )}
        {error && (
          <p className="text-sm text-gray-600 mt-4">
            Redirecting to login page...
          </p>
        )}

        <RoleSelectionModal
          isOpen={showRoleModal}
          onClose={() => router.push("/login")}
          onSelectRole={handleRoleSelection}
          isLoading={isProcessing}
        />
      </div>
    </div>
  );
}