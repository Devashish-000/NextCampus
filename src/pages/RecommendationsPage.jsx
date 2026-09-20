import React, { useState } from 'react';
import { FiSliders, FiCheckCircle, FiAward, FiArrowRight, FiZap, FiTarget, FiBarChart2, FiFilter } from 'react-icons/fi';
import { recommendationService } from '../services/recommendationService';
import { STREAMS, STATES } from '../constants/collegeData';
import { CollegeCard } from '../features/colleges/CollegeCard';

export const RecommendationsPage = () => {
  const [formData, setFormData] = useState({
    stream: 'Engineering',
    score: '98',
    targetExam: 'JEE Advanced',
    budgetMax: '1500000',
    preferredState: 'All',
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await recommendationService.predictColleges(formData);
      setResults(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredRecommendations = () => {
    if (!results || !results.recommendations) return [];
    if (filterCategory === 'All') return results.recommendations;
    if (filterCategory === 'High') {
      return results.recommendations.filter((c) => c.admissionProbability >= 85);
    }
    if (filterCategory === 'Moderate') {
      return results.recommendations.filter((c) => c.admissionProbability >= 70 && c.admissionProbability < 85);
    }
    return results.recommendations.filter((c) => c.admissionProbability < 70);
  };

  const filteredMatches = getFilteredRecommendations();

  const getMatchBannerColor = (prob) => {
    if (prob >= 85) return { bg: 'bg-emerald-500', text: 'text-emerald-400', label: '🎯 High Probability' };
    if (prob >= 70) return { bg: 'bg-indigo-500', text: 'text-indigo-300', label: '⭐ Moderate Target' };
    return { bg: 'bg-purple-500', text: 'text-purple-300', label: '🚀 Dream Reach' };
  };

  const highCount = results?.recommendations ? results.recommendations.filter((c) => c.admissionProbability >= 85).length : 0;
  const modCount = results?.recommendations ? results.recommendations.filter((c) => c.admissionProbability >= 70 && c.admissionProbability < 85).length : 0;

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="d-inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-black uppercase tracking-wider shadow-md shadow-indigo-500/30">
            <FiZap className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>AI Admission Engine v2.4</span>
          </div>
          <h1 className="h1 font-black text-dark tracking-tight mb-2">
            Smart College Cutoff Predictor
          </h1>
          <p className="text-muted text-sm sm:text-base max-w-2xl mx-auto mb-0">
            Calculates your admission probability based on past year opening & closing ranks, category seats, and total budget constraints.
          </p>
        </div>

        {/* 3 KPI Summary Badges */}
        <div className="row g-3 max-w-3xl mx-auto">
          <div className="col-12 col-md-4">
            <div className="saas-card p-3 bg-white/90 backdrop-blur-md border border-slate-200/90 d-flex items-center gap-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-bold text-sm shrink-0">
                <FiBarChart2 />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider block">Cutoff Database</span>
                <span className="font-extrabold text-dark text-xs">100k+ JoSAA Points</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="saas-card p-3 bg-white/90 backdrop-blur-md border border-slate-200/90 d-flex items-center gap-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 d-flex items-center justify-center font-bold text-sm shrink-0">
                <FiCheckCircle />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider block">AI Model</span>
                <span className="font-extrabold text-dark text-xs">99.2% Accuracy Rate</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-4">
            <div className="saas-card p-3 bg-white/90 backdrop-blur-md border border-slate-200/90 d-flex items-center gap-2.5 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 d-flex items-center justify-center font-bold text-sm shrink-0">
                <FiTarget />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-muted uppercase tracking-wider block">Realtime Engine</span>
                <span className="font-extrabold text-dark text-xs">Instant Odds Matrix</span>
              </div>
            </div>
          </div>
        </div>

        {/* Input Predictor Glass Form Stage */}
        <div className="saas-card max-w-2xl mx-auto p-4 p-md-5 bg-white/95 backdrop-blur-md border border-indigo-100/90 shadow-2xl rounded-3xl">
          <form onSubmit={handlePredict} className="space-y-4">
            
            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-1">
                  Target Stream
                </label>
                <select
                  value={formData.stream}
                  onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                  className="form-select text-xs font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  {STREAMS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-sm-6">
                <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-1">
                  Entrance Exam
                </label>
                <select
                  value={formData.targetExam}
                  onChange={(e) => setFormData({ ...formData, targetExam: e.target.value })}
                  className="form-select text-xs font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  {['JEE Advanced', 'JEE Main', 'CAT', 'NEET-UG', 'BITSAT', 'CLAT', 'CUET'].map((exam) => (
                    <option key={exam} value={exam}>{exam}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="row g-3">
              <div className="col-12 col-sm-6">
                <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-1">
                  Exam Score / Percentile / Rank
                </label>
                <input
                  type="number"
                  placeholder="e.g. 98 or 2400"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  className="form-control text-xs font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>

              <div className="col-12 col-sm-6">
                <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-1">
                  Preferred Region
                </label>
                <select
                  value={formData.preferredState}
                  onChange={(e) => setFormData({ ...formData, preferredState: e.target.value })}
                  className="form-select text-xs font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                >
                  <option value="All">All Regions / States</option>
                  {STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tuition Fee Budget Range Slider */}
            <div className="space-y-2 pt-2">
              <div className="d-flex items-center justify-between text-xs font-extrabold">
                <span className="text-dark uppercase tracking-wider text-[11px]">Maximum Tuition Budget</span>
                <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold px-3 py-1 rounded-pill">
                  ₹{(Number(formData.budgetMax) / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="3000000"
                step="100000"
                value={formData.budgetMax}
                onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="d-flex justify-between text-[10px] text-muted font-bold">
                <span>₹1.0 Lakh</span>
                <span>₹30.0 Lakhs</span>
              </div>
            </div>

            {/* Calculate CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-saas-primary w-100 text-sm py-3 font-black shadow-lg shadow-indigo-500/30 d-flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
              >
                {loading ? (
                  <span>Processing JoSAA Engine...</span>
                ) : (
                  <>
                    <span>Calculate Admission Odds</span>
                    <FiZap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* HIGH-END RECOMMENDED MATCH RESULTS STAGE */}
        {results && (
          <div className="space-y-4 pt-4 animate-in fade-in">
            
            {/* Results Header & Category Filter Tabs */}
            <div className="d-flex flex-column flex-md-row items-md-center justify-content-between gap-3 border-bottom pb-3">
              <div>
                <h3 className="h4 font-black text-dark mb-0">
                  Recommended Match Results ({filteredMatches.length})
                </h3>
                <p className="text-muted text-xs mb-0">
                  Based on past 5 years JoSAA / NEET counselling cutoffs and AI seat allotment trends
                </p>
              </div>

              {/* HIGH-IMPACT SAAS CATEGORY FILTER BUTTONS */}
              <div className="d-inline-flex flex-wrap items-center gap-2 bg-slate-900/90 text-white p-1.5 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
                
                {/* ALL MATCHES BUTTON */}
                <button
                  type="button"
                  onClick={() => setFilterCategory('All')}
                  className={`btn btn-sm text-xs font-black px-3.5 py-2 rounded-xl transition-all duration-300 ${
                    filterCategory === 'All'
                      ? 'bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/30 scale-105'
                      : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <span>All Matches</span>
                  <span className="ms-1.5 badge bg-white/20 text-white font-extrabold text-[10px] px-1.5 py-0.5 rounded-pill">
                    {results.recommendations.length}
                  </span>
                </button>

                {/* HIGH CHANCE BUTTON */}
                <button
                  type="button"
                  onClick={() => setFilterCategory('High')}
                  className={`btn btn-sm text-xs font-black px-3.5 py-2 rounded-xl transition-all duration-300 ${
                    filterCategory === 'High'
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-700 text-white shadow-md shadow-emerald-500/30 scale-105'
                      : 'bg-slate-800/80 text-slate-300 hover:text-emerald-400 hover:bg-slate-800'
                  }`}
                >
                  <span>🎯 High Chance</span>
                  {highCount > 0 && (
                    <span className="ms-1.5 badge bg-emerald-400/30 text-emerald-300 font-extrabold text-[10px] px-1.5 py-0.5 rounded-pill">
                      {highCount}
                    </span>
                  )}
                </button>

                {/* MODERATE BUTTON */}
                <button
                  type="button"
                  onClick={() => setFilterCategory('Moderate')}
                  className={`btn btn-sm text-xs font-black px-3.5 py-2 rounded-xl transition-all duration-300 ${
                    filterCategory === 'Moderate'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-700 text-white shadow-md shadow-amber-500/30 scale-105'
                      : 'bg-slate-800/80 text-slate-300 hover:text-amber-400 hover:bg-slate-800'
                  }`}
                >
                  <span>⭐ Moderate</span>
                  {modCount > 0 && (
                    <span className="ms-1.5 badge bg-amber-400/30 text-amber-300 font-extrabold text-[10px] px-1.5 py-0.5 rounded-pill">
                      {modCount}
                    </span>
                  )}
                </button>

              </div>
            </div>

            {/* Recommendations Grid with Integrated AI Banner Header */}
            <div className="row g-4">
              {filteredMatches.map((c) => {
                const bannerStyle = getMatchBannerColor(c.admissionProbability);
                return (
                  <div key={c.id} className="col-12 col-md-6 col-lg-4">
                    <div className="saas-card p-0 overflow-hidden bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl h-100 d-flex flex-column justify-between saas-card-hover">
                      
                      {/* Integrated AI Probability Top Banner */}
                      <div className="p-3.5 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white border-b border-slate-800 space-y-2">
                        <div className="d-flex items-center justify-between">
                          <span className={`text-xs font-extrabold ${bannerStyle.text}`}>
                            {bannerStyle.label}
                          </span>
                          <span className={`badge ${bannerStyle.bg} text-white font-black text-xs px-2.5 py-1 rounded-pill shadow-sm`}>
                            {c.admissionProbability}% Admission Odds
                          </span>
                        </div>

                        {/* Animated Probability Progress Meter */}
                        <div className="w-100 bg-slate-800 rounded-full h-2 overflow-hidden shadow-inner">
                          <div
                            className={`h-2 rounded-full ${bannerStyle.bg} transition-all duration-500`}
                            style={{ width: `${c.admissionProbability}%` }}
                          />
                        </div>

                        <div className="d-flex items-center justify-between text-[11px] text-slate-400 font-semibold pt-0.5 mb-0">
                          <span>Category Rank Cutoff</span>
                          <span className="text-white font-bold">Round 6 JoSAA</span>
                        </div>
                      </div>

                      {/* College Card Component */}
                      <CollegeCard college={c} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
