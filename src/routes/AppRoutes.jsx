import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from '../constants/routes';

// Lazy loading all pages
const HomePage = lazy(() => import('../pages/HomePage').then((m) => ({ default: m.HomePage })));
const CollegesPage = lazy(() => import('../pages/CollegesPage').then((m) => ({ default: m.CollegesPage })));
const CollegeDetailsPage = lazy(() => import('../pages/CollegeDetailsPage').then((m) => ({ default: m.CollegeDetailsPage })));
const CourseDetailsPage = lazy(() => import('../pages/CourseDetailsPage').then((m) => ({ default: m.CourseDetailsPage })));
const ScholarshipsPage = lazy(() => import('../pages/ScholarshipsPage').then((m) => ({ default: m.ScholarshipsPage })));
const PlacementsPage = lazy(() => import('../pages/PlacementsPage').then((m) => ({ default: m.PlacementsPage })));
const RankingsPage = lazy(() => import('../pages/RankingsPage').then((m) => ({ default: m.RankingsPage })));
const ReviewsPage = lazy(() => import('../pages/ReviewsPage').then((m) => ({ default: m.ReviewsPage })));
const RecommendationsPage = lazy(() => import('../pages/RecommendationsPage').then((m) => ({ default: m.RecommendationsPage })));
const SavedCollegesPage = lazy(() => import('../pages/SavedCollegesPage').then((m) => ({ default: m.SavedCollegesPage })));
const CompareCollegesPage = lazy(() => import('../pages/CompareCollegesPage').then((m) => ({ default: m.CompareCollegesPage })));
const StudentDashboardPage = lazy(() => import('../pages/StudentDashboardPage').then((m) => ({ default: m.StudentDashboardPage })));
const AdminDashboardPage = lazy(() => import('../pages/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage })));
const ManageStudentsPage = lazy(() => import('../pages/ManageStudentsPage').then((m) => ({ default: m.ManageStudentsPage })));
const AdminReviewsPage = lazy(() => import('../pages/AdminReviewsPage').then((m) => ({ default: m.AdminReviewsPage })));
const AdminScholarshipsPage = lazy(() => import('../pages/AdminScholarshipsPage').then((m) => ({ default: m.AdminScholarshipsPage })));
const AdminPlacementsPage = lazy(() => import('../pages/AdminPlacementsPage').then((m) => ({ default: m.AdminPlacementsPage })));
const AdminNotificationsPage = lazy(() => import('../pages/AdminNotificationsPage').then((m) => ({ default: m.AdminNotificationsPage })));
const InstituteDashboardPage = lazy(() => import('../pages/InstituteDashboardPage').then((m) => ({ default: m.InstituteDashboardPage })));
const LoginPage = lazy(() => import('../pages/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazy(() => import('../pages/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const ProfilePage = lazy(() => import('../pages/ProfilePage').then((m) => ({ default: m.ProfilePage })));
const SettingsPage = lazy(() => import('../pages/SettingsPage').then((m) => ({ default: m.SettingsPage })));
const NotificationsPage = lazy(() => import('../pages/NotificationsPage').then((m) => ({ default: m.NotificationsPage })));

// Error Pages
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));
const ForbiddenPage = lazy(() => import('../pages/ForbiddenPage').then((m) => ({ default: m.ForbiddenPage })));
const ServerErrorPage = lazy(() => import('../pages/ServerErrorPage').then((m) => ({ default: m.ServerErrorPage })));

const PageFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
    <div className="animate-spin w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full" />
    <p className="text-xs font-semibold text-gray-500">Loading view...</p>
  </div>
);

export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        {/* Main Application Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.COLLEGES} element={<CollegesPage />} />
          <Route path={ROUTES.COLLEGE_DETAILS} element={<CollegeDetailsPage />} />
          <Route path={ROUTES.COURSE_DETAILS} element={<CourseDetailsPage />} />
          <Route path={ROUTES.SCHOLARSHIPS} element={<ScholarshipsPage />} />
          <Route path={ROUTES.PLACEMENTS} element={<PlacementsPage />} />
          <Route path={ROUTES.RANKINGS} element={<RankingsPage />} />
          <Route path={ROUTES.REVIEWS} element={<ReviewsPage />} />
          <Route path={ROUTES.RECOMMENDATIONS} element={<RecommendationsPage />} />
          <Route path={ROUTES.COMPARE} element={<CompareCollegesPage />} />
          <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />
          <Route path={ROUTES.SERVER_ERROR} element={<ServerErrorPage />} />
        </Route>

        {/* Dashboard Routes (Protected) */}
        <Route element={<DashboardLayout />}>
          <Route
            path={ROUTES.STUDENT_DASHBOARD}
            element={
              <ProtectedRoute>
                <StudentDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.INSTITUTE_DASHBOARD}
            element={
              <ProtectedRoute allowedRoles={['institute']}>
                <InstituteDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/students"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageStudentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/reviews"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminReviewsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/scholarships"
            element={
              <ProtectedRoute allowedRoles={['admin', 'institute']}>
                <AdminScholarshipsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/placements"
            element={
              <ProtectedRoute allowedRoles={['admin', 'institute']}>
                <AdminPlacementsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/notifications"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminNotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ADMIN_PREDICTOR}
            element={
              <ProtectedRoute>
                <RecommendationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SAVED_COLLEGES}
            element={
              <ProtectedRoute>
                <SavedCollegesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path={ROUTES.NOTIFICATIONS}
            element={
              <ProtectedRoute>
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.SETTINGS}
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};
