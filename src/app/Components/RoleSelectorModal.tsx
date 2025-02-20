import React from 'react';
import { PROTECTED_ROUTES } from '../constant/route';

const RoleSelectionModal = ({ 
  isOpen, 
  onClose, 
  onSelectRole, 
  isLoading 
}: { 
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: string) => void;
  isLoading: boolean;
}) => {
  if (!isOpen) return null;

  const roles = [
    { id: 'student', label: 'Student', route: PROTECTED_ROUTES.STUDENT },
    { id: 'instructor', label: 'Instructor', route: PROTECTED_ROUTES.INSTRUCTOR },
    { id: 'admin', label: 'Administrator', route: PROTECTED_ROUTES.MANAGEMENT }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Select Your Role</h2>
        <p className="text-gray-600 mb-6 text-center">
          Please select your role to continue
        </p>
        
        <div className="space-y-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => onSelectRole(role.id)}
              disabled={isLoading}
              className="w-full py-3 px-4 border border-gray-200 rounded-lg 
                       hover:bg-blue-50 hover:border-blue-500 
                       transition-all duration-200 flex items-center justify-center
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="text-lg font-medium">{role.label}</span>
            </button>
          ))}
        </div>
        
        <button
          onClick={onClose}
          disabled={isLoading}
          className="mt-6 w-full py-2 text-gray-600 hover:text-gray-800 
                     transition-colors duration-200 text-sm font-medium"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RoleSelectionModal;
