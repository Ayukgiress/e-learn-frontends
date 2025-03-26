import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';

interface LogoutButtonProps {
  className?: string;
  textClassName?: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ 
  className = '', 
  textClassName = ''
}) => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    try {
      logout();
      toast.success('Logged out successfully');
      window.location.href = '/login';
    } catch (error) {
      toast.error('Failed to logout');
      console.error('Logout error:', error);
    }
  };

  return (
    <button 
      onClick={handleLogout} 
      className={`
        flex items-center justify-center 
        px-4 py-2 
        bg-red-500 hover:bg-red-600 
        text-white 
        rounded-md 
        transition-colors duration-300 
        focus:outline-none focus:ring-2 focus:ring-red-400 
        ${className}
      `}
    >
      <LogOut className="h-5 w-full mr-10 float-start" />
      <span className={`text-sm font-medium ${textClassName}`}>
        Logout
      </span>
    </button>
  );
};

export default LogoutButton;