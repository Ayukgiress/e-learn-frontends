export const PROTECTED_ROUTES = {
    STUDENT: '/student/dashboard',
    INSTRUCTOR: '/instructor/dashboard',
    MANAGEMENT: '/admin/dashboard', 
  };

  export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';