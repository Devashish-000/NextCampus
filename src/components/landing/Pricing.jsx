import React, { useState } from 'react';
import { FiCheck, FiZap, FiStar, FiArrowRight } from 'react-icons/fi';
import { Card, CardBody } from '../ui/Card';
import { Button } from '../ui/Button';

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Basic Discovery',
      badge: 'Starter',
      price: 'Free',
      period: 'Forever Free',
      description: 'Ideal for high school students exploring initial university choices.',
      features: [
        'Access to 500+ College Profiles',
        'NIRF 2026 Official Ranking Tables',
        'Basic Entrance Cutoff Percentiles',
        '3 Side-by-Side College Comparisons',
      ],
      popular: false,
      buttonVariant: 'outline',
      buttonText: 'Get Started Free',
    },
    {
      name: 'Pro Student Counseling',
      badge: 'MOST POPULAR',
      price: isAnnual ? '₹799' : '₹999',
      period: isAnnual ? 'Per Season (Save 20%)' : 'One-Time / Full Season',
      description: 'Full AI admission predictor, JoSAA cutoff calculators & mentor guidance.',
      features: [
        'Everything in Free Plan',
        'Unlimited AI Admission Predictions',
        'Unlimited 4-College Matrix Comparisons',
        'Verified Salary & Placement Disclosures',
        '1-on-1 Session with IIT/IIM Alumni Mentor',
        'Priority SMS & Email JoSAA Round Alerts',
      ],
      popular: true,
      buttonVariant: 'primary',
      buttonText: 'Upgrade to Pro Counseling',
    },
    {
      name: 'Enterprise Campus',
      badge: 'University Access',
      price: 'Custom',
      period: 'Per University / Year',
      description: 'For university administrators and corporate recruiting partners.',
      features: [
        'Official University Branding & Controls',
        'Verified Review Moderation Tools',
        'Placement Data Audit Disclosures',
        'Direct Applicant Student Pipeline',
        'Dedicated Account Manager',
      ],
      popular: false,
      buttonVariant: 'outline',
      buttonText: 'Contact Enterprise Sales',
    },
  ];

  return (
    <section className="saas-section bg-transparent relative overflow-hidden">
      <div className="container px-3 px-md-5 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider d-block mb-1">
            Transparent Pricing
          </span>
          <h2 className="fw-extrabold text-dark display-6">Simple Plans for Every Student</h2>
          <p className="text-muted text-sm">
            Choose the right counseling plan to maximize your university selection and admission success.
          </p>
        </div>

        {/* Monthly vs Annual Toggle Switch */}
        <div className="d-flex items-center justify-content-center gap-3 mb-5">
          <span className={`text-xs font-bold ${!isAnnual ? 'text-indigo-600' : 'text-muted'}`}>
            Standard Counseling
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-pill bg-indigo-600 p-0.5 position-relative border-0 shadow-inner focus:outline-none"
            aria-label="Toggle Billing Cycle"
          >
            <div
              className={`w-5 h-5 rounded-circle bg-white shadow-md transition-transform duration-300 ${
                isAnnual ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="d-flex items-center gap-1.5">
            <span className={`text-xs font-bold ${isAnnual ? 'text-indigo-600' : 'text-muted'}`}>
              Early Bird Season
            </span>
            <span className="badge bg-emerald-500 text-white font-extrabold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-pill shadow-xs">
              SAVE 20%
            </span>
          </div>
        </div>

        {/* 3-Column Pricing Grid */}
        <div className="row g-4 justify-content-center items-stretch pt-2">
          {plans.map((plan, idx) => (
            <div key={idx} className="col-12 col-md-6 col-lg-4">
              <div
                className={`h-100 rounded-3xl p-4 p-md-5 d-flex flex-column justify-between transition-all duration-300 position-relative ${
                  plan.popular
                    ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-indigo-500 transform md:-translate-y-3'
                    : 'bg-white/90 text-dark border border-gray-200/90 shadow-sm hover:shadow-lg backdrop-blur-md'
                }`}
              >
                {/* FLOATING BADGE */}
                {plan.popular ? (
                  <div className="mb-3 d-flex items-center justify-between">
                    <span className="badge bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-black text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-pill shadow-md d-inline-flex items-center gap-1">
                      <FiZap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                      MOST POPULAR
                    </span>
                    <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
                      Recommended
                    </span>
                  </div>
                ) : (
                  <div className="mb-3">
                    <span className="badge bg-gray-100 text-gray-600 font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-pill">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <h3 className={`h4 font-extrabold mb-1 ${plan.popular ? 'text-white' : 'text-dark'}`}>
                    {plan.name}
                  </h3>
                  <p className={`text-xs mb-4 ${plan.popular ? 'text-gray-400' : 'text-muted'}`}>
                    {plan.description}
                  </p>

                  <div className={`d-flex items-baseline gap-2 mb-4 pb-3 border-bottom ${
                    plan.popular ? 'border-slate-800' : 'border-gray-100'
                  }`}>
                    <span className={`display-5 font-black tracking-tight ${plan.popular ? 'text-white' : 'text-dark'}`}>
                      {plan.price}
                    </span>
                    <span className={`text-xs font-semibold ${plan.popular ? 'text-indigo-400' : 'text-muted'}`}>
                      {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3.5 mb-5 list-unstyled text-sm">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="d-flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-circle d-flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                          plan.popular ? 'bg-indigo-500 text-white' : 'bg-emerald-500 text-white'
                        }`}>
                          <FiCheck className="w-3.5 h-3.5" />
                        </div>
                        <span className={`font-semibold text-xs leading-relaxed ${
                          plan.popular ? 'text-gray-200' : 'text-gray-700'
                        }`}>
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  {plan.popular ? (
                    <button
                      type="button"
                      className="w-100 py-3 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/40 border border-indigo-400/30 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 d-flex items-center justify-center gap-2"
                    >
                      <span>Upgrade to Pro Counseling</span>
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <Button variant="outline" size="lg" className="w-100 py-3">
                      {plan.buttonText}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
