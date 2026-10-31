import React from 'react';
import { FiSliders, FiBarChart2, FiAward, FiMessageSquare, FiShield, FiBriefcase, FiArrowRight } from 'react-icons/fi';
import { Card, CardBody } from '../ui/Card';

export const Features = () => {
  const featuresList = [
    {
      icon: FiSliders,
      tag: 'AI PREDICTOR ENGINE',
      badgeColor: 'bg-indigo-600 text-white shadow-indigo-500/30',
      title: 'AI Admission Match & Cutoff Predictor',
      description: 'Calculates your admission probability for tier-1 IITs, NITs, and Medical colleges based on entrance percentiles, category quotas, and fee budget.',
    },
    {
      icon: FiBarChart2,
      tag: 'COMPARISON MATRIX',
      badgeColor: 'bg-purple-600 text-white shadow-purple-500/30',
      title: 'Side-by-Side Comparison Matrix',
      description: 'Compare up to 4 universities dynamically across NIRF ranks, total tuition fees, median placement offers, and hostels.',
    },
    {
      icon: FiAward,
      tag: 'NIRF RANKINGS 2026',
      badgeColor: 'bg-amber-500 text-white shadow-amber-500/30',
      title: 'NIRF Official Rankings 2026',
      description: 'Verified Ministry of Education rankings based on Teaching, Research output, and Graduation outcomes.',
    },
    {
      icon: FiBriefcase,
      tag: 'PLACEMENT AUDIT',
      badgeColor: 'bg-emerald-600 text-white shadow-emerald-500/30',
      title: 'Audited Placement Analytics',
      description: 'Real-time salary growth charts (2021-2025) and top corporate recruiting partners breakdown.',
    },
    {
      icon: FiMessageSquare,
      tag: 'VERIFIED REVIEWS',
      badgeColor: 'bg-cyan-600 text-white shadow-cyan-500/30',
      title: 'Verified Student Reviews',
      description: 'Transparent ratings and pros/cons shared by current students and alumni regarding campus reality.',
    },
    {
      icon: FiShield,
      tag: 'SCHOLARSHIPS',
      badgeColor: 'bg-rose-600 text-white shadow-rose-500/30',
      title: 'Scholarship Finder',
      description: 'Direct applications for national government fellowships, corporate grants, and merit-based financial aid.',
    },
  ];

  return (
    <section className="saas-section bg-transparent relative overflow-hidden">
      <div className="container px-3 px-md-5 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider d-block mb-1">
            Enterprise Features
          </span>
          <h2 className="fw-extrabold text-dark display-6">Built for Confident Academic Decisions</h2>
          <p className="text-muted text-sm">
            Everything you need to discover, evaluate, and target top universities across India.
          </p>
        </div>

        {/* 6-Card Bootstrap Grid */}
        <div className="row g-4">
          {featuresList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="col-12 col-md-6 col-lg-4">
                <div className="saas-card p-4 p-md-5 h-100 border border-slate-200/90 saas-card-hover d-flex flex-column justify-between transition-all duration-300">
                  <div>
                    {/* Top Row: Icon Badge + Feature Tag */}
                    <div className="d-flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl d-flex items-center justify-center font-bold text-xl shadow-md ${item.badgeColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="badge bg-slate-100 text-slate-700 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-pill">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <h3 className="h5 font-extrabold text-dark mb-2">{item.title}</h3>
                    <p className="text-secondary text-sm leading-relaxed mb-4">{item.description}</p>
                  </div>

                  {/* Bottom Interactive Arrow Link */}
                  <div className="pt-2 border-top border-slate-100 d-flex items-center justify-between text-xs font-bold text-indigo-600 group hover:text-indigo-700 cursor-pointer">
                    <span>Explore Feature</span>
                    <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
