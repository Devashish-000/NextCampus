import React from 'react';
import { FiSearch, FiSliders, FiBarChart2, FiCheckCircle } from 'react-icons/fi';
import { Card, CardBody } from '../ui/Card';

export const HowItWorks = () => {
  const steps = [
    {
      num: '01',
      icon: FiSearch,
      title: 'Search & Filter Colleges',
      description: 'Explore 500+ tier-1 IITs, NITs, IIMs, and Medical universities filtered by NIRF rank, fee budget, or state.',
    },
    {
      num: '02',
      icon: FiSliders,
      title: 'Calculate Admission Odds',
      description: 'Enter your JEE, NEET, or CAT score to get real-time cutoff predictions based on 5 years of JoSAA closing ranks.',
    },
    {
      num: '03',
      icon: FiBarChart2,
      title: 'Compare Side-by-Side',
      description: 'Add up to 4 institutes into your comparison matrix to evaluate tuition fees, median salary offers, and amenities.',
    },
    {
      num: '04',
      icon: FiCheckCircle,
      title: 'Finalize Choice Filling',
      description: 'Shortlist target universities and export your choice filling preferences for JoSAA or NEET counseling rounds.',
    },
  ];

  return (
    <section className="saas-section bg-transparent relative overflow-hidden">
      <div className="container px-3 px-md-5 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-5">
          <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider d-block mb-1">
            Simplified Process
          </span>
          <h2 className="fw-extrabold text-dark">How NextCampus Works</h2>
          <p className="text-muted text-sm">
            4 simple steps from initial discovery to locking your dream university seat.
          </p>
        </div>

        <div className="row g-4">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <div key={idx} className="col-12 col-sm-6 col-lg-3">
                <div className="saas-card h-100 saas-card-hover border border-slate-200/90 p-4 space-y-3 bg-white">
                  <div className="d-flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white d-flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-500/25">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="display-6 font-black text-indigo-200 font-mono">
                      {st.num}
                    </span>
                  </div>

                  <h3 className="h6 font-extrabold text-dark mb-2">{st.title}</h3>
                  <p className="text-secondary text-xs leading-relaxed mb-0">{st.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
