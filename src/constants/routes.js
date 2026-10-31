export const ROUTES = {
  HOME: '/',
  COLLEGES: '/colleges',
  COLLEGE_DETAILS: '/colleges/:id',
  COURSE_DETAILS: '/courses/:id',
  SCHOLARSHIPS: '/scholarships',
  PLACEMENTS: '/placements',
  RANKINGS: '/rankings',
  REVIEWS: '/reviews',
  RECOMMENDATIONS: '/recommendations',
  SAVED_COLLEGES: '/saved-colleges',
  COMPARE: '/compare',
  
  // Dashboards
  STUDENT_DASHBOARD: '/dashboard/student',
  ADMIN_DASHBOARD: '/dashboard/admin',
  INSTITUTE_DASHBOARD: '/dashboard/institute',
  ADMIN_STUDENTS: '/dashboard/students',
  ADMIN_REVIEWS: '/dashboard/reviews',
  ADMIN_SCHOLARSHIPS: '/dashboard/scholarships',
  ADMIN_PLACEMENTS: '/dashboard/placements',
  ADMIN_NOTIFICATIONS: '/dashboard/notifications',
  ADMIN_PREDICTOR: '/dashboard/predictor',
  
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  
  // User profile & settings
  PROFILE: '/profile',
  SETTINGS: '/settings',
  NOTIFICATIONS: '/notifications',
  
  // Error pages
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
  
  // Fallback
  NOT_FOUND: '*',
};

export const NAV_LINKS = [
  { name: 'Colleges', path: ROUTES.COLLEGES },
  { name: 'AI Predictor', path: ROUTES.RECOMMENDATIONS },
  { name: 'Rankings', path: ROUTES.RANKINGS },
  { name: 'Placements', path: ROUTES.PLACEMENTS },
  { name: 'Scholarships', path: ROUTES.SCHOLARSHIPS },
  { name: 'Reviews', path: ROUTES.REVIEWS },
  { name: 'Compare', path: ROUTES.COMPARE },
];
