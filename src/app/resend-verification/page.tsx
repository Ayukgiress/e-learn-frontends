"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Loader2, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { serverResendVerificationEmail } from "../action/auth"; // Adjust import path as needed

const validationSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type FormData = z.infer<typeof validationSchema>;

export default function ResendVerificationPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [verificationEmail, setVerificationEmail] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(validationSchema),
  });

  const handleResendVerification = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const result = await serverResendVerificationEmail(data.email);
      
      if (result.success) {
        setEmailSent(true);
        setVerificationEmail(data.email);
        toast.success("Verification email sent successfully!");
      } else {
        toast.error(result.error || "Failed to send verification email");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-blue-400 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:mt-16">
          <div className="px-8 py-12 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Email sent!</h2>
            <p className="text-gray-600 mb-8">
              We've sent a new verification link to <span className="font-medium">{verificationEmail}</span>. 
              Please check your inbox and click the link to activate your account.
            </p>
            
            <p className="text-sm text-gray-500 mb-6">
              Don't forget to check your spam folder if you don't see the email in your inbox.
            </p>
            
            <div className="mt-6">
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Return to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl overflow-hidden md:mt-16">
        <div className="px-8 py-12">
          <div className="flex items-center mb-6">
            <Link href="/login" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 ml-4">
              Resend Verification Email
            </h2>
          </div>
          
          <p className="text-gray-600 mb-8">
            Enter your email address below and we'll send you a new verification link.
          </p>

          <form onSubmit={handleSubmit(handleResendVerification)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register("email")}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-80 focus:ring-offset-2 transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Sending...
                </>
              ) : (
                "Send Verification Email"
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}