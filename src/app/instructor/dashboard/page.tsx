"use client"

import React from 'react'
import RoleGuard from '../../Components/RoleGaurd'

function dashboard  ()  {
  return (
    <RoleGuard role="instructor">

    <div>
      <h1>Instructors Dashboard</h1>
    </div>
    </RoleGuard>
  )
}

export default dashboard
