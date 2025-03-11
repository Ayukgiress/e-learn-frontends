// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from '@/components/GoogleLoginButton'; // Adjust the import path as needed

export default function AuthCallback() {
  const [status, setStatus] = useState('Processing authentication...');
  const router = useRouter();
  const { processAuthToken } = useGoogleLogin();

  useEffect(() => {
    // Process the token from URL
    const hasToken = processAuthToken();
    
    if (hasToken) {
      setStatus('Authentication successful! Redirecting...');
      // Redirect to dashboard or homepage after successful login
      setTimeout(() => {
        router.push('/dashboard'); // Adjust destination as needed
      }, 1000);
    } else {
      setStatus('Authentication failed. Please try again.');
      // Redirect to login page on failure
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }, [router, processAuthToken]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">{status}</h1>
        {/* Optional loading spinner */}
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
      </div>
    </div>
  );
}