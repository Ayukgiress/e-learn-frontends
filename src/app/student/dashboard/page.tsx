"use client";

import React, { useState } from 'react';
import RoleGuard from '../../Components/RoleGaurd';
import UserProfile from '@/app/Components/userProfile';
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  TrendingUp, 
  Users, 
  Search 
} from 'lucide-react';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  color: string;
}

interface QuickStats {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Web Development Masterclass',
    instructor: 'John Smith',
    progress: 65,
    color: 'bg-blue-500'
  },
  {
    id: '2',
    title: 'Advanced Python Programming',
    instructor: 'Emily Johnson',
    progress: 45,
    color: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    instructor: 'Michael Chen',
    progress: 80,
    color: 'bg-purple-500'
  }
];

const quickStats: QuickStats[] = [
  {
    title: 'Total Courses',
    value: '12',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Completed Courses',
    value: '6',
    icon: TrendingUp,
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Pending Assignments',
    value: '4',
    icon: ClipboardList,
    color: 'bg-yellow-100 text-yellow-600'
  }
];

function Dashboard() {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'courses' | 'assignments' | 'grades' | 'profile'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const NavItem = ({ 
    icon: Icon, 
    label, 
    section 
  }: { 
    icon: React.ElementType, 
    label: string, 
    section: 'dashboard' | 'courses' | 'assignments' | 'grades' | 'profile' 
  }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`w-full flex items-center p-3 rounded-lg transition-colors ${
        activeSection === section 
          ? 'bg-blue-500 text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5 mr-3" />
      {label}
    </button>
  );

  const renderCourseProgressBar = (progress: number, color: string) => (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div 
        className={`${color} h-2 rounded-full`} 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  const renderContent = () => {
    switch(activeSection) {
      case 'courses':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">My Courses</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800">Computer Science 101</h3>
                <p className="text-gray-500 text-sm">Introduction to Programming</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800">Mathematics 202</h3>
                <p className="text-gray-500 text-sm">Advanced Calculus</p>
              </div>
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Current Assignments</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800">Programming Assignment</h3>
                <p className="text-gray-500 text-sm">Due in 3 days</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800">Math Problem Set</h3>
                <p className="text-gray-500 text-sm">Due in 5 days</p>
              </div>
            </div>
          </div>
        );
      case 'grades':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Academic Progress</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800">Computer Science 101</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500">85%</span>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-gray-800">Mathematics 202</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  <span className="text-sm font-medium text-gray-500">92%</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'profile':
        return <UserProfile />;
      default:
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {quickStats.map((stat) => (
                <div 
                  key={stat.title}
                  className={`${stat.color} p-6 rounded-lg flex items-center justify-between`}
                >
                  <div>
                    <p className="text-sm font-medium">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="w-8 h-8 opacity-70" />
                </div>
              ))}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">My Courses</h2>
                <button className="text-blue-600 hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                {courses.map((course) => (
                  <div 
                    key={course.id} 
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                  >
                    <div>
                      <h3 className="font-semibold">{course.title}</h3>
                      <p className="text-sm text-gray-500">Instructor: {course.instructor}</p>
                      {renderCourseProgressBar(course.progress, course.color)}
                      <p className="text-xs text-gray-500 mt-1">
                        Progress: {course.progress}%
                      </p>
                    </div>
                    <button className="text-blue-600 hover:underline">Continue</button>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <RoleGuard role="student">
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-10">A.D.C Learn</h1>

          <nav className="space-y-2">
            <NavItem icon={LayoutDashboard} label="Dashboard" section="dashboard" />
            <NavItem icon={BookOpen} label="Courses" section="courses" />
            <NavItem icon={ClipboardList} label="Assignments" section="assignments" />
            <NavItem icon={TrendingUp} label="Grades" section="grades" />
            <NavItem icon={Users} label="Profile" section="profile" />
          </nav>
        </div>

        <div className="flex-1 p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="relative flex-grow mr-4">
              <input 
                type="text" 
                placeholder="Search courses, assignments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-3 text-gray-400" />
            </div>
          </header>

          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

export default Dashboard;