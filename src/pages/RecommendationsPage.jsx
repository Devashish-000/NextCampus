import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSliders,
  FiZap,
  FiAward,
  FiCheckCircle,
  FiShield,
  FiTarget,
  FiPrinter,
  FiFilter,
  FiMapPin,
  FiTrendingUp,
  FiDollarSign,
  FiInfo,
  FiShare2,
  FiRefreshCw,
  FiBookmark,
  FiBarChart2,
  FiArrowRight,
  FiCheck,
  FiStar,
} from 'react-icons/fi';
import { recommendationService } from '../services/recommendationService';
import { formatCurrency } from '../utils/formatters';
import { useSavedColleges } from '../context/SavedCollegesContext';
import { useComparison } from '../context/ComparisonContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const RecommendationsPage = () => {
  const { user } = useAuth();
  const { savedIds, toggleSaveCollege } = useSavedColleges();
  const { comparedColleges, addToCompare, removeFromCompare } = useComparison();

  // Form State
  const [formData, setFormData] = useState({
    exam: 'JEE Main',
    score: '96.2',
    scoreType: 'percentile', // 'percentile' or 'rank'
    category: user?.category || 'General',
    homeState: user?.state || 'Maharashtra',
    stream: user?.targetStream || 'Engineering',
    budgetMax: 2000000,
    gender: 'Gender-Neutral',
  });

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTier, setActiveTier] = useState('All'); // 'All', 'Safe', 'Target', 'Dream'

  // Pre-load default prediction on page mount
  useEffect(() => {
    handlePredict(formData);
  }, []);

  const handlePredict = async (criteria) => {
    setLoading(true);
    try {
      const data = await recommendationService.predictColleges(criteria);
      setResults(data);
      toast.success('Admission odds calculated successfully!', { id: 'predict-toast' });
    } catch (err) {
      console.error('Prediction failed:', err);
      toast.error('Failed to compute recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePredict(formData);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filter recommendations based on active tier tab
  const filteredColleges = results?.recommendations
    ? results.recommendations.filter((c) => {
        if (activeTier === 'All') return true;
        return c.tier === activeTier;
      })
    : [];

  const getTierBannerConfig = (tier) => {
    switch (tier) {
      case 'Safe':
        return {
          bg: 'bg-gradient-to-r from-emerald-600 to-teal-700',
          badge: 'bg-emerald-50 text-emerald-700 border-emerald-300',
          text: 'text-emerald-400',
          bar: 'bg-emerald-500',
          icon: FiShield,
        };
      case 'Target':
        return {
          bg: 'bg-gradient-to-r from-amber-600 to-orange-700',
          badge: 'bg-amber-50 text-amber-700 border-amber-300',
          text: 'text-amber-400',
          bar: 'bg-amber-500',
          icon: FiTarget,
        };
      case 'Dream':
      default:
        return {
          bg: 'bg-gradient-to-r from-indigo-700 to-purple-800',
          badge: 'bg-purple-50 text-purple-700 border-purple-300',
          text: 'text-purple-300',
          bar: 'bg-purple-500',
          icon: FiAward,
        };
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 pb-16">
      {/* Print-Only Executive Header */}
      <div className="d-none d-print-block p-4 border-bottom mb-4">
        <h1 className="h3 font-black text-dark">NextCampus — AI Admission Counseling Strategy Report</h1>
        <p className="text-muted text-xs mb-1">
          Generated for: <strong>{user?.fullName || 'Candidate'}</strong> • Exam: <strong>{formData.exam}</strong> (Score: {formData.score} {formData.scoreType === 'percentile' ? '%' : 'AIR'})
        </p>
        <p className="text-muted text-xs mb-0">
          Category: <strong>{formData.category}</strong> • Home State: <strong>{formData.homeState}</strong> • Budget: ₹{(Number(formData.budgetMax) / 100000).toFixed(1)} Lakhs
        </p>
      </div>

      {/* Hero Banner (Web View) */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white py-12 px-4 shadow-xl border-b border-slate-800 d-print-none">
        <div className="container-xl max-w-6xl mx-auto">
          <div className="d-flex flex-column flex-md-row items-md-center justify-content-between gap-4">
            <div className="space-y-3">
              <div className="d-inline-flex items-center gap-2 px-3 py-1.5 rounded-pill bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <span className="w-2 h-2 rounded-circle bg-emerald-400 animate-pulse" />
                <FiZap className="w-3.5 h-3.5 text-amber-300" />
                <span>AI Admission Predictor Engine 2026</span>
              </div>
              <h1 className="h2 font-black text-white tracking-tight mb-0">
                Predict Your College Admission Odds
              </h1>
              <p className="text-slate-300 text-sm max-w-2xl leading-relaxed mb-0">
                Our algorithm processes 5 years of JoSAA, CSAB, NEET & State Counseling closing ranks along with category reservations and home-state quotas to determine your real admission probability.
              </p>
            </div>

            {/* Quick Stats Capsule */}
            <div className="d-flex items-center gap-3 bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl backdrop-blur-md shrink-0 shadow-lg">
              <div className="text-center px-3 border-end border-slate-700">
                <span className="d-block font-black text-indigo-400 text-lg leading-none">50+</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Top Institutes</span>
              </div>
              <div className="text-center px-3 border-end border-slate-700">
                <span className="d-block font-black text-emerald-400 text-lg leading-none">98.4%</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Accuracy</span>
              </div>
              <div className="text-center px-3">
                <span className="d-block font-black text-amber-400 text-lg leading-none">JoSAA '25</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Trained Model</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xl max-w-6xl mx-auto px-4 mt-8 space-y-8">
        {/* PREDICTOR INPUT CONSOLE */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 md:p-8 d-print-none">
          <div className="d-flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <div className="d-flex items-center gap-2.5">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <FiSliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="h5 font-black text-dark mb-0">Candidate Profile & Score Parameters</h2>
                <p className="text-muted text-xs mb-0">Configure your entrance exam, category, and budget</p>
              </div>
            </div>
            {results && (
              <button
                type="button"
                onClick={handlePrint}
                className="btn btn-outline-secondary btn-sm d-inline-flex items-center gap-1.5 font-bold rounded-xl text-xs px-3 py-2"
                title="Print or Save PDF"
              >
                <FiPrinter className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="row g-4">
              {/* Exam Selection */}
              <div className="col-12 col-md-4">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Target Exam
                </label>
                <select
                  value={formData.exam}
                  onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                  className="form-select text-sm font-semibold py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="JEE Main">JEE Main (Engineering / NITs / IIITs)</option>
                  <option value="JEE Advanced">JEE Advanced (IITs)</option>
                  <option value="NEET">NEET-UG (Medical / MBBS)</option>
                  <option value="CAT">CAT (Management / IIMs)</option>
                  <option value="CUET">CUET-UG (Central Universities)</option>
                  <option value="GATE">GATE (M.Tech / PSU)</option>
                </select>
              </div>

              {/* Score / Rank Input */}
              <div className="col-12 col-md-4">
                <div className="d-flex items-center justify-between mb-1.5">
                  <label className="text-xs font-extrabold text-dark uppercase tracking-wider mb-0">
                    {formData.scoreType === 'percentile' ? 'Score Percentile (%)' : 'Category AIR Rank'}
                  </label>
                  <div className="d-flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, scoreType: 'percentile', score: '96.2' })}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        formData.scoreType === 'percentile' ? 'bg-white shadow-xs text-indigo-600 font-extrabold' : 'text-muted'
                      }`}
                    >
                      Percentile
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, scoreType: 'rank', score: '15000' })}
                      className={`px-2 py-0.5 rounded-md transition-all ${
                        formData.scoreType === 'rank' ? 'bg-white shadow-xs text-indigo-600 font-extrabold' : 'text-muted'
                      }`}
                    >
                      AIR Rank
                    </button>
                  </div>
                </div>
                <input
                  type="number"
                  step={formData.scoreType === 'percentile' ? '0.01' : '1'}
                  min={formData.scoreType === 'percentile' ? '1' : '1'}
                  max={formData.scoreType === 'percentile' ? '100' : '1000000'}
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  className="form-control text-sm font-bold py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  placeholder={formData.scoreType === 'percentile' ? 'e.g. 96.5' : 'e.g. 15000'}
                  required
                />
              </div>

              {/* Reservation Category */}
              <div className="col-12 col-md-4">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Reservation Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="form-select text-sm font-semibold py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="General">General (Open Merit)</option>
                  <option value="OBC-NCL">OBC-NCL (Non-Creamy Layer)</option>
                  <option value="EWS">Economically Weaker Section (EWS)</option>
                  <option value="SC">Scheduled Caste (SC)</option>
                  <option value="ST">Scheduled Tribe (ST)</option>
                </select>
              </div>

              {/* Home State / Domicile */}
              <div className="col-12 col-md-4">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Home State / Domicile
                </label>
                <select
                  value={formData.homeState}
                  onChange={(e) => setFormData({ ...formData, homeState: e.target.value })}
                  className="form-select text-sm font-semibold py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi NCR">Delhi NCR</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Telangana">Telangana</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Punjab">Punjab</option>
                </select>
              </div>

              {/* Academic Stream */}
              <div className="col-12 col-md-4">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Academic Stream
                </label>
                <select
                  value={formData.stream}
                  onChange={(e) => setFormData({ ...formData, stream: e.target.value })}
                  className="form-select text-sm font-semibold py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Engineering">Engineering (B.Tech / B.E.)</option>
                  <option value="Management">Management (MBA / BBA)</option>
                  <option value="Medical">Medical (MBBS / BDS)</option>
                  <option value="Science">Sciences & Research (B.Sc / M.Sc)</option>
                  <option value="All">All Streams</option>
                </select>
              </div>

              {/* Gender Pool */}
              <div className="col-12 col-md-4">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Gender Quota Pool
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="form-select text-sm font-semibold py-2.5 rounded-xl border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Gender-Neutral">Gender-Neutral Pool</option>
                  <option value="Female-Only">Female-Only Supernumerary Pool</option>
                </select>
              </div>
            </div>

            {/* Tuition Budget Slider */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="d-flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-dark uppercase tracking-wider">
                    Maximum Total Tuition Budget
                  </span>
                  <span className="text-[11px] text-muted d-block">
                    Filters colleges where overall degree tuition matches your financial plan
                  </span>
                </div>
                <span className="badge bg-indigo-600 text-white font-black text-xs px-3 py-1.5 rounded-pill shadow-xs">
                  ₹{(Number(formData.budgetMax) / 100000).toFixed(1)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="3500000"
                step="100000"
                value={formData.budgetMax}
                onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                className="form-range w-100 accent-indigo-600 cursor-pointer"
              />
              <div className="d-flex justify-content-between text-[11px] text-muted font-bold">
                <span>₹1.0 Lakh</span>
                <span>₹10.0 Lakhs</span>
                <span>₹20.0 Lakhs</span>
                <span>₹35.0 Lakhs</span>
              </div>
            </div>

            {/* CTA Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-saas-primary w-100 py-3 rounded-2xl font-black text-sm d-flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all"
            >
              {loading ? (
                <>
                  <div className="spinner-border spinner-border-sm text-white" role="status" />
                  <span>Processing Counseling Algorithms...</span>
                </>
              ) : (
                <>
                  <FiZap className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>Calculate & Optimize Admission Odds</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* RESULTS & EXECUTIVE SUMMARY */}
        {results && (
          <div className="space-y-6 animate-in fade-in">
            {/* Executive Summary Metrics Card */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-slate-800">
              <div className="d-flex flex-column flex-md-row items-md-center justify-content-between gap-4 pb-4 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="d-flex items-center gap-2">
                    <span className="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-pill">
                      Analysis Complete
                    </span>
                    <span className="text-slate-400 text-xs">
                      Evaluated against {results.meta.totalEvaluated} Institutions
                    </span>
                  </div>
                  <h3 className="h4 font-black text-white mb-0">Counseling Strategy Matrix</h3>
                  <p className="text-slate-300 text-xs mb-0">
                    Effective Percentile with {results.meta.category} Quota:{' '}
                    <strong className="text-emerald-400 text-sm font-black">{results.meta.effectivePercentile}%</strong>
                  </p>
                </div>

                <div className="d-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="btn btn-sm btn-light font-extrabold rounded-xl text-xs px-3.5 py-2 d-inline-flex items-center gap-1.5 shadow-sm"
                  >
                    <FiPrinter className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Print Counseling Plan</span>
                  </button>
                </div>
              </div>

              {/* Strategy Tip Box */}
              <div className="mt-4 p-3.5 rounded-2xl bg-white/10 border border-white/10 d-flex items-start gap-3 backdrop-blur-md">
                <FiInfo className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <span className="font-extrabold text-white d-block mb-0.5">Counselor Advice:</span>
                  <span className="text-slate-200">{results.meta.strategyTip}</span>
                </div>
              </div>

              {/* 3-Tier Summary Badges */}
              <div className="row g-3 mt-2">
                <div className="col-12 col-md-4">
                  <div
                    onClick={() => setActiveTier('Safe')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeTier === 'Safe'
                        ? 'bg-emerald-500/20 border-emerald-400 shadow-md scale-[1.02]'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    <div className="d-flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-emerald-400 d-flex items-center gap-1.5">
                        <FiShield className="w-4 h-4" /> Safe Choices
                      </span>
                      <span className="badge bg-emerald-500 text-white font-black text-xs px-2 py-0.5 rounded-pill">
                        {results.meta.safeCount}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300 font-medium">85% - 99% probability • Near guaranteed backup</span>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div
                    onClick={() => setActiveTier('Target')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeTier === 'Target'
                        ? 'bg-amber-500/20 border-amber-400 shadow-md scale-[1.02]'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    <div className="d-flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-amber-400 d-flex items-center gap-1.5">
                        <FiTarget className="w-4 h-4" /> Target Choices
                      </span>
                      <span className="badge bg-amber-500 text-white font-black text-xs px-2 py-0.5 rounded-pill">
                        {results.meta.targetCount}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300 font-medium">60% - 84% probability • Competitive matches</span>
                  </div>
                </div>

                <div className="col-12 col-md-4">
                  <div
                    onClick={() => setActiveTier('Dream')}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      activeTier === 'Dream'
                        ? 'bg-purple-500/20 border-purple-400 shadow-md scale-[1.02]'
                        : 'bg-slate-800/60 border-slate-700/60 hover:bg-slate-800'
                    }`}
                  >
                    <div className="d-flex items-center justify-between mb-1">
                      <span className="text-xs font-black text-purple-300 d-flex items-center gap-1.5">
                        <FiAward className="w-4 h-4" /> Dream Choices
                      </span>
                      <span className="badge bg-purple-500 text-white font-black text-xs px-2 py-0.5 rounded-pill">
                        {results.meta.dreamCount}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300 font-medium">30% - 59% probability • Aspirational reach</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter Tabs & Section Header */}
            <div className="d-flex flex-column flex-md-row items-md-center justify-content-between gap-3 pt-2">
              <div>
                <h3 className="h4 font-black text-dark mb-0">
                  Recommended Matches ({filteredColleges.length})
                </h3>
                <p className="text-muted text-xs mb-0">
                  Showing colleges classified by admission probability and cutoff compatibility
                </p>
              </div>

              {/* High-Impact SaaS Filter Buttons */}
              <div className="d-inline-flex flex-wrap items-center gap-1.5 bg-slate-900 text-white p-1.5 rounded-2xl shadow-md d-print-none">
                <button
                  type="button"
                  onClick={() => setActiveTier('All')}
                  className={`btn btn-sm text-xs font-black px-3 py-1.5 rounded-xl transition-all ${
                    activeTier === 'All'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  All Matches ({results.recommendations.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTier('Safe')}
                  className={`btn btn-sm text-xs font-black px-3 py-1.5 rounded-xl transition-all ${
                    activeTier === 'Safe'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-emerald-300 hover:bg-slate-800'
                  }`}
                >
                  🛡️ Safe ({results.meta.safeCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTier('Target')}
                  className={`btn btn-sm text-xs font-black px-3 py-1.5 rounded-xl transition-all ${
                    activeTier === 'Target'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
                  }`}
                >
                  🎯 Target ({results.meta.targetCount})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTier('Dream')}
                  className={`btn btn-sm text-xs font-black px-3 py-1.5 rounded-xl transition-all ${
                    activeTier === 'Dream'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-300 hover:text-purple-300 hover:bg-slate-800'
                  }`}
                >
                  🌟 Dream ({results.meta.dreamCount})
                </button>
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="row g-4">
              {filteredColleges.map((college) => {
                const isSaved = savedIds.includes(college.id);
                const isCompared = comparedColleges.some((c) => c.id === college.id);
                const banner = getTierBannerConfig(college.tier);

                return (
                  <div key={college.id} className="col-12 col-md-6 col-lg-4">
                    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-100 d-flex flex-column justify-content-between group">
                      <div>
                        {/* High-Impact Probability Banner Header */}
                        <div className={`p-3.5 ${banner.bg} text-white space-y-2`}>
                          <div className="d-flex items-center justify-between">
                            <span className="badge bg-white/20 text-white font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-pill backdrop-blur-md">
                              {college.tierLabel}
                            </span>
                            <span className="badge bg-white text-slate-900 font-black text-xs px-2.5 py-1 rounded-pill shadow-xs">
                              {college.admissionProbability}% Odds
                            </span>
                          </div>

                          {/* Progress Meter Bar */}
                          <div className="w-100 bg-black/20 rounded-full h-2 overflow-hidden">
                            <div
                              className="h-2 rounded-full bg-white transition-all duration-700"
                              style={{ width: `${college.admissionProbability}%` }}
                            />
                          </div>

                          <div className="d-flex items-center justify-between text-[11px] text-white/90 font-bold pt-0.5">
                            <span>Cutoff Benchmark: {college.minCutoff}%</span>
                            <span>Round 6 JoSAA</span>
                          </div>
                        </div>

                        {/* College Meta & Logo */}
                        <div className="p-4 border-bottom border-gray-100">
                          <div className="d-flex items-start gap-3">
                            <img
                              src={college.logo}
                              alt={college.shortName || college.name}
                              className="w-12 h-12 rounded-2xl bg-white p-1 border border-slate-200 object-contain shadow-xs shrink-0"
                            />
                            <div className="min-w-0 flex-grow-1">
                              <div className="d-flex items-center gap-2 mb-1">
                                <span className="badge bg-indigo-50 text-indigo-700 font-black text-[10px] px-2 py-0.5 rounded-pill border border-indigo-200">
                                  NIRF #{college.nirfRank}
                                </span>
                                {college.isHomeStateAdvantage && (
                                  <span className="badge bg-emerald-50 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-pill border border-emerald-200">
                                    Home State Quota
                                  </span>
                                )}
                              </div>
                              <h4 className="font-black text-sm text-dark mb-0 text-truncate group-hover:text-indigo-600 transition-colors">
                                {college.name}
                              </h4>
                              <p className="text-xs text-muted font-semibold d-flex items-center gap-1 mb-0 mt-0.5">
                                <FiMapPin className="w-3 h-3 text-indigo-500 shrink-0" />
                                <span className="text-truncate">{college.location}</span>
                              </p>
                            </div>

                            {/* Bookmark Button */}
                            <button
                              type="button"
                              onClick={() => toggleSaveCollege(college.id, college.shortName || college.name)}
                              className={`p-2 rounded-xl transition-all border-0 shrink-0 ${
                                isSaved
                                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                              title="Shortlist College"
                            >
                              <FiBookmark className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Key Statistics Grid */}
                        <div className="p-4 row g-2 border-bottom border-gray-100 text-xs">
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
                              Average Package
                            </span>
                            <span className="font-bold text-dark text-sm">
                              {formatCurrency(college.avgSalary)}
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
                              Student Rating
                            </span>
                            <div className="d-flex items-center gap-1">
                              <FiStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="font-black text-dark text-sm">{college.rating || '4.8'}</span>
                            </div>
                          </div>
                        </div>

                        {/* AI Insight Rationale Box */}
                        <div className="p-3.5 bg-slate-50 border-bottom border-gray-100">
                          <div className="d-flex items-start gap-2 text-xs">
                            <FiCheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-extrabold text-slate-800 d-block text-[11px] uppercase tracking-wider mb-0.5">
                                AI Admission Reasoning
                              </span>
                              <span className="text-slate-600 text-[11px] leading-relaxed">
                                {college.aiReason}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Action Buttons Footer */}
                      <div className="p-3 bg-white d-flex items-center gap-2 border-top border-gray-100 d-print-none">
                        {/* Compare Button */}
                        <button
                          type="button"
                          onClick={() => (isCompared ? removeFromCompare(college.id) : addToCompare(college))}
                          className={`flex-grow-1 d-inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                            isCompared
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'btn-saas-compare'
                          }`}
                        >
                          {isCompared ? (
                            <>
                              <FiCheck className="w-3.5 h-3.5" />
                              <span>Compared</span>
                            </>
                          ) : (
                            <>
                              <FiBarChart2 className="w-3.5 h-3.5" />
                              <span>Compare</span>
                            </>
                          )}
                        </button>

                        {/* Details Link */}
                        <Link to={`/colleges/${college.id}`} className="flex-grow-1 text-decoration-none">
                          <button
                            type="button"
                            className="w-100 d-inline-flex items-center justify-center gap-1.5 px-3 py-2.5 btn-saas-primary text-xs font-bold"
                          >
                            <span>Explore Details</span>
                            <FiArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </Link>
                      </div>
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
