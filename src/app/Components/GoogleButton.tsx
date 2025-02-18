import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { FcGoogle } from 'react-icons/fc';

interface CredentialResponse {
  credential: string;
}

declare global {
  interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            auto_select?: boolean;
          }) => void;
          prompt: (callback: (notification: any) => void) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, any>
          ) => void;
        };
      };
    };
  }
}

const GoogleLoginButton = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  // First useEffect to check if script is loaded
  useEffect(() => {
    const checkGoogleScript = () => {
      if (typeof window !== 'undefined' && window.google?.accounts?.id) {
        setIsScriptLoaded(true);
        return true;
      }
      return false;
    };

    if (checkGoogleScript()) {
      return;
    }

    const scriptCheckInterval = setInterval(() => {
      if (checkGoogleScript()) {
        clearInterval(scriptCheckInterval);
      }
    }, 1000);

    return () => {
      clearInterval(scriptCheckInterval);
    };
  }, []);

  // Second useEffect to initialize Google Sign-In once script is loaded
  useEffect(() => {
    if (!isScriptLoaded || isInitialized) {
      return;
    }

    const initializeGoogleSignIn = () => {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
      
      if (!clientId) {
        console.error('Google Client ID is not configured');
        toast.error('Google Sign-In configuration error');
        return;
      }

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: CredentialResponse) => {
            try {
              const result = await fetch('/api/auth/google/callback', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ credential: response.credential }),
              });

              if (!result.ok) {
                throw new Error('Failed to authenticate with server');
              }

              const data = await result.json();
              localStorage.setItem('token', data.token);
              
              toast.success('Login successful');
              router.push('/dashboard');
            } catch (error) {
              console.error('Authentication failed:', error);
              toast.error('Failed to complete Google authentication');
            }
          },
          auto_select: false,
        });

        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Google Sign-In:', error);
        toast.error('Failed to initialize Google Sign-In');
      }
    };

    initializeGoogleSignIn();
  }, [isScriptLoaded, isInitialized, router]);

  const handleGoogleSignIn = () => {
    if (!isScriptLoaded || !isInitialized) {
      toast.error('Google Sign-In is not ready yet. Please try again in a moment.');
      return;
    }

    try {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed || notification.isSkippedMoment) {
          const reason = notification.getNotDisplayedReason?.() || 
                        notification.getSkippedReason?.() || 
                        'Unknown error';
          console.error('Google Sign-In prompt failed:', reason);
          toast.error('Unable to show Google Sign-In prompt');
        }
      });
    } catch (error) {
      console.error('Failed to prompt Google Sign-In:', error);
      toast.error('Failed to start Google login process');
    }
  };

  // Don't render during SSR
  if (typeof window === 'undefined') return null;

  return (
    <div className="w-full flex justify-center">
      <button
        onClick={handleGoogleSignIn}
        disabled={!isScriptLoaded || !isInitialized}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FcGoogle className="h-5 w-5" />
        {!isScriptLoaded || !isInitialized ? 'Loading...' : 'Continue with Google'}
      </button>
    </div>
  );
};

export default GoogleLoginButton;