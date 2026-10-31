import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiGrid, FiBookmark, FiSliders, FiBell, FiUser, FiUsers, FiBarChart2, FiShield, FiFileText } from 'react-icons/fi';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../context/AuthContext';

export const Sidebar = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isInstitute = user?.role === 'institute';

  const studentLinks = [
    { name: 'Overview', path: ROUTES.STUDENT_DASHBOARD, icon: FiGrid },
    { name: 'AI Predictor', path: ROUTES.RECOMMENDATIONS, icon: FiSliders },
    { name: 'Saved Colleges', path: ROUTES.SAVED_COLLEGES, icon: FiBookmark },
    { name: 'My Profile', path: ROUTES.PROFILE, icon: FiUser },
    { name: 'Notifications', path: ROUTES.NOTIFICATIONS, icon: FiBell },
    { name: 'Account Settings', path: ROUTES.SETTINGS, icon: FiShield },
  ];

  const adminLinks = [
    { name: 'Admin Dashboard', path: ROUTES.ADMIN_DASHBOARD, icon: FiBarChart2 },
    { name: 'Manage Students', path: ROUTES.ADMIN_STUDENTS, icon: FiUsers },
    { name: 'Scholarships', path: ROUTES.ADMIN_SCHOLARSHIPS, icon: FiBookmark },
    { name: 'Placements', path: ROUTES.ADMIN_PLACEMENTS, icon: FiBarChart2 },
    { name: 'Review Moderation', path: ROUTES.ADMIN_REVIEWS, icon: FiFileText },
    { name: 'Notifications', path: ROUTES.ADMIN_NOTIFICATIONS, icon: FiBell },
    { name: 'System Settings', path: ROUTES.SETTINGS, icon: FiShield },
  ];

  const instituteLinks = [
    { name: 'Institute Dashboard', path: ROUTES.INSTITUTE_DASHBOARD, icon: FiGrid },
    { name: 'College Profile', path: ROUTES.PROFILE, icon: FiUser },
    { name: 'Update Placements', path: ROUTES.ADMIN_PLACEMENTS, icon: FiBarChart2 },
    { name: 'Post Scholarships', path: ROUTES.ADMIN_SCHOLARSHIPS, icon: FiBookmark },
    { name: 'Account Settings', path: ROUTES.SETTINGS, icon: FiShield },
  ];

  const links = isAdmin ? adminLinks : isInstitute ? instituteLinks : studentLinks;

  return (
    <aside className="w-72 bg-white border-r border-slate-200/80 p-6 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-4.5rem)] shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10 relative">
      <div className="space-y-6">
        <div>
          <div className="d-flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0">
              {isAdmin ? 'Enterprise Admin Console' : isInstitute ? 'Institute Portal' : 'Student Portal'}
            </p>
          </div>
          
          <nav className="space-y-1.5">
            {links.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 relative group ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100/50'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-indigo-600' : 'group-hover:scale-110'}`} />
                      <span className="tracking-wide whitespace-nowrap">{item.name}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* System Status Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100/80 relative overflow-hidden group">
        {/* Decorative subtle circle */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
        
        <div className="relative z-10 space-y-2.5">
          <div className="d-flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white shadow-sm d-flex items-center justify-center text-emerald-600 relative">
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
            </div>
            <h5 className="text-sm font-black text-emerald-900 mb-0">System Live</h5>
          </div>
          <p className="text-[11px] text-emerald-800/80 font-bold mb-0 leading-relaxed">
            Connected to Cloud MongoDB. Services are running optimally.
          </p>
        </div>
      </div>
    </aside>
  );
};
