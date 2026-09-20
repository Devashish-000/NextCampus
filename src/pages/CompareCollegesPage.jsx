import React from 'react';
import { Link } from 'react-router-dom';
import { useComparison } from '../context/ComparisonContext';
import { formatCurrency } from '../utils/formatters';
import { FiBarChart2, FiX, FiPlus, FiArrowRight, FiTrash2, FiAward, FiDollarSign } from 'react-icons/fi';
import { ROUTES } from '../constants/routes';
import { ALL_MOCK_COLLEGES } from '../mocks/collegesData';

export const CompareCollegesPage = () => {
  const { comparedColleges, addToCompare, removeFromCompare, clearComparison } = useComparison();

  // Preset comparisons for instant 1-click loading
  const loadPresetComparison = (ids) => {
    clearComparison();
    ids.forEach((id) => {
      const found = ALL_MOCK_COLLEGES.find((c) => c.id === id);
      if (found) addToCompare(found);
    });
  };

  // Best metric winners computation
  const maxHighestSalary = Math.max(...comparedColleges.map((c) => c.highestSalary || 0));
  const minTotalFees = Math.min(...comparedColleges.map((c) => c.totalFees || Infinity));

  if (comparedColleges.length === 0) {
    return (
      <div className="w-100 min-vh-100 bg-tech-grid py-4">
        <div className="container px-3 px-md-5 space-y-5">
          
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="d-inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <FiBarChart2 className="w-4 h-4 text-indigo-600" />
              <span>Multi-University Matrix Audit</span>
            </div>
            <h1 className="h2 font-black text-dark mb-1">
              Side-by-Side College Comparison
            </h1>
            <p className="text-muted text-xs mb-0">
              Add up to 4 colleges to compare NIRF rank, fees, placements, cutoff, and accreditation side-by-side.
            </p>
          </div>

          {/* Empty State Glass Container */}
          <div className="saas-card p-5 p-md-6 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl rounded-3xl text-center max-w-2xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-black text-2xl mx-auto shadow-md border border-indigo-200/60">
              <FiBarChart2 />
            </div>
            <div className="space-y-1">
              <h3 className="h5 font-extrabold text-dark mb-1">No Colleges Selected for Comparison</h3>
              <p className="text-muted text-xs max-w-md mx-auto mb-0">
                You can add colleges directly from the Colleges Directory or choose one of our popular quick-compare presets below.
              </p>
            </div>

            <div className="pt-2">
              <Link to={ROUTES.COLLEGES} className="btn btn-saas-primary text-xs px-4 py-2.5 font-extrabold text-decoration-none d-inline-flex items-center gap-2 shadow-md">
                <span>Explore Colleges Directory</span>
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Popular Quick Compare Presets */}
          <div className="max-w-2xl mx-auto space-y-3 pt-3">
            <h4 className="text-xs font-extrabold text-muted uppercase tracking-wider text-center">
              ⚡ Popular Quick-Compare Presets
            </h4>
            <div className="d-flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => loadPresetComparison(['clg-1', 'clg-2'])}
                className="btn btn-sm btn-saas-compare text-xs font-bold px-3 py-2"
              >
                IIT Bombay vs IIT Delhi
              </button>
              <button
                type="button"
                onClick={() => loadPresetComparison(['clg-3', 'clg-6'])}
                className="btn btn-sm btn-saas-compare text-xs font-bold px-3 py-2"
              >
                IIM Ahmedabad vs BITS Pilani
              </button>
              <button
                type="button"
                onClick={() => loadPresetComparison(['clg-1', 'clg-5', 'clg-6'])}
                className="btn btn-sm btn-saas-compare text-xs font-bold px-3 py-2"
              >
                Top 3 Engineering Triple Matrix
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  const colWidthPercent = 78 / comparedColleges.length;

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container-fluid px-3 px-md-5 space-y-4">
        
        {/* Page Action Bar with Improved Clear Matrix Button */}
        <div className="d-flex flex-column flex-md-row items-md-center justify-content-between gap-3 pb-2 border-bottom border-gray-200/60">
          <div>
            <div className="d-inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-extrabold uppercase tracking-wider mb-2">
              <FiBarChart2 className="w-4 h-4 text-indigo-600" />
              <span>ACTIVE COMPARISON TRAY ({comparedColleges.length} / 4)</span>
            </div>
            <h1 className="h2 font-black text-dark mb-1">
              Side-by-Side College Comparison
            </h1>
            <p className="text-muted text-xs mb-0">
              Comparing {comparedColleges.length} institutes across placement ROI, NIRF ranks, tuition budgets, and cutoff benchmarks.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="d-flex items-center gap-2">
            <Link to={ROUTES.COLLEGES} className="btn btn-saas-primary text-xs font-black px-4 py-2.5 text-decoration-none d-inline-flex items-center gap-1.5 shadow-md hover:scale-105 transition-all">
              <FiPlus className="w-4 h-4" />
              <span>Add College</span>
            </Link>
            
            {/* UPGRADED CLEAR MATRIX BUTTON */}
            <button
              type="button"
              onClick={clearComparison}
              className="btn btn-sm text-xs font-extrabold px-3.5 py-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-200 transition-all shadow-xs d-inline-flex items-center gap-1.5"
            >
              <FiTrash2 className="w-3.5 h-3.5" />
              <span>Clear Matrix</span>
            </button>
          </div>
        </div>

        {/* High-End Glass Comparison Matrix Stage with Equal Columns */}
        <div className="saas-card p-0 overflow-hidden bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl rounded-3xl">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-sm" style={{ tableLayout: 'fixed', width: '100%' }}>
              
              {/* Header Row with Integrated College Photo Banner Cards */}
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-4 bg-slate-950 text-slate-300 uppercase font-black text-xs border-end border-slate-800" style={{ width: '22%' }}>
                    METRIC / SPEC
                  </th>
                  {comparedColleges.map((c) => (
                    <th key={c.id} className="py-4 px-4 text-center border-end border-slate-800 bg-slate-900 p-3" style={{ width: `${colWidthPercent}%` }}>
                      
                      {/* Integrated Glass Cover Banner Card */}
                      <div className="position-relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-800 shadow-lg text-start" style={{ height: '140px' }}>
                        
                        {/* Remove Close Button */}
                        <button
                          type="button"
                          onClick={() => removeFromCompare(c.id)}
                          className="position-absolute top-2 end-2 p-1.5 text-slate-300 hover:text-white rounded-circle bg-slate-900/80 hover:bg-rose-600 transition-all border border-slate-700 z-20"
                          title="Remove from Matrix"
                        >
                          <FiX className="w-3.5 h-3.5" />
                        </button>

                        <img
                          src={c.image}
                          alt={c.name}
                          className="w-100 h-100 object-cover opacity-60"
                        />
                        <div className="position-absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-black/30 pointer-events-none" />
                        
                        {/* Floating Content Over Banner */}
                        <div className="position-absolute bottom-3 start-3 end-3 z-10 space-y-1">
                          <div className="d-flex items-center gap-2">
                            <img
                              src={c.logo}
                              alt={c.shortName}
                              className="w-9 h-9 rounded-xl bg-white p-1 shadow-md object-contain border border-gray-200 shrink-0"
                            />
                            <div className="overflow-hidden">
                              <h4 className="font-extrabold text-white text-sm mb-0 truncate drop-shadow-md">
                                {c.shortName || c.name}
                              </h4>
                              <span className="text-[11px] text-indigo-300 font-semibold block truncate">
                                {c.location}, {c.state}
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>

                    </th>
                  ))}
                </tr>
              </thead>

              {/* Matrix Specifications Comparison Rows */}
              <tbody className="divide-y divide-gray-100">
                
                {/* NIRF Rank */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 bg-slate-50 font-extrabold text-dark text-xs uppercase tracking-wider border-end">
                    NIRF RANK
                  </td>
                  {comparedColleges.map((c) => (
                    <td key={c.id} className="py-3.5 px-4 text-center border-end">
                      <span className="badge bg-indigo-600 text-white font-black text-xs px-3.5 py-1.5 rounded-pill shadow-sm">
                        NIRF #{c.nirfRank}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Highest Salary */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 bg-slate-50 font-extrabold text-dark text-xs uppercase tracking-wider border-end">
                    HIGHEST PACKAGE
                  </td>
                  {comparedColleges.map((c) => {
                    const isWinner = c.highestSalary === maxHighestSalary && maxHighestSalary > 0;
                    return (
                      <td key={c.id} className="py-3.5 px-4 text-center border-end">
                        <span className="font-black text-emerald-600 text-base d-block">
                          {formatCurrency(c.highestSalary)}
                        </span>
                        {isWinner && (
                          <span className="badge bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-pill shadow-xs mt-1">
                            👑 Best Placement
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Average Salary */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 bg-slate-50 font-extrabold text-dark text-xs uppercase tracking-wider border-end">
                    AVERAGE PACKAGE
                  </td>
                  {comparedColleges.map((c) => (
                    <td key={c.id} className="py-3.5 px-4 text-center border-end">
                      <span className="font-extrabold text-dark text-sm">
                        {formatCurrency(c.avgSalary)}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Total Tuition Fees */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 bg-slate-50 font-extrabold text-dark text-xs uppercase tracking-wider border-end">
                    TOTAL TUITION FEES
                  </td>
                  {comparedColleges.map((c) => {
                    const isBestValue = c.totalFees === minTotalFees;
                    return (
                      <td key={c.id} className="py-3.5 px-4 text-center border-end">
                        <span className="font-bold text-slate-700 text-sm d-block">
                          {formatCurrency(c.totalFees)}
                        </span>
                        {isBestValue && (
                          <span className="badge bg-indigo-500 text-white text-[10px] font-black px-2 py-0.5 rounded-pill shadow-xs mt-1">
                            💰 Best Value
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Cutoff Exam */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 bg-slate-50 font-extrabold text-dark text-xs uppercase tracking-wider border-end">
                    CUTOFF EXAM & PERCENTILE
                  </td>
                  {comparedColleges.map((c) => (
                    <td key={c.id} className="py-3.5 px-4 text-center border-end">
                      <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold text-xs px-2.5 py-1 rounded-pill">
                        {c.cutoffExam || 'JEE Main'}
                      </span>
                      <span className="text-xs font-bold text-dark block mt-1">
                        {c.cutoffMinPercentile || 95}%ile Cutoff
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 bg-slate-50 font-extrabold text-dark text-xs uppercase tracking-wider border-end">
                    USER STAR RATING
                  </td>
                  {comparedColleges.map((c) => (
                    <td key={c.id} className="py-3.5 px-4 text-center border-end">
                      <span className="font-black text-amber-500 text-sm">
                        ★ {c.rating} / 5
                      </span>
                      <span className="text-xs text-muted block font-semibold">({c.reviewCount} reviews)</span>
                    </td>
                  ))}
                </tr>

                {/* Accreditation */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 bg-slate-50 font-extrabold text-dark text-xs uppercase tracking-wider border-end">
                    ACCREDITATION
                  </td>
                  {comparedColleges.map((c) => (
                    <td key={c.id} className="py-3.5 px-4 text-center border-end">
                      <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-xs px-2.5 py-1 rounded-pill">
                        {c.accreditation || 'NAAC A++'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Action CTA Row (FIXED WHITE TEXT BUG) */}
                <tr className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4 bg-slate-50 font-extrabold text-dark text-xs uppercase tracking-wider border-end">
                    ACTION
                  </td>
                  {comparedColleges.map((c) => (
                    <td key={c.id} className="py-4 px-4 text-center border-end">
                      <Link
                        to={`/colleges/${c.id}`}
                        className="btn btn-sm btn-saas-primary text-xs font-black px-4 py-2 text-decoration-none d-inline-flex items-center gap-1.5 shadow-md hover:scale-105 transition-all"
                      >
                        <span>Full Profile</span>
                        <FiArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  ))}
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
