import React, { useState, useEffect } from 'react';
import { FiAward, FiCalendar, FiExternalLink, FiSearch, FiCheckCircle, FiDollarSign } from 'react-icons/fi';
import { scholarshipService } from '../services/otherServices';
import { Card } from '../components/ui/Card';

export const ScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    scholarshipService.getScholarships().then((res) => {
      setScholarships(res);
      setLoading(false);
    });
  }, []);

  const filteredScholarships = scholarships.filter((s) => {
    const matchesType = selectedType === 'All' || s.type === selectedType;
    const titleMatch = (s.title || s.name || '').toLowerCase().includes(searchQuery.toLowerCase());
    const providerMatch = (s.provider || '').toLowerCase().includes(searchQuery.toLowerCase());
    const eligibilityMatch = (s.eligibility || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSearch = titleMatch || providerMatch || eligibilityMatch;
    return matchesType && matchesSearch;
  });

  const getTypeBadgeClass = (type) => {
    if (type === 'Government') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
    if (type === 'Private Trust') return 'bg-indigo-50 text-indigo-700 border border-indigo-200';
    if (type === 'Corporate Grant') return 'bg-purple-50 text-purple-700 border border-purple-200';
    if (type === 'Research Fellowship') return 'bg-amber-50 text-amber-800 border border-amber-200';
    return 'bg-rose-50 text-rose-700 border border-rose-200';
  };

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        {/* Header Bar */}
        <div className="d-flex flex-column flex-md-row items-md-center justify-content-between gap-3 pb-3 border-bottom border-gray-200/60">
          <div>
            <div className="d-inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <FiAward className="w-4 h-4 text-indigo-600" />
              <span>Verified Financial Grants 2026</span>
            </div>
            <h1 className="h2 font-black text-dark mb-1">
              Scholarships & Financial Aid 2026
            </h1>
            <p className="text-muted text-xs mb-0 max-w-3xl">
              Explore government fellowships, corporate grants, and merit scholarships for higher education.
            </p>
          </div>

          {/* Quick Search & Filter Controls */}
          <div className="d-flex flex-wrap items-center gap-2">
            <div className="position-relative">
              <input
                type="text"
                placeholder="Search grants or providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-control text-xs font-semibold rounded-xl border-gray-200 py-2.5 ps-8 pe-3 bg-white shadow-xs"
              />
              <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-2.5 text-muted" />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="form-select text-xs font-bold rounded-xl border-gray-200 py-2.5 px-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-white shadow-xs"
            >
              <option value="All">All Category Types</option>
              <option value="Government">Government</option>
              <option value="Private Trust">Private Trust</option>
              <option value="Corporate Grant">Corporate Grant</option>
              <option value="Research Fellowship">Research Fellowship</option>
              <option value="Diversity Grant">Diversity Grant</option>
            </select>
          </div>
        </div>

        {/* Scholarships Grid */}
        <div className="row g-4">
          {filteredScholarships.map((s) => (
            <div key={s.id} className="col-12 col-md-6">
              <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl h-100 d-flex flex-column justify-between space-y-4 saas-card-hover">
                
                <div className="space-y-3">
                  {/* Category Pill & Deadline */}
                  <div className="d-flex items-center justify-between">
                    <span className={`badge text-xs px-3 py-1.5 rounded-pill font-extrabold ${getTypeBadgeClass(s.type)}`}>
                      {s.type}
                    </span>
                    <span className="text-xs text-muted font-semibold d-flex items-center gap-1">
                      <FiCalendar className="text-amber-500" /> Deadline: {s.deadline}
                    </span>
                  </div>

                  {/* Title & Provider */}
                  <div>
                    <h3 className="h5 font-extrabold text-dark mb-1">{s.title || s.name}</h3>
                    <span className="text-xs font-bold text-indigo-600 d-block">{s.provider}</span>
                  </div>

                  {/* HIGH CONTRAST GRANT AMOUNT BANNER */}
                  <div className="p-3.5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl border border-indigo-500/30 shadow-inner">
                    <span className="text-[10px] font-extrabold text-indigo-200 uppercase tracking-wider block mb-0.5 d-flex items-center gap-1">
                      <FiDollarSign className="text-emerald-400" /> GRANT AMOUNT
                    </span>
                    <span className="text-lg font-black text-emerald-400 block drop-shadow-sm">
                      {s.amount ? (s.amount.toString().includes('₹') ? s.amount : `₹${s.amount}`) : 'TBD'}
                    </span>
                  </div>

                  {/* Eligibility & Stream Details */}
                  <div className="space-y-1 pt-1">
                    <p className="text-xs text-slate-700 font-semibold mb-0 leading-relaxed">
                      <strong className="text-dark font-extrabold">Eligibility:</strong> {s.eligibility || 'Open to all eligible students based on criteria.'}
                    </p>
                    <p className="text-[11px] text-muted mb-0">
                      <strong className="text-dark font-bold">Stream:</strong> {s.stream || 'Any Stream'}
                    </p>
                  </div>
                </div>

                {/* Apply CTA Button */}
                <div className="pt-2">
                  <a
                    href={s.applyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-saas-primary w-100 text-xs py-2.5 font-extrabold text-decoration-none d-inline-flex items-center justify-center gap-2 shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <span>Apply on Portal</span>
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
