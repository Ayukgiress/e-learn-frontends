"use client";

import React from 'react';
import { FcGoogle } from 'react-icons/fc';

interface GoogleLoginButtonProps {
  className?: string;
}

export const GoogleLoginButton = ({ className = '' }: GoogleLoginButtonProps) => {
  // Function to redirect to the backend auth endpoint
  const handleGoogleLogin = () => {
    // Use environment variable or default to localhost
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
    
    // Make sure the URL is constructed properly
    const authUrl = `${apiBaseUrl}/auth/google`;
    
    console.log('Redirecting to Google auth:', authUrl);
    window.location.href = authUrl;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className={`flex items-center justify-center w-full min-h-[40px] bg-white text-gray-800 font-semibold rounded shadow hover:bg-gray-200 transition duration-200 ${className}`}
    >
      <FcGoogle size={20} />
      <span className="ml-2">Sign in with Google</span>
    </button>
  );
};

// The useGoogleLogin hook looks good as is
export function useGoogleLogin() {
  const processAuthToken = () => {
    // Get token from URL if present
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    if (token) {
      // Store token in localStorage
      localStorage.setItem('auth_token', token);
      return true;
    }
    return false;
  };
  
  return { processAuthToken };
}