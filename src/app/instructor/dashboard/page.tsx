'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPlus, FaUpload, FaBook, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price?: number;
  attachments?: string[];
  createdAt: string;
  createdBy: string; // Field for the creator's name
  imageUrl?: string; // Field for the associated image URL
}

const InstructorDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [studentsCount, setStudentsCount] = useState<number>(0);
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
    instructor: 'Instructor Name', // Set instructor to the current user's name
    imageUrl: '' // Field for the course image URL
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [currentPage, setCurrentPage] = useState<'courses' | 'analytics'>('courses');

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/courses');
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch courses.');
    } finally {
      setLoading(false);
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/students');
      setStudentsCount(response.data.length);
    } catch (err) {
      setError('Failed to fetch student data.');
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchStudentData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'price' ? parseFloat(value) : value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', category: '', level: 'beginner', price: 0, instructor: 'Instructor Name', imageUrl: '' });
    setFiles(null);
    setEditingCourse(null);
    setShowForm(false);
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      category: course.category,
      level: course.level,
      price: course.price ?? 0,
      instructor: course.createdBy, // Set to the course creator's name
      imageUrl: course.imageUrl ?? '', // Set image URL if available
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const formDataToSend = new FormData();
    
    // Ensure each value exists before appending it to FormData
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formDataToSend.append(key, value.toString());
      }
    });

    if (files) Array.from(files).forEach(file => formDataToSend.append('attachments', file));

    try {
      const response = editingCourse
        ? await axios.put(`http://localhost:5000/courses/${editingCourse._id}`, formDataToSend)
        : await axios.post('http://localhost:5000/courses/create-course', formDataToSend);

      setCourses(prevCourses => editingCourse
        ? prevCourses.map(course => course._id === editingCourse._id ? response.data : course)
        : [...prevCourses, response.data]
      );
      resetForm();
    } catch (err) {
      setError(`Failed to ${editingCourse ? 'update' : 'create'} course.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setLoading(true);
      try {
        await axios.delete(`http://localhost:5000/courses/${id}`);
        setCourses(prevCourses => prevCourses.filter(course => course._id !== id));
      } catch (err) {
        setError('Failed to delete course.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <nav className="mt-4">
            <button onClick={() => setCurrentPage('courses')} className={`w-full text-left px-4 py-2 ${currentPage === 'courses' ? 'bg-indigo-100' : ''}`}>
              Your Courses
            </button>
            <button onClick={() => setCurrentPage('analytics')} className={`w-full text-left px-4 py-2 ${currentPage === 'analytics' ? 'bg-indigo-100' : ''}`}>
              Analytics
            </button>
          </nav>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-100 border-t">
          <div className="flex items-center">
            <FaUserCircle className="text-2xl text-gray-600 mr-2" />
            <span className="text-gray-800">Instructor Name</span>
          </div>
          <button onClick={handleLogout} className="text-red-600 hover:bg-red-50 p-2 rounded-full">
            <FaSignOutAlt />
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}
        
        <button onClick={() => setShowForm(true)} className="bg-indigo-600 text-white px-4 py-2 rounded flex items-center mb-6 hover:bg-indigo-700 transition-colors">
          <FaPlus className="mr-2" /> Create Course
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">Course Title</label>
                  <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Category</label>
                  <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" required />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Level</label>
                  <select name="level" value={formData.level} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Price ($)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" min="0" step="0.01" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded px-3 py-2" rows={4} required></textarea>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Course Image</label>
                  <input type="file" name="imageUrl" onChange={handleFileChange} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2">Course Materials</label>
                  <div className="flex items-center">
                    <label className="w-full border border-dashed border-gray-300 rounded px-3 py-4 text-center cursor-pointer hover:bg-gray-50">
                      <FaUpload className="mx-auto text-gray-400 mb-2" size={24} />
                      <span className="text-gray-500">{files && files.length > 0 ? `${files.length} file(s) selected` : 'Click to upload files (max 10)'}</span>
                      <input type="file" onChange={handleFileChange} className="hidden" multiple />
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button type="button" onClick={resetForm} className="px-4 py-2 text-gray-700 mr-2">Cancel</button>
                <button type="submit" className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700" disabled={loading}>
                  {loading ? 'Processing...' : editingCourse ? 'Update Course' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        )}

        {currentPage === 'courses' && (
          <div>
            <h2 className="text-2xl font-semibold mb-6"><FaBook className="mr-2" /> Your Courses</h2>
            {loading ? <div className="text-center py-10"><div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div><p className="mt-2 text-gray-600">Loading courses...</p></div> : (
              courses.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-10 text-center">
                  <p className="text-gray-500 mb-4">You haven't created any courses yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map(course => (
                    <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                      {course.imageUrl && (
                        <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" />
                      )}
                      <div className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
                          <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded capitalize">{course.level}</span>
                        </div>
                        <p className="text-gray-500 mb-2 capitalize">{course.category}</p>
                        <p className="text-gray-600 mb-2">{course.description}</p>
                        {course.price !== undefined && <p className="text-lg font-bold text-gray-800 mb-4">${course.price.toFixed(2)}</p>}
                        <p className="text-sm text-gray-500 mb-4">Created by: {course.createdBy}</p>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <span className="text-xs text-gray-500">Created: {new Date(course.createdAt).toLocaleDateString()}</span>
                          <div className="flex space-x-2">
                            <button onClick={() => handleEdit(course)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full" title="Edit course"><FaEdit /></button>
                            <button onClick={() => handleDelete(course._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-full" title="Delete course"><FaTrash /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        )}

        {currentPage === 'analytics' && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-6">Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4"><FaBook className="mr-2" /> Total Courses Created</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[{ name: 'Courses', value: courses.length }]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#4f46e5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4"><FaUserCircle className="mr-2" /> Total Students</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={[{ name: 'Students', value: studentsCount }]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default InstructorDashboard;