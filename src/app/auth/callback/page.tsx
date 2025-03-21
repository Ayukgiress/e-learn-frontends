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
  const [token, setToken] = useState<string | null>(null);
  const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const processAuthCallback = async () => {
      try {
        console.log("Starting auth callback processing");

        // Get params from URL
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token");

        // Check if this is a new user that needs role selection
        // This comes from our server's redirect
        const needsRoleParam = urlParams.get("needsRole");
        const needsRole = needsRoleParam === "true";

        console.log("Token exists:", !!tokenFromUrl);
        console.log("Needs role selection from URL param:", needsRole);

        if (!tokenFromUrl) {
          setError("No authentication token found");
          setTimeout(() => router.push("/login?error=no-token"), 2000);
          return;
        }

        try {
          const decoded = jwtDecode(tokenFromUrl) as DecodedToken;

          if (!decoded) throw new Error("Invalid token");

          console.log("Decoded token:", decoded);
          console.log("Token has role:", decoded.role);

          setToken(tokenFromUrl);
          setDecodedToken(decoded);

          // First check: did our server indicate this is a new user?
          if (needsRole) {
            console.log("Server indicated role selection needed");
            setStatus("Please select your role to continue.");
            setShowRoleModal(true);
            return;
          }

          // Second check: does the token have a role?
          const hasValidRole =
            decoded.role &&
            ["admin", "instructor", "student"].includes(
              decoded.role.toLowerCase()
            );

          // Always allow for role selection on first Google login
          // Need to track if this specific user has completed the process before
          const userHasSelectedRole = localStorage.getItem(
            `roleSelected_${decoded.id}`
          );
          const isGoogleFirstLogin =
            !userHasSelectedRole &&
            decoded.email &&
            decoded.email.includes("@");

          console.log("Has valid role:", hasValidRole);
          console.log("User has selected role before:", !!userHasSelectedRole);
          console.log("Is first Google login:", isGoogleFirstLogin);

          if (hasValidRole && !isGoogleFirstLogin) {
            // User has a valid role and this isn't first login, proceed
            console.log("User has valid role in token, proceeding to login");
            await login(tokenFromUrl);
            setStatus("Welcome back! Redirecting...");

            // Mark as having selected role
            if (decoded.id) {
              localStorage.setItem(`roleSelected_${decoded.id}`, "true");
            }

            redirectBasedOnRole((decoded.role ?? "").toLowerCase());
          } else {
            // No valid role or first login, show selector
            console.log(
              "Showing role selector due to first login or missing role"
            );
            setStatus("Please select your role to continue.");
            setShowRoleModal(true);
          }
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
    if (!token || !decodedToken) return;

    setIsProcessing(true);

    try {
      const apiBaseUrl = API_BASE_URL;
      const response = await fetch(`${apiBaseUrl}/auth/update-role`, {
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

      // Get updated token with role
      const data = await response.json();
      const updatedToken = data.token || token;

      // Store that this user has selected a role
      if (decodedToken.id) {
        localStorage.setItem(`roleSelected_${decodedToken.id}`, "true");
      }

      // Login with the updated token
      await login(updatedToken);

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
