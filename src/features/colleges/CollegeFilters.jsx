import React from 'react';
import { FiSearch, FiRotateCcw, FiFilter, FiDollarSign, FiStar, FiMapPin, FiBookOpen } from 'react-icons/fi';
import { STREAMS, STATES, SORT_OPTIONS } from '../../constants/collegeData';
import { Input } from '../../components/forms/Input';
import { Select } from '../../components/forms/Select';
import { Button } from '../../components/ui/Button';

export const CollegeFilters = ({ filters, onChange, onReset }) => {
  return (
    <div className="saas-card bg-white/95 backdrop-blur-md border border-indigo-100/90 rounded-3xl p-4 p-md-5 space-y-5 sticky top-24 shadow-xl">
      
      {/* Header */}
      <div className="d-flex items-center justify-between border-bottom border-gray-100 pb-3">
        <div className="d-flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-bold">
            <FiFilter className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-dark text-base">Filter Colleges</span>
        </div>
        <button
          onClick={onReset}
          className="btn btn-link btn-sm text-xs font-bold text-indigo-600 hover:text-indigo-700 text-decoration-none p-0 d-flex items-center gap-1 group"
        >
          <FiRotateCcw className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-180" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-1.5">
        <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-0 d-flex items-center gap-1.5">
          <FiSearch className="text-indigo-600" /> Search College / City
        </label>
        <div className="position-relative">
          <input
            type="text"
            placeholder="e.g. IIT Bombay, Delhi..."
            value={filters.search || ''}
            onChange={(e) => onChange('search', e.target.value)}
            className="form-control text-xs font-semibold rounded-xl border-gray-200 py-2.5 ps-3 pe-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      {/* Stream Filter */}
      <div className="space-y-1.5">
        <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-0 d-flex items-center gap-1.5">
          <FiBookOpen className="text-indigo-600" /> Academic Stream
        </label>
        <select
          value={filters.stream || 'All'}
          onChange={(e) => onChange('stream', e.target.value)}
          className="form-select text-xs font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="All">All Streams</option>
          {STREAMS.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* State Filter */}
      <div className="space-y-1.5">
        <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-0 d-flex items-center gap-1.5">
          <FiMapPin className="text-indigo-600" /> State / Region
        </label>
        <select
          value={filters.state || 'All'}
          onChange={(e) => onChange('state', e.target.value)}
          className="form-select text-xs font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="All">All States / Regions</option>
          {STATES.map((st) => (
            <option key={st} value={st}>
              {st}
            </option>
          ))}
        </select>
      </div>

      {/* Fees Slider */}
      <div className="space-y-2 pt-1">
        <div className="d-flex items-center justify-between text-xs font-extrabold">
          <span className="text-dark uppercase tracking-wider text-[11px] d-flex items-center gap-1">
            <FiDollarSign className="text-emerald-600" /> Max Total Fees
          </span>
          <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold px-2.5 py-1 rounded-pill text-[11px]">
            ₹{((filters.maxFees || 3000000) / 100000).toFixed(1)} Lakhs
          </span>
        </div>
        <input
          type="range"
          min="100000"
          max="3000000"
          step="100000"
          value={filters.maxFees || 3000000}
          onChange={(e) => onChange('maxFees', e.target.value)}
          className="w-full accent-indigo-600 cursor-pointer"
        />
        <div className="d-flex justify-between text-[10px] text-muted font-bold">
          <span>₹1 Lakh</span>
          <span>₹30 Lakhs</span>
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-1.5">
        <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-0 d-flex items-center gap-1.5">
          <FiStar className="text-amber-500 fill-amber-500" /> Minimum Rating
        </label>
        <select
          value={filters.minRating || '0'}
          onChange={(e) => onChange('minRating', e.target.value)}
          className="form-select text-xs font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="0">All Ratings</option>
          <option value="4.5">4.5+ Star Ratings</option>
          <option value="4.0">4.0+ Star Ratings</option>
          <option value="3.5">3.5+ Star Ratings</option>
        </select>
      </div>

      {/* Sort By */}
      <div className="space-y-1.5">
        <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-0">
          Sort Results By
        </label>
        <select
          value={filters.sortBy || 'popularity_desc'}
          onChange={(e) => onChange('sortBy', e.target.value)}
          className="form-select text-xs font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
};
