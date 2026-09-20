import React from 'react';
import { FiStar, FiCheckCircle, FiThumbsUp } from 'react-icons/fi';

export const ReviewCard = ({ review }) => {
  return (
    <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl space-y-4 h-100 d-flex flex-column justify-between saas-card-hover">
      <div>
        {/* Header with Student Avatar, Info & Overall Rating Badge */}
        <div className="d-flex items-start justify-between gap-3 border-bottom border-gray-100 pb-3.5 mb-3">
          <div className="d-flex items-center gap-3">
            {/* Unsplash Photo Avatar */}
            <img
              src={review.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={review.studentName || review.author}
              className="w-11 h-11 rounded-circle object-cover shadow-sm border border-gray-200 shrink-0"
            />
            <div>
              <div className="d-flex items-center gap-2">
                <h4 className="font-extrabold text-dark text-base mb-0">
                  {review.studentName || review.author}
                </h4>
                {review.isVerifiedStudent && (
                  <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-[10px] px-2 py-0.5 rounded-pill d-inline-flex items-center gap-1">
                    <FiCheckCircle className="w-3 h-3 text-emerald-600" /> Verified Student
                  </span>
                )}
              </div>
              <p className="text-xs text-muted font-semibold mb-0 mt-0.5">
                {review.courseName || review.course} • Class of {review.batchYear} • Posted {review.date}
              </p>
            </div>
          </div>

          {/* Overall Rating Star Badge */}
          <div className="badge bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded-pill d-flex items-center gap-1 font-black text-xs shrink-0">
            <FiStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{review.overallRating || review.rating} / 5</span>
          </div>
        </div>

        {/* College Name & Review Title */}
        <div className="mb-3">
          {review.collegeName && (
            <span className="text-[11px] font-extrabold text-indigo-600 uppercase tracking-wider block mb-1">
              {review.collegeName}
            </span>
          )}
          <h3 className="h6 font-black text-dark leading-snug mb-0">
            "{review.title}"
          </h3>
        </div>

        {/* Ratings Breakdown Grid (Dark Slate High-Contrast Boxes) */}
        <div className="row g-2 text-xs mb-3">
          <div className="col-6 col-sm-3">
            <div className="p-2.5 bg-slate-900 text-white rounded-2xl border border-slate-800 text-center shadow-inner">
              <span className="text-slate-400 font-extrabold text-[10px] uppercase block mb-0.5">Placements</span>
              <span className="font-black text-indigo-300 text-xs">{review.placementsRating || 4.8} / 5</span>
            </div>
          </div>
          <div className="col-6 col-sm-3">
            <div className="p-2.5 bg-slate-900 text-white rounded-2xl border border-slate-800 text-center shadow-inner">
              <span className="text-slate-400 font-extrabold text-[10px] uppercase block mb-0.5">Infrastructure</span>
              <span className="font-black text-indigo-300 text-xs">{review.infrastructureRating || 4.5} / 5</span>
            </div>
          </div>
          <div className="col-6 col-sm-3">
            <div className="p-2.5 bg-slate-900 text-white rounded-2xl border border-slate-800 text-center shadow-inner">
              <span className="text-slate-400 font-extrabold text-[10px] uppercase block mb-0.5">Faculty</span>
              <span className="font-black text-indigo-300 text-xs">{review.facultyRating || 4.7} / 5</span>
            </div>
          </div>
          <div className="col-6 col-sm-3">
            <div className="p-2.5 bg-slate-900 text-white rounded-2xl border border-slate-800 text-center shadow-inner">
              <span className="text-slate-400 font-extrabold text-[10px] uppercase block mb-0.5">Campus Life</span>
              <span className="font-black text-indigo-300 text-xs">{review.campusLifeRating || 4.6} / 5</span>
            </div>
          </div>
        </div>

        {/* HIGH CONTRAST PROS & CONS BOXES */}
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <div className="p-3.5 bg-emerald-50/90 border border-emerald-200/90 rounded-2xl h-100">
              <h5 className="text-[11px] font-black text-emerald-800 uppercase tracking-wider mb-1">
                👍 PROS
              </h5>
              <p className="text-xs text-slate-800 font-semibold mb-0 whitespace-pre-line leading-relaxed">
                {review.pros}
              </p>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="p-3.5 bg-rose-50/90 border border-rose-200/90 rounded-2xl h-100">
              <h5 className="text-[11px] font-black text-rose-800 uppercase tracking-wider mb-1">
                👎 CONS
              </h5>
              <p className="text-xs text-slate-800 font-semibold mb-0 whitespace-pre-line leading-relaxed">
                {review.cons}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Helpful Action Footer */}
      <div className="d-flex items-center justify-between pt-3 border-top border-gray-100 text-xs mt-3">
        <span className="text-muted font-semibold">Was this review helpful?</span>
        <button
          type="button"
          className="btn btn-sm btn-saas-compare px-3 py-1.5 font-extrabold text-xs d-inline-flex items-center gap-1.5"
        >
          <FiThumbsUp className="w-3.5 h-3.5 text-indigo-600" />
          <span>Helpful ({review.helpfulCount || 12})</span>
        </button>
      </div>
    </div>
  );
};
