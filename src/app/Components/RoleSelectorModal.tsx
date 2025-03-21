import React from 'react';
import { GraduationCap, Users, Shield, X, Loader2 } from 'lucide-react';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: string) => void;
  isLoading: boolean;
}

const RoleSelectionModal = ({
  isOpen,
  onClose,
  onSelectRole,
  isLoading,
}: RoleSelectionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose} 
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-center mb-6">Select Your Role</h2>
        <p className="text-gray-600 text-center mb-8">
          Please select the role that best fits your use of the platform.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => onSelectRole('student')}
            disabled={isLoading}
            className="flex items-center w-full p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <div className="bg-blue-100 p-3 rounded-full">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-medium">Student</h3>
              <p className="text-sm text-gray-500">Access courses and track your learning progress</p>
            </div>
          </button>
          
          <button
            onClick={() => onSelectRole('instructor')}
            disabled={isLoading}
            className="flex items-center w-full p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-200 transition-colors"
          >
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-medium">Instructor</h3>
              <p className="text-sm text-gray-500">Create and manage courses, interact with students</p>
            </div>
          </button>
          
          <button
            onClick={() => onSelectRole('admin')}
            disabled={isLoading}
            className="flex items-center w-full p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
          >
            <div className="bg-green-100 p-3 rounded-full">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-medium">Admin</h3>
              <p className="text-sm text-gray-500">Manage platform settings, users, and content</p>
            </div>
          </button>
        </div>
        
        {isLoading && (
          <div className="mt-6 flex justify-center">
            <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
            <span className="ml-2 text-gray-600">Processing...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelectionModal;