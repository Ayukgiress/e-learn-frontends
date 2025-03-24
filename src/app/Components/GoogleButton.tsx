"use client";
import { API_BASE_URL } from '@/app/constant/route';

import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'sonner';

interface GoogleLoginButtonProps {
  className?: string;
}

export const GoogleLoginButton = ({ className = '' }: GoogleLoginButtonProps) => {
  const handleGoogleLogin = () => {
    try {
      const apiBaseUrl = API_BASE_URL      
      const authUrl = `${apiBaseUrl}/auth/google`;
      
      console.log('Redirecting to Google auth:', authUrl);
      
      window.location.href = authUrl;
    } catch (error) {
      console.error('Google login error:', error);
      toast.error('Failed to connect to authentication service');
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className={`flex items-center justify-center w-full py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 ${className}`}
    >
      <FcGoogle size={20} />
      <span className="ml-2 font-medium">Continue with Google</span>
    </button>
  );
};