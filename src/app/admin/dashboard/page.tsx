"use client";


import React from 'react'
import RoleGuard from '../../Components/RoleGaurd'


 function dashboard() {
  return (
    <RoleGuard role="admin">
    <div>
      <h1>Admin Dashboard</h1>
    </div>
    </RoleGuard>
  )
}

export default dashboard
