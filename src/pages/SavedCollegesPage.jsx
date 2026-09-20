import React from 'react';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { CollegeCard } from '../features/colleges/CollegeCard';
import { FiBookmark, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const SavedCollegesPage = () => {
  const { savedColleges } = useSavedColleges();

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="d-inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FiBookmark className="w-4 h-4 text-indigo-600" />
            <span>Shortlisted Universities ({savedColleges.length})</span>
          </div>
          <h1 className="h2 font-black text-dark mb-1">
            Your Bookmarked Colleges
          </h1>
          <p className="text-muted text-xs mb-0">
            Quickly access your shortlisted institutes for one-click comparison, fee breakdown, and counseling deadlines.
          </p>
        </div>

        {/* Empty State vs College Grid */}
        {savedColleges.length === 0 ? (
          <div className="saas-card p-5 p-md-6 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl rounded-3xl text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-black text-2xl mx-auto shadow-md border border-indigo-200/60">
              <FiBookmark />
            </div>
            <div className="space-y-1">
              <h3 className="h5 font-extrabold text-dark mb-1">Your Shortlist is Empty</h3>
              <p className="text-muted text-xs max-w-md mx-auto mb-0">
                You haven't bookmarked any colleges yet. Browse colleges and click the bookmark icon to save them here.
              </p>
            </div>

            <div className="pt-2">
              <Link to={ROUTES.COLLEGES} className="btn btn-saas-primary text-xs px-4 py-2.5 font-extrabold text-decoration-none d-inline-flex items-center gap-2 shadow-md">
                <span>Browse Colleges Directory</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {savedColleges.map((c) => (
              <div key={c.id} className="col-12 col-md-6 col-lg-4">
                <CollegeCard college={c} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
