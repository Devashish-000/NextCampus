import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiSliders, FiArrowRight, FiCheckCircle, FiStar, FiAward, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { STREAMS } from '../../constants/collegeData';
import { ROUTES } from '../../constants/routes';
import { Button } from '../ui/Button';

export const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.COLLEGES}?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-indigo-50/60 via-white to-light border-bottom relative overflow-hidden">
      <div className="container px-3 px-md-5">
        <div className="row justify-content-center text-center">
          <div className="col-12 col-lg-10 col-xl-9">
            
            {/* Conversion Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="d-inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs"
            >
              <FiSliders className="w-4 h-4 text-indigo-600" />
              <span>AI Admission Predictor 2026</span>
            </motion.div>

            {/* H1 Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="display-4 font-black text-dark tracking-tight mb-3"
            >
              Discover & Predict Your <span className="gradient-text-saas">Dream University</span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lead text-muted max-w-2xl mx-auto mb-4"
            >
              Real-time NIRF rankings, verified placement records, 100k+ student reviews, and instant percentile calculations for 500+ top Indian institutes.
            </motion.p>

            {/* Live Search Form */}
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleHeroSearch}
              className="mb-4"
            >
              <div className="saas-card p-2 d-flex flex-column flex-sm-row items-center gap-2 shadow-sm max-w-2xl mx-auto">
                <div className="d-flex items-center gap-2 px-3 py-2 flex-grow-1 w-100">
                  <FiSearch className="text-indigo-600 w-5 h-5 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search by college name, course or city (e.g. IIT Bombay, Delhi)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-control border-0 bg-transparent shadow-none text-sm font-semibold"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-100 w-sm-auto px-4">
                  Search Colleges
                </Button>
              </div>
            </motion.form>

            {/* Stream Badges */}
            <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
              {STREAMS.map((st, i) => (
                <button
                  key={i}
                  onClick={() => navigate(`${ROUTES.COLLEGES}?stream=${encodeURIComponent(st)}`)}
                  className="btn btn-sm btn-light border text-secondary font-semibold rounded-pill px-3 py-1 text-xs"
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Stat Counter Bar */}
            <div className="row g-3 pt-3 text-start">
              <div className="col-12 col-sm-6 col-lg-3">
                <div className="saas-card p-3 d-flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-bold text-lg shrink-0">
                    <FiAward />
                  </div>
                  <div>
                    <h4 className="fw-extrabold text-dark mb-0">500+</h4>
                    <span className="text-muted text-xs font-semibold">Accredited Colleges</span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="saas-card p-3 d-flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 d-flex items-center justify-center font-bold text-lg shrink-0">
                    <FiTrendingUp />
                  </div>
                  <div>
                    <h4 className="fw-extrabold text-dark mb-0">₹3.7 Cr</h4>
                    <span className="text-muted text-xs font-semibold">Highest Package</span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="saas-card p-3 d-flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 d-flex items-center justify-center font-bold text-lg shrink-0">
                    <FiCheckCircle />
                  </div>
                  <div>
                    <h4 className="fw-extrabold text-dark mb-0">98%</h4>
                    <span className="text-muted text-xs font-semibold">Placement Accuracy</span>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-6 col-lg-3">
                <div className="saas-card p-3 d-flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 d-flex items-center justify-center font-bold text-lg shrink-0">
                    <FiStar />
                  </div>
                  <div>
                    <h4 className="fw-extrabold text-dark mb-0">100k+</h4>
                    <span className="text-muted text-xs font-semibold">Student Reviews</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
