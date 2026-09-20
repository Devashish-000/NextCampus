# CollegeSphere - Enterprise EdTech & College Discovery SaaS Platform

A production-ready, feature-complete React + Vite frontend application for College Discovery, NIRF Ranking Comparison, AI Admission Recommendation, and Verified Student Counseling.

Built strictly with **React 18**, **Vite**, **Tailwind CSS**, **Framer Motion**, **React Router DOM v6**, **React Hook Form + Zod**, **Recharts**, **Axios**, and **Context API**.

---

## 🚀 Key Features & Highlights

- **20 Complete Production-Ready Pages**: Fully implemented single-page application flow with routing, protected student/admin routes, lazy loading, and error boundaries.
- **AI Admission Match Predictor**: Enter entrance scores (JEE, NEET, CAT, CUET) and budget to get real-time percentile match probabilities.
- **Side-by-Side Comparison Drawer**: Compare up to 4 colleges dynamically on NIRF ranks, tuition fees, average packages, and accreditations.
- **Interactive Placement & Salary Analytics**: Recharts Area & Donut charts for placement growth and sector hiring shares.
- **Verified Student Review Moderation**: Full review listing, rating breakdown, pros/cons, and review submission wizard.
- **Dark / Light Mode**: Seamless dark and light themes with persistence in `localStorage`.
- **Axios Mock Service Layer**: Clean separation of concerns allowing 1-click swap from mock data to real backend APIs without touching UI components.

---

## 🛠️ Architecture & Folder Structure

Follows standard **Feature-Based Clean Architecture**:

```
src/
├── assets/                  # Logos and static assets
├── components/
│   ├── common/              # Navbar, Footer, Sidebar, Pagination
│   ├── forms/               # Reusable Form controls (Input, Select, Textarea, Checkbox, PasswordInput, FileUpload)
│   ├── layout/              # Header, PageContainer
│   ├── ui/                  # Button, Card, Badge, Modal, SkeletonLoader, EmptyState
│   ├── charts/              # Recharts wrappers (PlacementChart, SectorDistributionChart)
│   └── feedback/            # Toast, ConfirmDialog
├── config/                  # App environment configuration
├── constants/               # Route constants, API endpoints, taxonomy
├── context/                 # AuthContext, ThemeContext, ComparisonContext, SavedCollegesContext
├── features/
│   ├── colleges/            # CollegeCard, CollegeFilters, QuickViewModal
│   ├── reviews/             # ReviewCard, ReviewModal
│   └── recommendations/     # AI Predictor engine
├── layouts/                 # MainLayout, DashboardLayout, AuthLayout
├── mocks/                   # 50 Colleges, 20 Courses, 20 States, 100 Reviews, Scholarships, Placement data
├── pages/                   # All 20 Lazy-loaded pages
├── routes/                  # AppRoutes, ProtectedRoute
├── services/                # Axios instance, authService, collegeService, reviewService, recommendationService
├── styles/                  # Tailwind custom CSS variables and tokens
├── utils/                   # Currency formatters, localStorage helpers
└── validators/              # Zod validation schemas
```

---

## 💻 Setup & Local Development

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch automatically at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

---

## ⚡ All 20 Navigable Pages

1. **Home (`/`)**: Hero banner, live search, quick stats, featured universities, AI predictor CTA.
2. **College Listing (`/colleges`)**: Advanced stream, state, fee & rating filters, grid/list view toggle, quick view modal, pagination.
3. **College Details (`/colleges/:id`)**: Tabbed overview, courses & fees, placements, infrastructure/hostel, reviews.
4. **Course Details (`/courses/:id`)**: Specializations, eligibility, career roles, top hiring partners.
5. **Scholarships (`/scholarships`)**: Financial aid directory with deadline trackers and government fellowship portals.
6. **Placements (`/placements`)**: Recharts salary trends (2021-2025) and sector distribution.
7. **Rankings (`/rankings`)**: NIRF official ranking table with filter by stream.
8. **Reviews (`/reviews`)**: Verified student reviews with star rating breakdown and review submission modal.
9. **Recommendations (`/recommendations`)**: AI match predictor wizard based on entrance score & budget.
10. **Saved Colleges (`/saved-colleges`)**: Bookmarked shortlist manager.
11. **Compare Colleges (`/compare`)**: Matrix table comparing up to 4 colleges side-by-side.
12. **Student Dashboard (`/dashboard/student`)**: Personal overview, shortlisted colleges, cutoff matches, counseling alerts.
13. **Admin Dashboard (`/dashboard/admin`)**: System analytics, college management table, review moderation.
14. **Login (`/login`)**: Zod-validated authentication page (Student & Admin credentials).
15. **Register (`/register`)**: Multi-stream registration form.
16. **Profile (`/profile`)**: Academic background, target exam score, budget slider.
17. **Settings (`/settings`)**: Password update and email notification preferences.
18. **Notifications (`/notifications`)**: Real-time counseling alerts and JoSAA round updates.
19. **404 Not Found (`*`)**: Interactive error recovery page.
