import React, { useState } from 'react';
import { FiBell, FiCheckCircle, FiAlertCircle, FiZap, FiAward, FiBookOpen, FiArrowRight, FiClock, FiCreditCard, FiCheck } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const NotificationsPage = () => {
  const [filter, setFilter] = useState('All');
  const [markedRead, setMarkedRead] = useState(false);

  const notifications = [
    {
      id: 1,
      title: 'Application Fee Payment Confirmed (₹750 Paid)',
      time: 'Just now',
      category: 'Payments',
      type: 'payment',
      content: 'Your application processing token for IIT Bombay (B.Tech CSE) has been confirmed. GST Tax Invoice receipt generated successfully.',
      actionLabel: 'View in Student Cockpit',
      actionPath: ROUTES.STUDENT_DASHBOARD,
    },
    {
      id: 2,
      title: 'NextCampus 24/7 AI Mentor Engine Active',
      time: '1 hour ago',
      category: 'AI Engine',
      type: 'ai',
      content: 'The 24/7 AI College Counselor is live! Ask real-time questions about JoSAA choice locking, seat float/freeze rules, and cutoff predictions.',
      actionLabel: 'Launch AI Predictor',
      actionPath: ROUTES.RECOMMENDATIONS,
    },
    {
      id: 3,
      title: 'JoSAA Counselling Round 1 Seat Allotment Live',
      time: '2 hours ago',
      category: 'JoSAA / NEET',
      type: 'urgent',
      content: 'Opening and closing ranks for IIT Bombay and IIT Delhi updated for CSE and ECE branches. Verify your seat acceptance status before Round 2.',
      actionLabel: 'View Allotments Matrix',
      actionPath: ROUTES.RANKINGS,
    },
    {
      id: 4,
      title: 'Reliance Foundation Scholarship Deadline Approaching',
      time: '1 day ago',
      category: 'Scholarships',
      type: 'scholarship',
      content: 'Complete your application before November 15th to claim up to ₹2,00,000 annual scholarship aid for engineering and medical streams.',
      actionLabel: 'Apply for Aid Portal ↗',
      actionPath: ROUTES.SCHOLARSHIPS,
    },
    {
      id: 5,
      title: 'NEET-UG State Merit List 2026 Released',
      time: '4 days ago',
      category: 'JoSAA / NEET',
      type: 'urgent',
      content: 'State quota opening cutoff marks for Maharashtra, Delhi NCR, and Karnataka medical colleges have been updated.',
      actionLabel: 'Check Cutoff Ranks',
      actionPath: ROUTES.COLLEGES,
    },
    {
      id: 6,
      title: 'BITS Pilani Practice School Internship Drive Started',
      time: '5 days ago',
      category: 'Placement Feed',
      type: 'placement',
      content: 'Over 180 corporate partners launched pre-placement offers (PPO) with average packages touching ₹20.8 LPA.',
      actionLabel: 'View Placement Data',
      actionPath: ROUTES.PLACEMENTS,
    },
  ];

  const filteredNotifications = filter === 'All'
    ? notifications
    : notifications.filter((n) => n.category === filter);

  const getIconStyle = (type) => {
    if (type === 'payment') return { bg: 'bg-gradient-to-br from-emerald-500 to-teal-700 text-white', icon: FiCreditCard };
    if (type === 'ai') return { bg: 'bg-gradient-to-br from-purple-500 to-indigo-700 text-white', icon: FiSparkles };
    if (type === 'urgent') return { bg: 'bg-gradient-to-br from-rose-500 to-rose-700 text-white', icon: FiAlertCircle };
    if (type === 'scholarship') return { bg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white', icon: FiAward };
    return { bg: 'bg-gradient-to-br from-indigo-500 to-purple-700 text-white', icon: FiZap };
  };

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="d-inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-500/30">
            <FiZap className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>Realtime Counseling Feed</span>
          </div>
          <h1 className="h1 font-black text-dark tracking-tight mb-2">
            Notifications & Alerts
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto mb-0">
            Stay updated on live JoSAA/NEET cutoffs, entrance exam deadlines, scholarship grants, and placement benchmarks.
          </p>
        </div>

        {/* Filter Pills Stage */}
        <div className="d-flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto">
          {['All', 'Payments', 'JoSAA / NEET', 'AI Engine', 'Scholarships', 'Placement Feed'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`btn btn-sm text-xs font-extrabold px-3.5 py-2 rounded-xl transition-all ${
                filter === cat
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90'
              }`}
            >
              {cat === 'All' ? `All Alerts (${notifications.length})` : cat}
            </button>
          ))}
        </div>

        {/* Action Bar */}
        <div className="d-flex items-center justify-between max-w-3xl mx-auto px-2">
          <span className="text-xs font-bold text-slate-500">
            {markedRead ? '✅ All caught up! 0 unread alerts.' : `Showing ${filteredNotifications.length} updates`}
          </span>
          <button
            type="button"
            onClick={() => {
              setMarkedRead(!markedRead);
              toast.success(markedRead ? 'Notifications marked as unread' : 'All notifications marked as read!');
            }}
            className="btn btn-sm btn-light border border-slate-200 text-xs font-bold text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800 rounded-xl px-3 py-1.5 d-flex items-center gap-1.5 shadow-2xs"
          >
            <FiCheck className="w-3.5 h-3.5" />
            <span>{markedRead ? 'Mark as Unread' : 'Mark all as read'}</span>
          </button>
        </div>

        {/* Notifications Feed Grid Stage */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredNotifications.map((n) => {
            const iconObj = getIconStyle(n.type);
            const Icon = iconObj.icon;
            return (
              <div
                key={n.id}
                className={`saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl d-flex items-start gap-4 saas-card-hover transition-opacity ${
                  markedRead ? 'opacity-85' : ''
                }`}
              >
                {/* Icon Box */}
                <div className={`w-12 h-12 rounded-2xl ${iconObj.bg} d-flex items-center justify-center font-black text-xl shrink-0 shadow-md relative`}>
                  <Icon className="w-6 h-6" />
                  {!markedRead && (
                    <span className="position-absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full border-2 border-white"></span>
                  )}
                </div>

                {/* Content Area (100% Crisp Visible Dark Text) */}
                <div className="flex-1 space-y-2">
                  <div className="d-flex flex-column flex-sm-row items-sm-center justify-content-between gap-1">
                    <div className="d-flex items-center gap-2">
                      <span className="badge bg-indigo-50 text-indigo-700 font-extrabold text-[10px] px-2.5 py-1 rounded-pill border border-indigo-200/80">
                        {n.category}
                      </span>
                      <h4 className="font-black text-slate-900 text-base mb-0 leading-tight">
                        {n.title}
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-slate-400 d-flex items-center gap-1 shrink-0">
                      <FiClock className="w-3.5 h-3.5" />
                      {n.time}
                    </span>
                  </div>

                  <p className="text-slate-700 font-semibold text-xs sm:text-sm leading-relaxed mb-0">
                    {n.content}
                  </p>

                  <div className="pt-1">
                    <Link
                      to={n.actionPath}
                      className="btn btn-sm btn-saas-primary text-xs font-black px-3.5 py-1.5 rounded-xl text-decoration-none d-inline-flex items-center gap-1.5 shadow-sm hover:scale-105 transition-all"
                    >
                      <span>{n.actionLabel}</span>
                      <FiArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
