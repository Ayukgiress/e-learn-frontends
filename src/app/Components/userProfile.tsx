"use client";

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'sonner';
import { API_BASE_URL } from '../constant/route';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
};

const UserProfile = () => {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const profileData = await response.json();
        
        setFormData({
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          email: profileData.email,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Not logged in</h1>
          <p className="mt-2 text-gray-600">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4">
          <h1 className="text-2xl font-bold text-white">
            {user.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile` : 'User Profile'}
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Picture Section */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-200 mb-4 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="mt-4 text-center">
                  <div className="text-lg font-bold">{user.firstName} {user.lastName}</div>
                  <div className="text-sm text-gray-500 capitalize">{user.role}</div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="flex-grow space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <p className="mt-1 text-gray-900">{formData.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <p className="mt-1 text-gray-900">{formData.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-gray-900">{formData.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                    <p className="mt-1 text-gray-900">{user.userId}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center border-t pt-4">
              <p className="text-sm text-gray-500">
                Profile editing is currently unavailable. Please check back later.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;