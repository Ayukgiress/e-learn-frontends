"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { toast } from 'sonner';
import { API_BASE_URL } from '../constant/route';
import Image from 'next/image';

type ProfileFormData = {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: File | null;
  profilePictureUrl?: string;
};

const UserProfile = () => {
  const { user, updateUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    profilePicture: null,
    profilePictureUrl: '',
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

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
          firstName: profileData.firstName || user.firstName,
          lastName: profileData.lastName || user.lastName,
          email: profileData.email || user.email,
          profilePictureUrl: profileData.profilePicture || user.profilePicture || '',
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validTypes.includes(file.type)) {
        toast.error('Only JPG, PNG, and GIF images are allowed');
        return;
      }

      if (file.size > maxSize) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Create FormData for profile picture upload
      const formDataToSend = new FormData();
      formDataToSend.append('profilePicture', file);

      try {
        setIsLoading(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE_URL}/auth/update-profile-picture`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formDataToSend
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to upload profile picture');
        }

        const updatedProfile = await response.json();
        
        // Update local state and global auth store
        setFormData(prev => ({
          ...prev,
          profilePictureUrl: updatedProfile.profilePicture
        }));
        
        updateUser({
          ...user,
          profilePicture: updatedProfile.profilePicture
        });

        // Create preview for immediate feedback
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        toast.success('Profile picture updated successfully');
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to upload profile picture');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formDataToSend = new FormData();
      
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);

      const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedProfile = await response.json();
      
      // Update local state and global auth store
      updateUser({
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        email: updatedProfile.email,
        profilePicture: updatedProfile.profilePicture || user?.profilePicture
      });

      toast.success('Profile updated successfully');
      setIsEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    // Reset form to original data
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      profilePictureUrl: user?.profilePicture || '',
      profilePicture: null
    });
    setIsEditMode(false);
    setPreviewImage(null);
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
    <div className="w-full px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            {user.role ? `${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile` : 'User Profile'}
          </h1>
          {!isEditMode && (
            <button 
              onClick={() => setIsEditMode(true)}
              className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 w-full">
            <div className="flex flex-col md:flex-row gap-6 w-full">
              {/* Profile Picture Section */}
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full mb-4 overflow-hidden relative">
                  {isEditMode && (
                    <>
                      <input 
                        type="file" 
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleImageUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        id="profilePicture"
                        disabled={isLoading}
                      />
                      <label 
                        htmlFor="profilePicture" 
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white z-10"
                      >
                        Click to Upload
                      </label>
                    </>
                  )}

                  {previewImage || formData.profilePictureUrl ? (
                    <Image 
                      src={previewImage || formData.profilePictureUrl || '/default-avatar.png'}
                      alt="Profile" 
                      layout="fill" 
                      objectFit="cover"
                      className="w-full h-full"
                    />
                  ) : (
                    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  )}
                </div>
                <div className="mt-4 text-center">
                  <div className="text-lg font-bold">{user.firstName} {user.lastName}</div>
                  <div className="text-sm text-gray-500 capitalize">{user.role}</div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="flex-grow space-y-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    {isEditMode ? (
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{formData.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    {isEditMode ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{formData.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    {isEditMode ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{formData.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">User ID</label>
                    <p className="mt-1 text-gray-900">{user.userId}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Button Section */}
            {isEditMode && (
              <div className="flex justify-end space-x-4 mt-6 border-t pt-4">
                <button 
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

export default UserProfile;