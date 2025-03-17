"use client";

import React, { useState } from 'react';
import RoleGuard from '../../Components/RoleGaurd';
import UserProfile from '@/app/Components/userProfile';

function Dashboard() {
  const [showProfile, setShowProfile] = useState(false);
  
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  return (
    <RoleGuard role="student">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Student Dashboard</h1>
          <button
            onClick={toggleProfile}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {showProfile ? 'Hide Profile' : 'Profile'}
          </button>
        </div>

        {showProfile ? (
          <UserProfile />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Welcome to your Dashboard</h2>
            <p className="text-gray-600">
              Here you can view your courses, assignments, and other important information.
              Click the "View Profile" button to see and edit your profile details.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800">My Courses</h3>
                <p className="text-gray-500 text-sm mt-1">View your enrolled courses</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800">Assignments</h3>
                <p className="text-gray-500 text-sm mt-1">Check your pending assignments</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800">Grades</h3>
                <p className="text-gray-500 text-sm mt-1">View your academic performance</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </RoleGuard>
  );
}

export default Dashboard;