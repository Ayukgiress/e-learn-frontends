
import React from 'react';
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
    <div>
      <div>
        <button onClick={() => onSelectRole('student')} disabled={isLoading}>Select Student</button>
        <button onClick={() => onSelectRole('instructor')} disabled={isLoading}>Select Instructor</button>
        <button onClick={() => onSelectRole('admin')} disabled={isLoading}>Select Admin</button>
      </div>
      <button onClick={onClose} disabled={isLoading}>Close</button>
    </div>
  );
};

export default RoleSelectionModal;
