import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSliders, FiCheckCircle, FiTrendingUp, FiAward, FiArrowRight, FiCheck, FiPieChart, FiZap, FiTarget } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export const SmartHero = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState('98.4');
  const [exam, setExam] = useState('JEE Main');
  const [category, setCategory] = useState('General');
  const [isCalculated, setIsCalculated] = useState(false);

  const handleCalculate = (e) => {
    e.preventDefault();
    navigate('/recommendations');
  };

  return (
    <section className="saas-section bg-transparent relative overflow-hidden">
      {/* 3D Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container px-3 px-md-5 relative z-10">
        <div className="row items-center g-5">
          
          {/* LEFT COLUMN - Conversion Headline & Form */}
          <div className="col-12 col-lg-6">
            <div className="space-y-4">
              
              {/* Animated Live Badge */}
              <div className="d-inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-xs">
                <span className="w-2 h-2 rounded-circle bg-emerald-500 animate-pulse" />
                <FiSliders className="w-4 h-4 text-indigo-600" />
                <span>Admission Insights Engine 2026</span>
              </div>

              {/* H1 Title */}
              <h1 className="fw-black text-dark tracking-tight mb-3">
                Predict Your College <span className="gradient-text-saas">Admission Odds</span>
              </h1>

              {/* Lead Subtitle */}
              <p className="text-secondary text-base leading-relaxed mb-4">
                Input your entrance test percentile and reservation category. Our algorithm analyzes 5 years of JoSAA & NEET closing ranks to estimate your exact admission probability.
              </p>

              {/* Interactive Predictor Form Card */}
              <div className="saas-card p-4 shadow-lg border border-indigo-100/80 bg-white/90 backdrop-blur-md">
                <form onSubmit={handleCalculate} className="space-y-3">
                  <div className="row g-3">
                    <div className="col-12 col-sm-6">
                      <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-1">
                        Exam Type
                      </label>
                      <select
                        value={exam}
                        onChange={(e) => setExam(e.target.value)}
                        className="form-select text-sm font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      >
                        <option value="JEE Main">JEE Main 2026</option>
                        <option value="JEE Advanced">JEE Advanced 2026</option>
                        <option value="NEET UG">NEET UG 2026</option>
                        <option value="CAT">CAT 2026</option>
                        <option value="CUET UG">CUET UG 2026</option>
                      </select>
                    </div>

                    <div className="col-12 col-sm-6">
                      <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-1">
                        Percentile / Score
                      </label>
                      <input
                        type="text"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="e.g. 98.4 %ile or 1250 Rank"
                        className="form-control text-sm font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label text-xs font-extrabold text-dark uppercase tracking-wider mb-1">
                        Reservation Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="form-select text-sm font-semibold rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                      >
                        <option value="General">General / Open Category</option>
                        <option value="OBC-NCL">OBC-NCL Category</option>
                        <option value="EWS">Gen-EWS Category</option>
                        <option value="SC">Scheduled Caste (SC)</option>
                        <option value="ST">Scheduled Tribe (ST)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-100 py-3 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/30 border border-indigo-400/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 d-flex items-center justify-center gap-2 mt-3"
                  >
                    <span>Calculate My Admission Odds</span>
                    <FiArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </div>
          </div>

          {/* RIGHT COLUMN - STUNNING 3D ISOMETRIC PREVIEW CARD */}
          <div className="col-12 col-lg-6">
            <div style={{ perspective: '1200px' }} className="position-relative">
              
              {/* Floating Top 3D Metric Pill */}
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="position-absolute top-0 start-0 translate-middle-y z-30 bg-white/95 border border-indigo-200 shadow-xl rounded-2xl px-3.5 py-2 d-flex items-center gap-2 backdrop-blur-md"
              >
                <div className="w-7 h-7 rounded-xl bg-emerald-500 text-white d-flex items-center justify-center font-bold text-xs shadow-sm">
                  <FiZap className="w-4 h-4 fill-white" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted uppercase block">Real-time Predictor</span>
                  <span className="text-xs font-black text-dark">98.4% Accuracy Match</span>
                </div>
              </motion.div>

              {/* Floating Bottom 3D Metric Badge */}
              <motion.div
                initial={{ y: 10 }}
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="position-absolute bottom-0 end-0 translate-middle-y z-30 bg-slate-900 text-white border border-slate-700 shadow-2xl rounded-2xl px-3.5 py-2 d-flex items-center gap-2 backdrop-blur-md"
              >
                <div className="w-7 h-7 rounded-xl bg-indigo-500 text-white d-flex items-center justify-center font-bold text-xs shadow-sm">
                  <FiTarget className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-indigo-300 uppercase block">JoSAA Round 6</span>
                  <span className="text-xs font-bold text-white">500+ Institutes Synced</span>
                </div>
              </motion.div>

              {/* Main 3D Card Stage */}
              <motion.div
                initial={{ opacity: 0, rotateY: -12, rotateX: 6, scale: 0.95 }}
                animate={{ opacity: 1, rotateY: -4, rotateX: 2, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="saas-card p-4 p-md-5 bg-white border border-indigo-200/80 shadow-2xl position-relative overflow-hidden hover:rotate-0 transition-transform duration-500"
                style={{
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 30px 60px -15px rgba(79, 70, 229, 0.25)',
                }}
              >
                {/* Header */}
                <div className="d-flex items-center justify-between pb-3 border-bottom mb-4">
                  <div className="d-flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-bold text-lg shrink-0">
                      <FiTrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="fw-extrabold text-dark mb-0 text-base">Predicted Cutoff Probability</h5>
                      <span className="text-muted text-xs font-semibold">Score: {score} %ile • Category: {category}</span>
                    </div>
                  </div>
                  <span className="badge bg-emerald-500 text-white font-extrabold px-3 py-1.5 rounded-pill text-xs shadow-sm">
                    96.4% HIGH MATCH
                  </span>
                </div>

                {/* College Result Items with Animated Progress Bars */}
                <div className="space-y-4">
                  
                  {/* IIT Bombay Item */}
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 space-y-2">
                    <div className="d-flex items-center justify-between">
                      <div>
                        <span className="badge bg-indigo-600 text-white font-bold text-[9px] uppercase px-2 py-0.5 me-1">Tier 1</span>
                        <span className="font-extrabold text-dark text-sm">IIT Bombay (B.Tech CS)</span>
                      </div>
                      <span className="font-black text-indigo-600 text-sm">96.4%</span>
                    </div>
                    <div className="w-full bg-indigo-200/60 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full w-[96%]" />
                    </div>
                    <div className="d-flex justify-between text-[11px] text-muted">
                      <span>Closing Rank: 3,450</span>
                      <span className="font-bold text-emerald-600">High Admission Odds</span>
                    </div>
                  </div>

                  {/* IIT Delhi Item */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="d-flex items-center justify-between">
                      <div>
                        <span className="badge bg-slate-700 text-white font-bold text-[9px] uppercase px-2 py-0.5 me-1">Tier 1</span>
                        <span className="font-extrabold text-dark text-sm">IIT Delhi (B.Tech Electrical)</span>
                      </div>
                      <span className="font-black text-emerald-600 text-sm">98.9%</span>
                    </div>
                    <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-2 rounded-full w-[98%]" />
                    </div>
                    <div className="d-flex justify-between text-[11px] text-muted">
                      <span>Closing Rank: 4,120</span>
                      <span className="font-bold text-emerald-600">Very High Admission Odds</span>
                    </div>
                  </div>

                  {/* NIT Trichy Item */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                    <div className="d-flex items-center justify-between">
                      <div>
                        <span className="badge bg-slate-700 text-white font-bold text-[9px] uppercase px-2 py-0.5 me-1">Tier 1</span>
                        <span className="font-extrabold text-dark text-sm">NIT Trichy (Computer Science)</span>
                      </div>
                      <span className="font-black text-emerald-600 text-sm">99.5%</span>
                    </div>
                    <div className="w-full bg-slate-200/60 rounded-full h-2 overflow-hidden">
                      <div className="bg-emerald-500 h-2 rounded-full w-[99%]" />
                    </div>
                    <div className="d-flex justify-between text-[11px] text-muted">
                      <span>Closing Rank: 7,800</span>
                      <span className="font-bold text-emerald-600">Guaranteed Admission Odds</span>
                    </div>
                  </div>

                </div>

                {/* Footer Trust Bar */}
                <div className="mt-4 pt-3 border-top d-flex items-center justify-between text-xs text-muted font-semibold">
                  <span className="d-flex items-center gap-1.5">
                    <FiCheck className="text-emerald-500 font-bold" />
                    Official JoSAA Closing Ranks Data
                  </span>
                  <span className="fw-extrabold text-indigo-600">Updated Daily</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
