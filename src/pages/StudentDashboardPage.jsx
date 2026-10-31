import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { CollegeCard } from '../features/colleges/CollegeCard';
import {
  FiBookmark,
  FiSliders,
  FiBell,
  FiArrowRight,
  FiClock,
  FiCheckCircle,
  FiZap,
  FiUser,
  FiAward,
  FiShield,
  FiTarget,
  FiFileText,
  FiEdit2,
  FiMapPin,
  FiCheck,
  FiCreditCard,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { leadService } from '../services/leadService';
import { PaymentModal } from '../components/features/payment/PaymentModal';
import toast from 'react-hot-toast';

export const StudentDashboardPage = () => {
  const { user } = useAuth();
  const { savedColleges } = useSavedColleges();

  const [applications, setApplications] = useState([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [selectedAppForPayment, setSelectedAppForPayment] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Quick Profile Editor State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    targetExam: user?.targetExam || 'JEE Main',
    entranceScore: user?.entranceScore || 96.5,
    category: user?.category || 'General',
    state: user?.state || 'Maharashtra',
    budgetMax: user?.budgetMax || 1500000,
  });

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await leadService.getMyApplications(user?.email || 'aarav@gmail.com');
        if (res && res.data) {
          setApplications(res.data);
        }
      } catch (err) {
        console.warn('Failed to load applications:', err);
      } finally {
        setLoadingApps(false);
      }
    };

    fetchApplications();
  }, [user]);

  const handleOpenPayment = (app) => {
    setSelectedAppForPayment(app);
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (updatedLead, receipt) => {
    setApplications((prev) =>
      prev.map((a) =>
        a._id === updatedLead._id || a.collegeName === updatedLead.collegeName
          ? { ...a, ...updatedLead, paymentStatus: 'paid' }
          : a
      )
    );
  };

  // Compute Shortlist Safety Breakdown
  const userScore = Number(profileData.entranceScore) || 90;
  const safeCollegesCount = savedColleges.filter((c) => (c.cutoffMinPercentile || 85) <= userScore - 3).length;
  const targetCollegesCount = savedColleges.filter((c) => Math.abs((c.cutoffMinPercentile || 85) - userScore) <= 3).length;
  const dreamCollegesCount = savedColleges.filter((c) => (c.cutoffMinPercentile || 85) > userScore + 3).length;

  const applicationDeadlines = [
    { name: 'IIT Bombay (JoSAA Choice Filling Round 1)', date: 'Oct 30, 2026', status: 'Upcoming' },
    { name: 'IIM Ahmedabad (CAT Form Correction Window)', date: 'Nov 12, 2026', status: 'Pending' },
    { name: 'Reliance Foundation Scholarship Portal', date: 'Nov 15, 2026', status: 'Urgent' },
  ];

  const getApplicationStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return { label: '🔥 Under Review', bg: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
      case 'Contacted':
        return { label: '📞 Counselor Contacted', bg: 'bg-cyan-50 text-cyan-800 border-cyan-200' };
      case 'Counseling':
        return { label: '🤝 In Verification', bg: 'bg-amber-50 text-amber-800 border-amber-200' };
      case 'Admitted':
        return { label: '🎉 Seat Allotted', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
      default:
        return { label: status, bg: 'bg-slate-50 text-slate-700 border-slate-200' };
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    toast.success('Counseling academic score updated!');
  };

  return (
    <div className="w-100 min-vh-100 bg-slate-50/70 py-6">
      <div className="container-xl max-w-7xl mx-auto px-4 space-y-6">
        
        {/* Spacious Welcome Hero Banner */}
        <div className="position-relative bg-slate-950 text-white rounded-3xl p-6 md:p-8 overflow-hidden border border-slate-800 shadow-2xl space-y-4">
          <div className="position-absolute -top-24 -end-24 w-96 h-96 bg-indigo-600/30 rounded-circle blur-3xl pointer-events-none" />
          <div className="position-absolute -bottom-24 -start-24 w-96 h-96 bg-purple-600/20 rounded-circle blur-3xl pointer-events-none" />

          <div className="position-relative z-10 d-flex flex-column flex-lg-row items-lg-center justify-between gap-5">
            <div className="space-y-3">
              <div className="d-flex flex-wrap items-center gap-2">
                <span className="badge bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs px-3 py-1.5 rounded-pill shadow-sm">
                  ⚡ Verified Student Profile
                </span>
                <span className="text-xs font-bold text-slate-300">
                  Counseling Profile: {user?.profileCompleted || 90}% Ready
                </span>
              </div>

              <h1 className="h2 font-black text-white tracking-tight mb-1">
                Welcome back, {user?.fullName || 'Aarav Sharma'}! 👋
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed mb-0 font-semibold">
                Centralized student admissions cockpit — track submitted college applications, JoSAA cutoff matches, counseling interviews, and shortlisted universities.
              </p>
            </div>

            {/* Quick Profile Parameters Capsule Card */}
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-3xl backdrop-blur-md shadow-xl shrink-0 min-w-[280px] space-y-3">
              <div className="d-flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-[11px] font-black uppercase tracking-wider text-indigo-400">
                  Target Academic Profile
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="btn btn-sm btn-link text-slate-300 p-0 text-xs font-bold text-decoration-none d-flex items-center gap-1 hover:text-white"
                >
                  <FiEdit2 className="w-3 h-3" />
                  <span>{isEditingProfile ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-2">
                  <div className="row g-2">
                    <div className="col-6">
                      <label className="text-[10px] text-slate-400 font-bold d-block">Exam</label>
                      <select
                        value={profileData.targetExam}
                        onChange={(e) => setProfileData({ ...profileData, targetExam: e.target.value })}
                        className="form-select form-select-sm text-xs bg-slate-800 text-white border-slate-700"
                      >
                        <option value="JEE Main">JEE Main</option>
                        <option value="JEE Advanced">JEE Adv</option>
                        <option value="NEET">NEET</option>
                        <option value="CAT">CAT</option>
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="text-[10px] text-slate-400 font-bold d-block">Score / %ile</label>
                      <input
                        type="number"
                        step="0.1"
                        value={profileData.entranceScore}
                        onChange={(e) => setProfileData({ ...profileData, entranceScore: e.target.value })}
                        className="form-control form-control-sm text-xs bg-slate-800 text-white border-slate-700 font-bold"
                      />
                    </div>
                    <div className="col-12">
                      <label className="text-[10px] text-slate-400 font-bold d-block">Category</label>
                      <select
                        value={profileData.category}
                        onChange={(e) => setProfileData({ ...profileData, category: e.target.value })}
                        className="form-select form-select-sm text-xs bg-slate-800 text-white border-slate-700"
                      >
                        <option value="General">General (Open)</option>
                        <option value="OBC-NCL">OBC-NCL</option>
                        <option value="EWS">Gen-EWS</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-saas-primary btn-sm w-100 text-xs font-bold py-1.5 mt-2">
                    Save Parameters
                  </button>
                </form>
              ) : (
                <div className="space-y-2 text-xs">
                  <div className="d-flex justify-between">
                    <span className="text-slate-400 font-semibold">Target Exam:</span>
                    <span className="text-white font-extrabold">{profileData.targetExam}</span>
                  </div>
                  <div className="d-flex justify-between">
                    <span className="text-slate-400 font-semibold">Expected Percentile:</span>
                    <span className="text-emerald-400 font-black text-sm">{profileData.entranceScore}%</span>
                  </div>
                  <div className="d-flex justify-between">
                    <span className="text-slate-400 font-semibold">Reservation Category:</span>
                    <span className="text-white font-bold">{profileData.category}</span>
                  </div>
                  <div className="d-flex justify-between">
                    <span className="text-slate-400 font-semibold">Domicile:</span>
                    <span className="text-white font-bold">{profileData.state}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Analytics Metric Cards Grid */}
        <div className="row g-4">
          {/* Active Applications */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm h-100 hover:shadow-md transition-shadow space-y-3">
              <div className="d-flex items-center justify-between">
                <span className="text-xs font-black text-muted uppercase tracking-wider block">
                  Active Applications
                </span>
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-bold shadow-xs">
                  <FiFileText className="w-5 h-5" />
                </div>
              </div>
              <h3 className="h2 font-black text-dark mb-0">{applications.length}</h3>
              <p className="text-xs text-indigo-600 font-extrabold mb-0">Admissions inquiries submitted</p>
            </div>
          </div>

          {/* Shortlisted Colleges */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm h-100 hover:shadow-md transition-shadow space-y-3">
              <div className="d-flex items-center justify-between">
                <span className="text-xs font-black text-muted uppercase tracking-wider block">
                  Shortlisted Colleges
                </span>
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 d-flex items-center justify-center font-bold shadow-xs">
                  <FiBookmark className="w-5 h-5" />
                </div>
              </div>
              <h3 className="h2 font-black text-dark mb-0">{savedColleges.length}</h3>
              <Link to={ROUTES.SAVED_COLLEGES} className="text-xs font-black text-emerald-600 hover:text-emerald-800 text-decoration-none d-block">
                Manage Shortlist →
              </Link>
            </div>
          </div>

          {/* Available Scholarships */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm h-100 hover:shadow-md transition-shadow space-y-3">
              <div className="d-flex items-center justify-between">
                <span className="text-xs font-black text-muted uppercase tracking-wider block">
                  Scholarship Grants
                </span>
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 d-flex items-center justify-center font-bold shadow-xs">
                  <FiAward className="w-5 h-5" />
                </div>
              </div>
              <h3 className="h2 font-black text-amber-500 mb-0">12 Active</h3>
              <Link to={ROUTES.SCHOLARSHIPS} className="text-xs font-black text-amber-600 hover:text-amber-800 text-decoration-none d-block">
                Explore Grants →
              </Link>
            </div>
          </div>

          {/* Counseling Notifications */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm h-100 hover:shadow-md transition-shadow space-y-3">
              <div className="d-flex items-center justify-between">
                <span className="text-xs font-black text-muted uppercase tracking-wider block">
                  Counseling Alerts
                </span>
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 d-flex items-center justify-center font-bold shadow-xs">
                  <FiBell className="w-5 h-5" />
                </div>
              </div>
              <h3 className="h2 font-black text-purple-600 mb-0">3 Live</h3>
              <Link to={ROUTES.NOTIFICATIONS} className="text-xs font-black text-purple-600 hover:text-purple-800 text-decoration-none d-block">
                View Alerts Feed →
              </Link>
            </div>
          </div>
        </div>

        {/* ACTIVE ADMISSIONS APPLICATIONS & COUNSELING INQUIRIES TRACKER */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="d-flex flex-column flex-sm-row items-sm-center justify-between border-b border-gray-100 pb-3 gap-2">
            <div>
              <h3 className="h5 font-black text-dark mb-0">My Submitted College Applications</h3>
              <p className="text-xs text-muted mb-0">
                Live status tracking of your direct admission inquiries and counselor callbacks
              </p>
            </div>
            <span className="badge bg-indigo-50 text-indigo-700 font-extrabold text-xs px-3 py-1.5 rounded-pill border border-indigo-200 self-start">
              {applications.length} Submitted
            </span>
          </div>

          <div className="row g-3">
            {applications.map((app) => {
              const badge = getApplicationStatusBadge(app.status);
              return (
                <div key={app._id} className="col-12 col-md-6 col-lg-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-xs h-100 d-flex flex-column justify-between space-y-3 hover:bg-white hover:shadow-md transition-all">
                    <div className="space-y-2">
                      <div className="d-flex items-center justify-between">
                        <span className={`badge text-[11px] font-black px-2.5 py-1 rounded-pill border ${badge.bg}`}>
                          {badge.label}
                        </span>
                        <span className="text-[10px] text-muted font-bold">
                          {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-dark mb-0 text-truncate">
                        {app.collegeName}
                      </h4>
                      <p className="text-xs text-muted font-semibold mb-0 text-truncate">
                        🎓 {app.courseInterested}
                      </p>
                      {app.score && (
                        <p className="text-[11px] text-slate-600 font-bold mb-0">
                          Score Applied: <span className="text-indigo-600">{app.score}%</span> ({app.examTaken || 'JEE'})
                        </p>
                      )}
                      {app.notes && (
                        <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-600">
                          <span className="font-bold text-dark d-block text-[10px] uppercase">Counselor Note:</span>
                          {app.notes}
                        </div>
                      )}
                    </div>

                    <div className="d-flex items-center justify-between pt-2 border-t border-slate-200/80">
                      {app.paymentStatus === 'paid' ? (
                        <button
                          type="button"
                          onClick={() => handleOpenPayment(app)}
                          className="btn btn-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2.5 py-1 rounded-pill d-inline-flex items-center gap-1 shadow-2xs"
                        >
                          <FiCheckCircle className="w-3 h-3 text-emerald-500" /> Fee Paid • Receipt
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleOpenPayment(app)}
                          className="btn btn-xs bg-indigo-600 hover:bg-indigo-700 text-white font-black px-2.5 py-1.5 rounded-lg text-[10px] d-inline-flex items-center gap-1 shadow-xs active:scale-95 transition-all"
                        >
                          <FiCreditCard className="w-3 h-3" /> Pay Fee (₹750)
                        </button>
                      )}

                      <Link to={`/colleges/${app.collegeId}`} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 text-decoration-none d-inline-flex items-center gap-1">
                        <span>Details</span>
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* AI SHORTLIST ODDS SAFETY BREAKDOWN WIDGET */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800 space-y-4">
          <div className="d-flex flex-column flex-md-row items-md-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="d-flex items-center gap-2 mb-1">
                <FiSliders className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-indigo-300 font-bold uppercase tracking-wider">
                  AI Admission Safety Outlook
                </span>
              </div>
              <h3 className="h5 font-black text-white mb-0">Shortlisted Cutoff Compatibility Analysis</h3>
              <p className="text-xs text-slate-300 mb-0">
                Evaluation based on your {profileData.entranceScore}% expected score across saved institutes
              </p>
            </div>

            <Link to={ROUTES.RECOMMENDATIONS} className="text-decoration-none">
              <button
                type="button"
                className="btn btn-sm btn-light font-black rounded-xl text-xs px-4 py-2.5 d-inline-flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
              >
                <FiZap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
                <span>Run Full AI Predictor</span>
              </button>
            </Link>
          </div>

          <div className="row g-3">
            <div className="col-12 col-md-4">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 d-flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-emerald-400 d-flex items-center gap-1.5">
                    <FiShield className="w-4 h-4" /> Safe Choices
                  </span>
                  <span className="text-[11px] text-slate-300">Admission probability &gt; 85%</span>
                </div>
                <span className="h3 font-black text-emerald-400 mb-0">{safeCollegesCount}</span>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 d-flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-amber-400 d-flex items-center gap-1.5">
                    <FiTarget className="w-4 h-4" /> Target Choices
                  </span>
                  <span className="text-[11px] text-slate-300">Competitive match (60-84%)</span>
                </div>
                <span className="h3 font-black text-amber-400 mb-0">{targetCollegesCount}</span>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 d-flex items-center justify-between">
                <div>
                  <span className="text-xs font-black text-purple-300 d-flex items-center gap-1.5">
                    <FiAward className="w-4 h-4" /> Dream Choices
                  </span>
                  <span className="text-[11px] text-slate-300">Aspirational reach (&lt; 60%)</span>
                </div>
                <span className="h3 font-black text-purple-300 mb-0">{dreamCollegesCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Deadlines & Timelines Stage */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
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

        {/* Razorpay Admissions Fee Payment Modal */}
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => setIsPaymentModalOpen(false)}
          application={selectedAppForPayment}
          onPaymentSuccess={handlePaymentSuccess}
        />

      </div>
    </div>
  );
};
