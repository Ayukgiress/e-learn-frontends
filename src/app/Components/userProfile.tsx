"use client";

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'sonner';
import { API_BASE_URL } from '../constant/route';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  phone: string;
  address: string;
  profilePicture: string;
  specialization?: string; 
  department?: string;     
  studentId?: string;      
  enrollmentYear?: string; 
  adminRole?: string;      
};

const UserProfile = () => {
  const { user, isAdmin, isInstructor, isStudent } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    phone: '',
    address: '',
    profilePicture: '',
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) return;
      
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/users/${user.id}/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
        const profileData = await response.json();
        
        setFormData({
          firstName: profileData.firstName || user.firstName || '',
          lastName: profileData.lastName || user.lastName || '',
          email: profileData.email || user.email || '',
          bio: profileData.bio || '',
          phone: profileData.phone || '',
          address: profileData.address || '',
          profilePicture: profileData.profilePicture || '',
          ...(isInstructor && {
            specialization: profileData.specialization || '',
            department: profileData.department || '',
          }),
          ...(isStudent && {
            studentId: profileData.studentId || '',
            enrollmentYear: profileData.enrollmentYear || '',
          }),
          ...(isAdmin && {
            adminRole: profileData.adminRole || '',
            department: profileData.department || '',
          }),
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile data');
        setFormData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          bio: '',
          phone: '',
          address: '',
          profilePicture: '',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [user, isAdmin, isInstructor, isStudent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/users/${user.id}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

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
            {isAdmin ? 'Admin Profile' : isInstructor ? 'Instructor Profile' : 'Student Profile'}
          </h1>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Picture */}
                <div className="flex-shrink-0 flex flex-col items-center">
                  <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden mb-4">
                    {formData.profilePicture ? (
                      <img 
                        src={formData.profilePicture} 
                        alt="Profile" 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                  {isEditing && (
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
                      <input
                        type="text"
                        name="profilePicture"
                        value={formData.profilePicture}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    </div>
                  )}
                  <div className="mt-4 text-center">
                    <div className="text-lg font-bold">{user.firstName} {user.lastName}</div>
                    <div className="text-sm text-gray-500 capitalize">{user.role}</div>
                  </div>
                </div>

                {/* Profile Information */}
                <div className="flex-grow space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          required
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{formData.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          required
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{formData.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          required
                        />
                      ) : (
                        <p className="mt-1 text-gray-900">{formData.email}</p>
                      )}
                    </div>
                  
                  </div>

                  

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{formData.bio || "No bio provided"}</p>
                    )}
                  </div>

                  {/* Role specific fields */}
                  {isInstructor && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="department"
                            value={formData.department || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{formData.department || "Not specified"}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Specialization</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="specialization"
                            value={formData.specialization || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{formData.specialization || "Not specified"}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {isStudent && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Student ID</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="studentId"
                            value={formData.studentId || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{formData.studentId || "Not specified"}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Enrollment Year</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="enrollmentYear"
                            value={formData.enrollmentYear || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{formData.enrollmentYear || "Not specified"}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {isAdmin && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="department"
                            value={formData.department || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{formData.department || "Not specified"}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Admin Role</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="adminRole"
                            value={formData.adminRole || ''}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                          />
                        ) : (
                          <p className="mt-1 text-gray-900">{formData.adminRole || "Not specified"}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                {isEditing ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="mr-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;