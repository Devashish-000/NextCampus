export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  UPDATE_PROFILE: '/user/profile',

  // Colleges
  GET_COLLEGES: '/colleges',
  GET_COLLEGE_BY_ID: (id) => `/colleges/${id}`,
  GET_FEATURED_COLLEGES: '/colleges/featured',

  // Courses
  GET_COURSES: '/courses',
  GET_COURSE_BY_ID: (id) => `/courses/${id}`,

  // Recommendations & AI
  PREDICT_COLLEGES: '/recommendations/predict',

  // Reviews
  GET_REVIEWS: '/reviews',
  POST_REVIEW: '/reviews',

  // Scholarships & Placements & Rankings
  GET_SCHOLARSHIPS: '/scholarships',
  GET_PLACEMENTS: '/placements',
  GET_RANKINGS: '/rankings',

  // Dashboard & Admin
  GET_STUDENT_STATS: '/dashboard/student/stats',
  GET_ADMIN_STATS: '/dashboard/admin/stats',
};
