import React, { useEffect, useCallback, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useRouter } from 'next/navigation';
import RoleSelectionModal from '../Components/RoleSelectorModal';
import { toast } from 'sonner';
import { API_BASE_URL, PROTECTED_ROUTES } from '../constant/route';
// import { Import } from 'lucide-react';
import { useGoogleLogin } from '../hooks/useAuth';

declare global {
  interface Window {
    google: any;
  }
}

interface GoogleButtonProps {
  className?: string;
  onError?: (message: string) => void;
  debug?: boolean;
}

export const GoogleButton = ({
  className = '',
  onError,
  debug = false
}: GoogleButtonProps) => {
  const login = useAuthStore(state => state.login);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [googleResponse, setGoogleResponse] = useState<any>(null);

  const { mutateAsync: googleLoginMutation } = useGoogleLogin(); // Destructure mutateAsync from the hook

  const handleRoleSelection = async (role: string) => {
    setIsLoading(true);

    try {
      if (!googleResponse?.credential) {
        throw new Error('Google authentication credential is missing');
      }

      const data = await googleLoginMutation({
        credential: googleResponse.credential,
        role,
      });

      if (!data.token) {
        throw new Error('No authentication token received');
      }

      await login(data.token);
      toast.success('Successfully logged in');

      const roleRoutes = {
        student: PROTECTED_ROUTES.STUDENT,
        instructor: PROTECTED_ROUTES.INSTRUCTOR,
        admin: PROTECTED_ROUTES.MANAGEMENT,
      };

      const targetRoute = roleRoutes[role as keyof typeof roleRoutes];
      if (!targetRoute) {
        throw new Error('Invalid role selected');
      }

      router.push(targetRoute);
    } catch (error) {
      console.error('Google auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      onError?.(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setShowRoleModal(false);
    }
  };

  const handleGoogleLogin = useCallback((response: any) => {
    if (debug) {
      console.log('Google response received:', response);
    }

    if (!response?.credential) {
      console.error('Invalid Google response received');
      onError?.('Invalid Google response received');
      return;
    }

    setGoogleResponse(response);
    setShowRoleModal(true);
  }, [debug, onError]);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      const error = 'Missing Google Client ID in environment variables';
      console.error(error);
      onError?.(error);
      return;
    }

    if (debug) {
      console.log('Using Google Client ID:', clientId);
    }

    if (typeof window === 'undefined' || !window.google) {
      console.error('Google client library not loaded');
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleLogin,
        ux_mode: 'redirect',
        auto_select: false,
        context: 'signin',
      });

      const buttonDiv = document.getElementById('googleButton');
      if (buttonDiv) {
        window.google.accounts.id.renderButton(buttonDiv, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          width: 384,
        });
      } else {
        console.error('Google button container not found');
      }
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
      onError?.('Failed to initialize Google Sign-In');
    }
  }, [handleGoogleLogin, debug, onError]);

  return (
    <>
      <div
        id="googleButton"
        className={`w-full min-h-[40px] ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      />
      <RoleSelectionModal
        isOpen={showRoleModal}
        onClose={() => {
          if (!isLoading) {
            setShowRoleModal(false);
            setGoogleResponse(null);
          }
        }}
        onSelectRole={handleRoleSelection}
        isLoading={isLoading}
      />
    </>
  );
};
