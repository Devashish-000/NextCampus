import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiArrowRight, FiBookOpen, FiAward, FiSliders } from 'react-icons/fi';
import { ALL_MOCK_COLLEGES } from '../../mocks/collegesData';
import { ROUTES } from '../../constants/routes';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? ALL_MOCK_COLLEGES.filter(
        (c) =>
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.location.toLowerCase().includes(query.toLowerCase()) ||
          c.stream.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : ALL_MOCK_COLLEGES.slice(0, 4);

  const quickLinks = [
    { label: 'Explore All Colleges', path: ROUTES.COLLEGES, icon: FiBookOpen, desc: 'Search 50+ NIRF verified institutes' },
    { label: 'NIRF Official Rankings 2026', path: ROUTES.RANKINGS, icon: FiAward, desc: 'Top podium universities & metrics' },
    { label: 'AI Admission Match Predictor', path: ROUTES.RECOMMENDATIONS, icon: FiSliders, desc: 'JoSAA seat odds algorithm' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6 overflow-y-auto">
        {/* Backdrop Scrim Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => onClose(false)}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Command Search Box Modal Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15 }}
          className="relative w-full max-w-2xl bg-white border border-slate-200/90 rounded-3xl shadow-2xl overflow-hidden z-10 space-y-0"
        >
          
          {/* Top Dark Header Search Input Bar */}
          <div className="bg-slate-950 text-white p-4 border-b border-slate-800 d-flex items-center gap-3">
            <FiSearch className="w-5 h-5 text-indigo-400 shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search 50+ top colleges, streams, or cities..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-base font-extrabold text-white placeholder-slate-400 focus:outline-none"
            />
            <div className="d-flex items-center gap-2">
              <kbd className="d-none d-sm-inline-block px-2 py-1 text-[10px] bg-slate-800 border border-slate-700 text-slate-300 font-mono rounded-lg">
                ESC
              </kbd>
              <button
                type="button"
                onClick={() => onClose(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors border-0"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Results */}
          <div className="p-4 max-h-[60vh] overflow-y-auto space-y-4 bg-white">
            
            {/* Quick Navigation Section (100% Crisp Visible Dark Text) */}
            {!query && (
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 px-3 d-block">
                  Quick Navigation
                </span>
                <div className="space-y-1.5">
                  {quickLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          onClose(false);
                          navigate(link.path);
                        }}
                        className="w-full flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 hover:bg-indigo-50 border border-slate-200/80 text-left group transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <h5 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-0">
                              {link.label}
                            </h5>
                            <span className="text-xs font-bold text-slate-500 block">
                              {link.desc}
                            </span>
                          </div>
                        </div>
                        <FiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Matching Universities / Popular Institutes Section */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 px-3 d-block">
                {query ? 'Matching Universities' : 'Popular Institutes'}
              </span>
              <div className="space-y-1.5">
                {results.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      onClose(false);
                      navigate(`/colleges/${c.id}`);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/80 text-left group transition-all"
                  >
                    <img
                      src={c.logo}
                      alt={c.shortName}
                      className="w-10 h-10 rounded-xl border p-1 bg-white object-contain shrink-0 shadow-xs"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-0 truncate">
                        {c.name}
                      </h5>
                      <p className="text-xs font-bold text-slate-600 truncate mb-0">
                        {c.location}, {c.state} • <span className="text-indigo-600 font-extrabold">NIRF #{c.nirfRank}</span>
                      </p>
                    </div>
                    <span className="badge bg-indigo-50 text-indigo-700 font-black text-xs px-3 py-1 rounded-pill border border-indigo-200/80">
                      {c.stream}
                    </span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
