import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';

interface RoleGuardProps {
  role: string;
  children: ReactNode;
}

const RoleGuard: React.FC<RoleGuardProps> = ({ role, children }) => {
  const { user } = useAuth();
  const router = useRouter();

  if (!user || user.role !== role) {
    router.push('/unauthorized');
    return null; 
  }

  return <>{children}</>;
};

export default RoleGuard;
