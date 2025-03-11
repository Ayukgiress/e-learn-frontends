import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'sonner';
import { useGoogleLogin } from '../hooks/useAuth';


export const GoogleCallback = () => {
  const router = useRouter();
  const { credential } = router.query; 

  const mutation = useGoogleLogin();

  useEffect(() => {
    if (credential) {
      mutation.mutate(
        {
          credential,
          role: 'user',
        },
        {
          onSuccess: (data) => {
            toast.success('Logged in successfully');
          },
          onError: (error) => {
            toast.error('Failed to authenticate');
          },
        }
      );
    }
  }, [credential, mutation]);

  return <div>Loading...</div>;
};
