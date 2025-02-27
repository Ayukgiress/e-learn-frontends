"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import { verifyEmail } from "../../action/auth";
import { useAuthStore } from "../../store/useAuthStore";
import { PROTECTED_ROUTES } from "../../constant/route";

const VerifyEmail = () => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) {
        setVerificationStatus('error');
        setError("Invalid verification link. The verification token is missing.");
        return;
      }

      try {
        const result = await verifyEmail(token);
        
        if (result.success) {
          setVerificationStatus('success');
          toast.success("Email verified successfully!");
          
          if (result.data?.token) {
            const login = useAuthStore.getState().login;
            await login(result.data.token);
            
            // Redirect after a short delay to show success message
            setTimeout(() => {
              const userRole = result.data.user?.role?.toLowerCase() || 'student';
              switch (userRole) {
                case "student":
                  router.push(PROTECTED_ROUTES.STUDENT);
                  break;
                case "instructor":
                  router.push(PROTECTED_ROUTES.INSTRUCTOR);
                  break;
                case "admin":
                  router.push(PROTECTED_ROUTES.MANAGEMENT);
                  break;
                default:
                  router.push('/login');
              }
            }, 2000);
          } else {
            setTimeout(() => {
              router.push('/login');
            }, 3000);
          }
        } else {
          setVerificationStatus('error');
          setError(result.error || "Email verification failed. Please try again or request a new verification link.");
          toast.error(result.error || "Email verification failed");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setVerificationStatus('error');
        setError("An unexpected error occurred. Please try again later.");
        toast.error("An unexpected error occurred");
      }
    };

    verifyUserEmail();
  }, [token, router]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:mt-16">
        <div className="px-8 py-12 text-center">
          {verificationStatus === 'loading' && (
            <>
              <Loader2 className="animate-spin h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying Your Email</h2>
              <p className="text-gray-600">Please wait while we verify your email address...</p>
            </>
          )}

          {verificationStatus === 'success' && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified Successfully!</h2>
              <p className="text-gray-600 mb-8">
                Your email has been verified successfully. You can now access your account.
              </p>
              <p className="text-gray-500 text-sm mb-6">
                You'll be redirected automatically in a few seconds...
              </p>
              <Link
                href="/login"
                className="w-full inline-block py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 focus:ring-offset-2 transition-colors"
              >
                Go to Login
              </Link>
            </>
          )}

          {verificationStatus === 'error' && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h2>
              <p className="text-gray-600 mb-8">
                {error}
              </p>
              <div className="space-y-4">
                <Link
                  href="/login"
                  className="w-full inline-block py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 focus:ring-offset-2 transition-colors"
                >
                  Go to Login
                </Link>
                <Link
                  href="/"
                  className="w-full inline-block py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-blue-300 focus:ring-offset-2 transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;