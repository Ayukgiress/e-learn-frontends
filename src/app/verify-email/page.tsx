"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { serverVerifyEmail } from "../action/auth"; 

export default function VerifyEmailPage() {
  const [verificationStatus, setVerificationStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const searchParams = useSearchParams();
  const router = useRouter();
  
  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      
      if (!token) {
        setVerificationStatus("error");
        setErrorMessage("No verification token provided");
        return;
      }
      
      try {
        const result = await serverVerifyEmail(token);
        
        if (result.success) {
          setVerificationStatus("success");
        } else {
          setVerificationStatus("error");
          setErrorMessage(result.error || "Verification failed");
        }
      } catch (error) {
        setVerificationStatus("error");
        setErrorMessage("An unexpected error occurred during verification");
      }
    };
    
    verifyEmail();
  }, [searchParams]);
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:mt-16">
        <div className="px-8 py-12 text-center">
          {verificationStatus === "loading" && (
            <>
              <Loader2 className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verifying your email</h2>
              <p className="text-gray-600 mb-8">
                Please wait while we verify your email address...
              </p>
            </>
          )}
          
          {verificationStatus === "success" && (
            <>
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Email verified!</h2>
              <p className="text-gray-600 mb-8">
                Your email has been successfully verified. You can now sign in to your account.
              </p>
              
              <Link
                href="/login"
                className="w-full inline-block py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80 focus:ring-offset-2 transition-colors"
              >
                Sign In
              </Link>
            </>
          )}
          
          {verificationStatus === "error" && (
            <>
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification failed</h2>
              <p className="text-gray-600 mb-8">
                {errorMessage || "We couldn't verify your email. The verification link may have expired or is invalid."}
              </p>
              
              <div className="space-y-4">
                <Link
                  href="/resend-verification"
                  className="w-full inline-block py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80 focus:ring-offset-2 transition-colors"
                >
                  Resend Verification Email
                </Link>
                
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 block mt-4"
                >
                  Return to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}