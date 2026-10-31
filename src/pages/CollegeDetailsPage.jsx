import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiBookmark, FiPlus, FiCheck, FiAward, FiCheckCircle, FiBookOpen, FiHome, FiDollarSign, FiArrowRight, FiZap } from 'react-icons/fi';
import { collegeService } from '../services/collegeService';
import { reviewService } from '../services/reviewService';
import { ReviewCard } from '../features/reviews/ReviewCard';
import { ApplyLeadModal } from '../components/features/colleges/ApplyLeadModal';
import { formatCurrency } from '../utils/formatters';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { useComparison } from '../context/ComparisonContext';
import { ROUTES } from '../constants/routes';

export const CollegeDetailsPage = () => {
  const { id } = useParams();
  const [college, setCollege] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const { savedIds, toggleSaveCollege } = useSavedColleges();
  const { comparedColleges, addToCompare, removeFromCompare } = useComparison();

  useEffect(() => {
    setLoading(true);
    Promise.all([collegeService.getCollegeById(id), reviewService.getReviews({ collegeId: id })]).then(
      ([clgRes, revRes]) => {
        setCollege(clgRes);
        setReviews(revRes || []);
        setLoading(false);
      }
    );
  }, [id]);

  if (loading) {
    return (
      <div className="w-100 min-vh-100 bg-tech-grid d-flex flex-column items-center justify-center space-y-3 py-16">
        <div className="spinner-border text-indigo-600" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-xs font-bold text-muted">Loading university profile...</p>
      </div>
    );
  }

  if (!college) return null;

  const isSaved = savedIds.includes(college.id);
  const isCompared = comparedColleges.some((c) => c.id === college.id);

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'courses', name: 'Courses & Fees' },
    { id: 'placements', name: 'Placements' },
    { id: 'hostel', name: 'Infrastructure & Hostel' },
    { id: 'reviews', name: `Reviews (${reviews.length})` },
  ];

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4 space-y-5">
      
      {/* Full-Width College Banner Header */}
      <div className="position-relative bg-slate-950 text-white py-5 min-vh-35 d-flex items-end overflow-hidden border-b border-slate-800 shadow-2xl">
        <img
          src={college.image}
          alt={college.name}
          className="position-absolute inset-0 w-100 h-100 object-cover opacity-40"
        />
        <div className="position-absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-black/30 pointer-events-none" />

        <div className="container px-3 px-md-5 position-relative z-10">
          <div className="d-flex flex-column flex-md-row items-md-end justify-content-between gap-4">
            <div className="d-flex items-start gap-3.5">
              <img
                src={college.logo}
                alt={college.shortName}
                className="w-20 h-20 rounded-2xl bg-white p-2 border border-slate-200 shadow-2xl object-contain shrink-0"
              />
              <div className="space-y-2">
                <div className="d-flex flex-wrap items-center gap-2">
                  <span className="badge bg-indigo-600 text-white font-black text-xs px-3 py-1.5 rounded-pill shadow-sm">
                    NIRF #{college.nirfRank}
                  </span>
                  <span className="badge bg-emerald-500 text-white font-black text-xs px-3 py-1.5 rounded-pill shadow-sm">
                    {college.accreditation}
                  </span>
                  <span className="text-xs text-slate-300 font-semibold">Estd. {college.establishedYear}</span>
                </div>
                <h1 className="h2 font-black text-white mb-1 drop-shadow-md">{college.name}</h1>
                <p className="text-xs sm:text-sm text-slate-300 d-flex items-center gap-1.5 mb-0 font-semibold">
                  <FiMapPin className="text-indigo-400" />
                  {college.location}, {college.state} • Campus Area: {college.campusArea}
                </p>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="d-flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(true)}
                className="btn btn-sm text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-500/40 d-inline-flex items-center gap-1.5 bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 text-white hover:scale-105 active:scale-95 border-0"
              >
                <FiZap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>Apply / Inquire</span>
              </button>

              <button
                type="button"
                onClick={() => toggleSaveCollege(college.id, college.shortName)}
                className={`btn btn-sm text-xs font-black px-3.5 py-2.5 rounded-xl transition-all shadow-md d-inline-flex items-center gap-1.5 ${
                  isSaved ? 'bg-indigo-600 text-white border-0' : 'bg-slate-900/80 text-white border border-slate-700 hover:bg-slate-800'
                }`}
              >
                <FiBookmark className="w-3.5 h-3.5" />
                <span>{isSaved ? 'Saved' : 'Shortlist'}</span>
              </button>

              <button
                type="button"
                onClick={() => (isCompared ? removeFromCompare(college.id) : addToCompare(college))}
                className={`btn btn-sm text-xs font-black px-3.5 py-2.5 rounded-xl transition-all shadow-md d-inline-flex items-center gap-1.5 ${
                  isCompared ? 'bg-emerald-600 text-white border-0' : 'btn-saas-primary'
                }`}
              >
                {isCompared ? <FiCheck className="w-3.5 h-3.5" /> : <FiPlus className="w-3.5 h-3.5" />}
                <span>{isCompared ? 'In Compare' : 'Compare'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Bar Navigation Stage */}
      <div className="container px-3 px-md-5">
        <div className="d-flex overflow-x-auto gap-2 border-bottom border-gray-200/80 pb-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`btn btn-sm text-xs font-black px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                activeTab === t.id
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-gray-200/80'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content Stage */}
      <div className="container px-3 px-md-5">
        <div className="row g-4">
          
          {/* Main Tab Content Left Column */}
          <div className="col-12 col-lg-8 space-y-4">
            
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl space-y-3">
                  <h3 className="h5 font-extrabold text-dark mb-2">About the University</h3>
                  <p className="text-muted text-xs sm:text-sm leading-relaxed mb-0">
                    {college.description}
                  </p>
                </div>

                {/* Highlights 3 Card Grid */}
                <div className="row g-3">
                  <div className="col-12 col-sm-4">
                    <div className="saas-card p-3.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-2xl">
                      <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider block mb-1">Cutoff Exam</span>
                      <span className="font-extrabold text-indigo-600 text-sm block">{college.cutoffExam}</span>
                      <span className="text-[10px] font-bold text-muted block mt-0.5">Min {college.cutoffMinPercentile}%ile</span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <div className="saas-card p-3.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-2xl">
                      <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider block mb-1">Placement Rate</span>
                      <span className="font-extrabold text-emerald-600 text-sm block">{college.placementRate}</span>
                      <span className="text-[10px] font-bold text-muted block mt-0.5">Verified Placement Cell</span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-4">
                    <div className="saas-card p-3.5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md rounded-2xl">
                      <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider block mb-1">Hostel Facility</span>
                      <span className="font-extrabold text-purple-600 text-sm block">
                        {college.hostelAvailable ? 'Available' : 'Day Scholar Only'}
                      </span>
                      <span className="text-[10px] font-bold text-muted block mt-0.5">Boys & Girls Hostels</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Courses & Fees */}
            {activeTab === 'courses' && (
              <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl space-y-4">
                <h3 className="h5 font-extrabold text-dark mb-3">Offered Programs & Fees</h3>
                <div className="space-y-3">
                  {college.degrees.map((deg, i) => (
                    <div key={i} className="p-3.5 rounded-2xl border border-gray-100 bg-slate-50/50 d-flex items-center justify-between">
                      <div>
                        <h5 className="font-bold text-dark text-sm mb-0">{deg}</h5>
                        <span className="text-[11px] text-muted font-semibold">Duration: 2 - 4 Years • Full Time</span>
                      </div>
                      <span className="text-xs font-black text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-pill">
                        {formatCurrency(college.totalFees)} Total
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Placements */}
            {activeTab === 'placements' && (
              <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl space-y-4">
                <h3 className="h5 font-extrabold text-dark mb-3">Placement Records</h3>
                <div className="row g-3">
                  <div className="col-12 col-sm-6">
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                      <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">Highest Salary Offered</span>
                      <span className="h3 font-black text-emerald-600 mb-0 d-block">{formatCurrency(college.highestSalary)}</span>
                    </div>
                  </div>

                  <div className="col-12 col-sm-6">
                    <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                      <span className="text-xs font-bold text-indigo-800 uppercase block mb-1">Average Salary Package</span>
                      <span className="h3 font-black text-indigo-600 mb-0 d-block">{formatCurrency(college.avgSalary)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Hostel */}
            {activeTab === 'hostel' && (
              <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl space-y-3">
                <h3 className="h5 font-extrabold text-dark mb-3">Campus Infrastructure</h3>
                <ul className="space-y-2 text-xs text-slate-700 font-semibold list-unstyled mb-0">
                  <li className="d-flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-500 shrink-0" /> High-speed Wi-Fi across all hostels & academic blocks
                  </li>
                  <li className="d-flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-500 shrink-0" /> Modern central library with 100,000+ digital & physical volumes
                  </li>
                  <li className="d-flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-500 shrink-0" /> Olympic-sized sports complex, gym, and indoor auditoriums
                  </li>
                </ul>
              </div>
            )}

            {/* Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            )}

          </div>

          {/* Sidebar Action Card Right Column */}
          <div className="col-12 col-lg-4 space-y-4">
            <div className="saas-card p-4 bg-slate-900 text-white border border-slate-800 shadow-2xl rounded-3xl space-y-3">
              <h4 className="font-extrabold text-white text-base mb-1">Admission Contact</h4>
              <div className="space-y-2 text-xs text-slate-300 font-semibold border-t border-b border-slate-800 py-3">
                <p className="mb-0">📍 {college.location}, {college.state}</p>
                <p className="mb-0">🌐 Official Portal: www.{college.shortName.toLowerCase().replace(/[^a-z]/g, '')}.ac.in</p>
                <p className="mb-0">📞 Admission Helpline: 1800-425-9988</p>
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(true)}
                  className="btn btn-saas-primary w-100 text-xs py-2.5 font-black d-flex items-center justify-center gap-2 shadow-lg"
                >
                  <FiZap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                  <span>Apply for Admission</span>
                </button>
                <Link to={ROUTES.SCHOLARSHIPS} className="btn btn-outline-light w-100 text-xs py-2 font-bold text-decoration-none d-flex items-center justify-center gap-2">
                  <span>Explore Scholarships</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Student Application & Inquiry Lead Modal */}
      <ApplyLeadModal
        college={college}
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

    </div>
  );
};
