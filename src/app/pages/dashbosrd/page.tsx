import React from 'react';
import RoleGuard from '../../Components/RoleGaurd';

const AdminPage: React.FC = () => {
  return (
    <RoleGuard role="admin">
      <h1>Admin Page</h1>
      <p>Only accessible by users with the 'admin' role.</p>
    </RoleGuard>
  );
};

export default AdminPage;
