'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaUpload, FaBook, FaUserCircle, FaSignOutAlt, FaChartBar, FaFile, FaDownload, FaTimes } from 'react-icons/fa';
import { Charts } from '@/app/Components/chart';
import UserProfile from '@/app/Components/userProfile';
import { Link } from 'lucide-react';

interface Attachment {
  _id: string;
  url: string;
  publicId: string;
  fileName: string;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price?: number;
  attachments?: Attachment[];
  createdAt: string;
  createdBy: string;
  imageUrl?: string;
  imagePublicId?: string;
}

interface Student {
  _id: string;
  enrolledAt: string;
  progress?: Array<{
    courseId: string;
    completed: boolean;
  }>;
}

const InstructorDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: 0,
    instructor: 'Instructor Name',
  });
  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [courseImagePreview, setCourseImagePreview] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<'courses' | 'analytics' | 'profile'>('courses');
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const API_URL = 'http://localhost:5000'; // Replace with your backend URL

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}/courses`);
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch courses.');
      console.error('Error fetching courses:', err);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_URL}/students`);
      setStudents(response.data);
    } catch (err) {
      setError('Failed to fetch student data.');
      console.error('Error fetching students:', err);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchCourses(), fetchStudents()]);
      } catch (err) {
        setError('Failed to initialize data');
        console.error('Error initializing data:', err);
      } finally {
        setLoading(false);
      }
    };
    initializeData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? parseFloat(value) : value });
  };

  const handleCourseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCourseImage(file);
      
      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setCourseImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles]);
      setFileNames(prevNames => [...prevNames, ...newFiles.map(file => file.name)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    setFileNames(prevNames => prevNames.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      level: 'beginner',
      price: 0,
      instructor: 'Instructor Name',
    });
    setCourseImage(null);
    setCourseImagePreview(null);
    setFiles([]);
    setFileNames([]);
    setEditingCourse(null);
    setShowForm(false);
    setUploadProgress(0);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: course.price ?? 0,
      instructor: course.createdBy,
    });
    if (course.imageUrl) {
      setCourseImagePreview(course.imageUrl);
    } else {
      setCourseImagePreview(null);
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setUploadProgress(0);
    
    try {
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formDataToSend.append(key, value.toString());
        }
      });
      
      // Add course image if exists
      if (courseImage) {
        formDataToSend.append('courseImage', courseImage);
      }
      
      // Add all attachment files
      files.forEach(file => {
        formDataToSend.append('attachments', file);
      });
      
      const config = {
        onUploadProgress: (progressEvent: any) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      };
      
      let response;
      if (editingCourse) {
        response = await axios.put(
          `${API_URL}/courses/${editingCourse._id}`,
          formDataToSend,
          config
        );
      } else {
        response = await axios.post(
          `${API_URL}/courses/create-course`,
          formDataToSend,
          config
        );
      }
      
      setCourses(prevCourses => 
        editingCourse
          ? prevCourses.map(course => course._id === editingCourse._id ? response.data : course)
          : [...prevCourses, response.data]
      );
      
      resetForm();
      
    } catch (err: any) {
      console.error('Error submitting course:', err);
      setError(`Failed to ${editingCourse ? 'update' : 'create'} course: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course? All associated files will also be removed from storage.')) {
      setLoading(true);
      try {
        await axios.delete(`${API_URL}/courses/${id}`);
        setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
      } catch (err: any) {
        console.error('Error deleting course:', err);
        setError(`Failed to delete course: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteAttachment = async (courseId: string, attachmentId: string) => {
    if (window.confirm('Are you sure you want to delete this attachment?')) {
      setLoading(true);
      try {
        const response = await axios.delete(`${API_URL}/courses/${courseId}/attachments/${attachmentId}`);
        setCourses(prevCourses => 
          prevCourses.map(course => 
            course._id === courseId ? response.data : course
          )
        );
      } catch (err: any) {
        console.error('Error deleting attachment:', err);
        setError(`Failed to delete attachment: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <nav className="mt-4 space-y-2">
          <Link
                href="/"
              >
                Home
         </Link>  
            <button 
              onClick={() => setCurrentPage('courses')} 
              className={`w-full flex items-center px-4 py-2 rounded ${
                currentPage === 'courses' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaBook className="mr-3" />
              Your Courses
            </button>
            <button 
              onClick={() => setCurrentPage('analytics')} 
              className={`w-full flex items-center px-4 py-2 rounded ${
                currentPage === 'analytics' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaChartBar className="mr-3" />
              Analytics
            </button>
            <button 
              onClick={() => setCurrentPage('profile')} 
              className={`w-full flex items-center px-4 py-2 rounded ${
                currentPage === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FaUserCircle className="mr-3" />
              Profile
            </button>
          </nav>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-100 border-t">
          <div className="flex items-center">
            <FaUserCircle className="text-2xl text-gray-600 mr-2" />
            <span className="text-gray-800">Instructor Dashboard</span>
          </div>
          <button onClick={() => console.log('Logout')} className="text-red-600 hover:bg-red-50 p-2 rounded-full">
            <FaSignOutAlt />
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        {currentPage === 'courses' && (
          <>
            <button 
              onClick={() => setShowForm(true)} 
              className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center mb-6 hover:bg-indigo-700"
            >
              <FaPlus className="mr-2" /> Create Course
            </button>

            {showForm && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-semibold mb-4">{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">Course Title</label>
                      <input 
                        type="text" 
                        name="title" 
                        value={formData.title} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Category</label>
                      <input 
                        type="text" 
                        name="category" 
                        value={formData.category} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Level</label>
                      <select 
                        name="level" 
                        value={formData.level} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 rounded px-3 py-2"
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">Price ($)</label>
                      <input 
                        type="number" 
                        name="price" 
                        value={formData.price} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        min="0" 
                        step="0.01" 
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Description</label>
                      <textarea 
                        name="description" 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        className="w-full border border-gray-300 rounded px-3 py-2" 
                        rows={4} 
                        required
                      ></textarea>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Course Image</label>
                      <div className="flex items-center space-x-4">
                        <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FaUpload className="text-gray-400 mb-2" size={24} />
                            <p className="text-xs text-gray-500">Upload Image</p>
                          </div>
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleCourseImageChange} 
                          />
                        </label>
                        
                        {courseImagePreview && (
                          <div className="relative h-32 w-32">
                            <img 
                              src={courseImagePreview} 
                              alt="Course preview" 
                              className="h-32 w-32 object-cover rounded-lg border border-gray-300" 
                            />
                            <button 
                              type="button" 
                              onClick={() => {
                                setCourseImage(null);
                                setCourseImagePreview(null);
                              }} 
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <FaTimes size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 mb-2">Course Materials</label>
                      <div className="border border-dashed border-gray-300 rounded-lg p-4">
                        <label className="flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 py-2">
                          <FaUpload className="mx-auto text-gray-400 mb-2" size={24} />
                          <span className="text-gray-500">{files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload files (max 10)'}</span>
                          <input 
                            type="file" 
                            onChange={handleFileChange} 
                            className="hidden" 
                            multiple 
                          />
                        </label>
                        
                        {/* File List */}
                        {fileNames.length > 0 && (
                          <div className="mt-4 space-y-2">
                            <h4 className="text-sm font-semibold text-gray-700">Selected Files:</h4>
                            <ul className="text-sm">
                              {fileNames.map((name, index) => (
                                <li key={index} className="flex justify-between items-center py-1 border-b">
                                  <span className="text-gray-600 flex items-center">
                                    <FaFile className="text-indigo-500 mr-2" /> {name}
                                  </span>
                                  <button 
                                    type="button" 
                                    onClick={() => removeFile(index)} 
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <FaTimes />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Display Current Attachments when Editing */}
                    {editingCourse && editingCourse.attachments && editingCourse.attachments.length > 0 && (
                      <div className="md:col-span-2">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Current Files:</h4>
                        <ul className="text-sm border rounded-lg divide-y">
                          {editingCourse.attachments.map((attachment) => (
                            <li key={attachment._id} className="flex justify-between items-center py-2 px-4 hover:bg-gray-100">
                              <span className="text-gray-600 flex items-center">
                                <FaFile className="text-indigo-500 mr-2" /> {attachment.fileName}
                              </span>
                              <button 
                                type="button" 
                                onClick={() => handleDeleteAttachment(editingCourse._id, attachment._id)} 
                                className="text-red-500 hover:text-red-700"
                              >
                                <FaTrash />
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <button 
                      type="button" 
                      onClick={resetForm} 
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-3 hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                    >
                      {editingCourse ? 'Update Course' : 'Create Course'}
                    </button>
                  </div>
                </form>

                {uploadProgress > 0 && (
                  <div className="mt-4">
                    <div className="bg-gray-200 h-2 rounded-full">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${uploadProgress}%` }} 
                      />
                    </div>
                    <span className="text-sm text-gray-600">{uploadProgress}% uploading...</span>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <img src={course.imageUrl || '/default-course-image.jpg'} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{course.title}</h3>
                    <p className="text-gray-600">{course.description}</p>
                    <div className="mt-4 flex justify-between">
                      <button 
                        onClick={() => handleEdit(course)} 
                        className="text-indigo-600 hover:text-indigo-800"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDelete(course._id)} 
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {currentPage === 'analytics' && (
          <Charts courses={courses} students={students} />
        )}

        {currentPage === 'profile' && (
          <UserProfile />
        )}
      </main>
    </div>
  );
};

export default InstructorDashboard;