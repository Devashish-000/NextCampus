import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { CollegeCard } from '../features/colleges/CollegeCard';
import { FiBookmark, FiSliders, FiBell, FiArrowRight, FiClock, FiCheckCircle, FiZap } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const StudentDashboardPage = () => {
  const { user } = useAuth();
  const { savedColleges } = useSavedColleges();

  const applicationDeadlines = [
    { name: 'IIT Bombay (JoSAA Choice Filling Round 1)', date: 'Oct 30, 2026', status: 'Upcoming' },
    { name: 'IIM Ahmedabad (CAT Form Correction Window)', date: 'Nov 12, 2026', status: 'Pending' },
    { name: 'Reliance Foundation Scholarship Portal', date: 'Nov 15, 2026', status: 'Urgent' },
  ];

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        {/* Spacious Welcome Hero Banner */}
        <div className="position-relative bg-slate-950 text-white rounded-3xl p-4 p-md-5 overflow-hidden border border-slate-800 shadow-2xl space-y-4">
          <div className="position-absolute -top-24 -end-24 w-96 h-96 bg-indigo-600/30 rounded-circle blur-3xl pointer-events-none" />
          <div className="position-absolute -bottom-24 -start-24 w-96 h-96 bg-purple-600/20 rounded-circle blur-3xl pointer-events-none" />

          <div className="position-relative z-10 space-y-3">
            <div className="d-flex flex-wrap items-center gap-2">
              <span className="badge bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-pill shadow-sm">
                ⚡ Verified Student Profile
              </span>
              <span className="text-xs font-bold text-slate-300">
                Counseling Profile: {user?.profileCompleted || 85}% Completed
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-1">
              Welcome back, {user?.fullName || 'Aarav'}! 👋
            </h1>
            
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed mb-0 font-semibold">
              Manage your shortlisted universities, admission cutoff calculators, pending JoSAA deadlines, and counseling notifications in one central portal.
            </p>

            {/* Counseling Profile Progress Meter */}
            <div className="pt-2 max-w-md space-y-1.5">
              <div className="d-flex justify-content-between text-[11px] font-extrabold text-slate-300">
                <span>Profile Completion</span>
                <span className="text-indigo-400">85% Ready</span>
              </div>
              <div className="w-100 bg-slate-800 h-2 rounded-pill overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-100 rounded-pill w-[85%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Metric Cards Grid */}
        <div className="row g-4">
          
          <div className="col-12 col-sm-4">
            <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl space-y-3 saas-card-hover">
              <div className="d-flex items-center justify-between">
                <span className="text-xs font-extrabold text-muted uppercase tracking-wider block">
                  Shortlisted Institutes
                </span>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-bold shadow-xs">
                  <FiBookmark className="w-5 h-5" />
                </div>
              </div>
              <div className="d-flex items-baseline justify-between">
                <p className="h2 font-black text-dark mb-0">{savedColleges.length}</p>
                <Link to={ROUTES.SAVED_COLLEGES} className="text-xs font-black text-indigo-600 hover:text-indigo-800 text-decoration-none">
                  Manage Shortlist →
                </Link>
              </div>
              <p className="text-xs text-muted font-bold mb-0">Ready for JoSAA choice filling</p>
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl space-y-3 saas-card-hover">
              <div className="d-flex items-center justify-between">
                <span className="text-xs font-extrabold text-muted uppercase tracking-wider block">
                  AI Cutoff High Matches
                </span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 d-flex items-center justify-center font-bold shadow-xs">
                  <FiSliders className="w-5 h-5" />
                </div>
              </div>
              <div className="d-flex items-baseline justify-between">
                <p className="h2 font-black text-emerald-600 mb-0">8 High</p>
                <Link to={ROUTES.RECOMMENDATIONS} className="text-xs font-black text-emerald-600 hover:text-emerald-800 text-decoration-none">
                  Run Predictor →
                </Link>
              </div>
              <p className="text-xs text-muted font-bold mb-0">Based on JEE 98.4 percentile score</p>
            </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl space-y-3 saas-card-hover">
              <div className="d-flex items-center justify-between">
                <span className="text-xs font-extrabold text-muted uppercase tracking-wider block">
                  Active Feed Alerts
                </span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 d-flex items-center justify-center font-bold shadow-xs">
                  <FiBell className="w-5 h-5" />
                </div>
              </div>
              <div className="d-flex items-baseline justify-between">
                <p className="h2 font-black text-amber-500 mb-0">3 Active</p>
                <Link to={ROUTES.NOTIFICATIONS} className="text-xs font-black text-amber-600 hover:text-amber-800 text-decoration-none">
                  View Feed →
                </Link>
              </div>
              <p className="text-xs text-muted font-bold mb-0">JoSAA Round 1 seat updates live</p>
            </div>
          </div>

        </div>

        {/* Deadlines & Timelines Glass Stage */}
        <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl space-y-4">
          <div className="d-flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="h5 font-extrabold text-dark mb-0">Upcoming Counseling Deadlines</h3>
              <span className="text-xs text-muted font-semibold">Official JoSAA & NEET 2026 Schedule</span>
            </div>
            <span className="badge bg-indigo-50 text-indigo-700 font-extrabold text-xs px-3 py-1.5 rounded-pill border border-indigo-200">
              Verified Deadlines
            </span>
          </div>

          <div className="space-y-3">
            {applicationDeadlines.map((dl, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200/80 d-flex items-center justify-between gap-3">
                <div className="d-flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white d-flex items-center justify-center font-bold shrink-0 shadow-xs">
                    <FiClock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-dark text-xs sm:text-sm mb-0">{dl.name}</h5>
                    <span className="text-[11px] text-muted font-semibold">Deadline: {dl.date}</span>
                  </div>
                </div>
                <span className={`badge text-xs font-extrabold px-3 py-1.5 rounded-pill ${
                  dl.status === 'Urgent'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}>
                  {dl.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shortlisted Colleges Preview Section */}
        <div className="space-y-4">
          <div className="d-flex items-center justify-between">
            <div>
              <h3 className="h4 font-black text-dark mb-0">My Shortlisted Colleges</h3>
              <span className="text-xs text-muted font-semibold">Quick access to saved institutes</span>
            </div>
            <Link to={ROUTES.SAVED_COLLEGES} className="btn btn-sm btn-saas-primary text-xs font-black px-4 py-2 rounded-xl text-decoration-none d-inline-flex items-center gap-1.5 shadow-md">
              <span>View Full Shortlist ({savedColleges.length})</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="row g-4">
            {savedColleges.slice(0, 3).map((c) => (
              <div key={c.id} className="col-12 col-md-6 col-lg-4">
                <CollegeCard college={c} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
