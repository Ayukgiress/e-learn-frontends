// app/auth/callback/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGoogleLogin } from './hooks/useAuth';

export default function AuthCallback() {
  const [status, setStatus] = useState('Processing authentication...');
  const router = useRouter();
  const { processAuthToken } = useGoogleLogin();

  useEffect(() => {
    const hasToken = processAuthToken();
    
    if (hasToken) {
      setStatus('Authentication successful! Redirecting...');
      setTimeout(() => {
        router.push('/dashboard'); 
      }, 1000);
    } else {
      setStatus('Authentication failed. Please try again.');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  }, [router, processAuthToken]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-semibold mb-4">{status}</h1>
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
      </div>
    </div>
  );
}