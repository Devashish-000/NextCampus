import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiBookmark, FiPlus, FiCheck, FiEye, FiArrowRight, FiBarChart2 } from 'react-icons/fi';
import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../utils/formatters';
import { useSavedColleges } from '../../context/SavedCollegesContext';
import { useComparison } from '../../context/ComparisonContext';

export const CollegeCard = ({ college, onQuickView }) => {
  const { savedIds, toggleSaveCollege } = useSavedColleges();
  const { comparedColleges, addToCompare, removeFromCompare } = useComparison();

  const isSaved = savedIds.includes(college.id);
  const isCompared = comparedColleges.some((c) => c.id === college.id);

  return (
    <div className="saas-card p-0 overflow-hidden h-100 d-flex flex-column justify-content-between saas-card-hover group bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-md">
      <div>
        {/* Cover Image & High-Contrast Gradient Scrim Header Overlay */}
        <div className="position-relative overflow-hidden bg-slate-950" style={{ height: '176px' }}>
          <img
            src={college.image}
            alt={college.name}
            className="w-100 h-100 object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
          />
          {/* Deep Dark Gradient Overlay for Maximum Text Readability */}
          <div className="position-absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30 pointer-events-none" />

          {/* NIRF Rank Badge */}
          <div className="position-absolute top-3 start-3 z-10">
            <span className="badge bg-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1.5 rounded-pill shadow-md border border-indigo-400/40">
              NIRF #{college.nirfRank}
            </span>
          </div>

          {/* Bookmark Shortlist Button */}
          <button
            type="button"
            onClick={() => toggleSaveCollege(college.id, college.shortName || college.name)}
            className={`position-absolute top-3 end-3 p-2 rounded-circle transition-all duration-300 backdrop-blur-md border-0 z-10 ${
              isSaved
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-105'
                : 'bg-black/50 text-white hover:bg-white hover:text-dark border border-white/20'
            }`}
            title="Shortlist College"
            aria-label="Shortlist College"
          >
            <FiBookmark className="w-4 h-4" />
          </button>

          {/* College Logo & White Title Overlay */}
          <div className="position-absolute bottom-3 start-3 end-3 d-flex items-end gap-3 z-10">
            <img
              src={college.logo}
              alt={college.shortName}
              className="w-11 h-11 rounded-xl bg-white p-1 shadow-md object-contain border border-gray-200 shrink-0"
            />
            <div className="min-w-0">
              <h3 className="font-extrabold text-base text-white mb-0 text-truncate group-hover:text-indigo-300 transition-colors drop-shadow-md">
                {college.name}
              </h3>
              <p className="text-xs text-slate-200 font-semibold d-flex items-center gap-1 mb-0 mt-0.5">
                <FiMapPin className="w-3 h-3 text-indigo-400 shrink-0" />
                <span className="text-truncate">{college.location}, {college.state}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Card Metadata Specifications Grid */}
        <div className="p-4 row g-3 border-bottom border-gray-100 text-xs">
          <div className="col-6">
            <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider d-block">
              Highest Package
            </span>
            <span className="font-black text-emerald-600 text-sm">
              {formatCurrency(college.highestSalary)}
            </span>
          </div>

          <div className="col-6">
            <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider d-block">
              Total Fees
            </span>
            <span className="font-extrabold text-dark text-sm">
              {formatCurrency(college.totalFees)}
            </span>
          </div>

          <div className="col-6">
            <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider d-block">
              Avg Package
            </span>
            <span className="font-bold text-secondary text-sm">
              {formatCurrency(college.avgSalary)}
            </span>
          </div>

          <div className="col-6">
            <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider d-block">
              Rating ({college.reviewCount})
            </span>
            <div className="d-flex items-center gap-1">
              <FiStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-black text-dark text-sm">
                {college.rating}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* MODERN REDESIGNED CARD ACTION BUTTONS (ORDER: COMPARE -> DETAILS -> QUICKSNAPSHOT) */}
      <div className="p-3 bg-slate-50/90 d-flex items-center gap-2 rounded-b-2xl border-top border-gray-100">
        
        {/* 1. COMPARE BUTTON */}
        <button
          type="button"
          onClick={() => (isCompared ? removeFromCompare(college.id) : addToCompare(college))}
          className={`flex-grow-1 d-inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all duration-300 focus:outline-none ${
            isCompared
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30 border border-emerald-600'
              : 'btn-saas-compare'
          }`}
          title={isCompared ? 'Remove from Comparison' : 'Add to Compare Matrix'}
        >
          {isCompared ? (
            <>
              <FiCheck className="w-4 h-4 shrink-0 text-white" />
              <span className="text-white">Compared</span>
            </>
          ) : (
            <>
              <FiBarChart2 className="w-4 h-4 shrink-0" />
              <span>Compare</span>
            </>
          )}
        </button>

        {/* 2. DETAILS BUTTON (GRADIENT CTA) */}
        <Link to={`/colleges/${college.id}`} className="flex-grow-1 text-decoration-none">
          <button
            type="button"
            className="w-100 d-inline-flex items-center justify-center gap-1.5 px-3 py-2.5 btn-saas-primary"
          >
            <span>Details</span>
            <FiArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
          </button>
        </Link>

        {/* 3. QUICK SNAPSHOT BUTTON (PLACED LAST) */}
        {onQuickView && (
          <button
            type="button"
            onClick={() => onQuickView(college)}
            className="p-2.5 bg-white hover:bg-indigo-600 text-slate-700 hover:text-white border border-slate-200 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-xs shrink-0 d-flex items-center justify-center"
            title="Quick Snapshot"
            aria-label="Quick Snapshot"
          >
            <FiEye className="w-4 h-4" />
          </button>
        )}

      </div>
    </div>
  );
};
