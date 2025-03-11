export const PROTECTED_ROUTES = {
  MANAGEMENT: '/admin/dashboard',
  STUDENT: '/student/dashboard',
  INSTRUCTOR: '/instructor/dashboard'  // Make sure this path is correct
};

  export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';