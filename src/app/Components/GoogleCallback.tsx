import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { useGoogleLogin } from '../hooks/useAuth';
import { Mutation } from '@tanstack/react-query';


export const GoogleCallback = () => {
  const router = useRouter();
  const { credential } = router.query; 

  const { processAuthToken } = useGoogleLogin();

  useEffect(() => {
    if (credential) {
      const success = processAuthToken();
      if (success) {
        toast.success('Logged in successfully');
      } else {
        toast.error('Failed to authenticate');
      }
    }
  }, [credential]);

  return <div>Loading...</div>;
};
