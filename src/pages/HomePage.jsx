import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiHelpCircle, FiChevronDown, FiFilter } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartHero } from '../components/landing/SmartHero';
import { Features } from '../components/landing/Features';
import { HowItWorks } from '../components/landing/HowItWorks';
import { ReviewsSection } from '../components/landing/ReviewsSection';
import { Pricing } from '../components/landing/Pricing';
import { CollegeCard } from '../features/colleges/CollegeCard';
import { collegeService } from '../services/collegeService';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';

export const HomePage = () => {
  const [featuredColleges, setFeaturedColleges] = useState([]);
  const [selectedStream, setSelectedStream] = useState('All');
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    collegeService.getFeaturedColleges().then((res) => setFeaturedColleges(res));
  }, []);

  const streamsList = ['All', 'Engineering', 'Management', 'Medical', 'Law'];

  const filteredColleges =
    selectedStream === 'All'
      ? featuredColleges
      : featuredColleges.filter((c) => c.stream === selectedStream);

  const faqs = [
    {
      q: 'How are the admission insights and cutoff trends calculated?',
      a: 'We analyze the past 5 years of JoSAA, NEET, CAT, and State Counseling closing ranks alongside seat capacities and category cutoffs to provide accurate admission insights.',
    },
    {
      q: 'Are NIRF Rankings and placement packages verified?',
      a: 'Yes, all ranking scores, median salary packages, and top recruiter figures are sourced from official Ministry of Education NIRF documents and audited college placement disclosures.',
    },
    {
      q: 'Can I compare multiple universities side-by-side?',
      a: 'Yes! Click the "Compare" button on any college card to add up to 4 institutes into your comparison matrix for side-by-side analysis of fees, ranks, cutoffs, and amenities.',
    },
    {
      q: 'Is this platform free for students?',
      a: 'Yes, discovering colleges, reading verified student reviews, and saving shortlists is 100% free for students.',
    },
  ];

  return (
    <div className="w-100 overflow-hidden bg-tech-grid">
      
      {/* 1. SMART COUNSELING HERO SECTION */}
      <SmartHero />

      {/* 2. FEATURES GRID SECTION */}
      <Features />

      {/* 3. HOW IT WORKS 4-STEP COUNSELING PROCESS */}
      <HowItWorks />

      {/* 4. FEATURED COLLEGES GRID WITH STREAM FILTER TABS */}
      <section className="saas-section bg-transparent relative">
        <div className="container px-3 px-md-5 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-4">
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider d-block mb-1">
              Top Academic Institutions
            </span>
            <h2 className="fw-extrabold text-dark">Featured Top-Ranked Universities</h2>
            <p className="text-muted text-sm">
              Filter premier institutes by academic stream with verified placement & NIRF ranking records.
            </p>
          </div>

          {/* Stream Filter Pills Bar */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {streamsList.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStream(st)}
                className={`btn btn-sm px-4 py-2 rounded-pill font-bold text-xs transition-all ${
                  selectedStream === st
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 border-indigo-600'
                    : 'bg-white text-secondary border hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Colleges Card Grid */}
          <div className="row g-4">
            {filteredColleges.slice(0, 6).map((college) => (
              <div key={college.id} className="col-12 col-md-6 col-lg-4">
                <CollegeCard college={college} />
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to={ROUTES.COLLEGES}>
              <Button variant="outline" size="lg" rightIcon={<FiArrowRight />}>
                Explore All 500+ Colleges
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. VERIFIED REVIEWS & TESTIMONIALS */}
      <ReviewsSection />

      {/* 6. PRICING SECTION */}
      <Pricing />

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="saas-section bg-transparent relative">
        <div className="container px-3 px-md-5 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-5">
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider d-block mb-1">
              Counseling Guidance
            </span>
            <h2 className="fw-extrabold text-dark">Frequently Asked Questions</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
              <div className="accordion space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="saas-card overflow-hidden bg-white/90 backdrop-blur-md">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-100 p-4 text-start d-flex items-center justify-between gap-3 fw-bold text-dark border-0 bg-transparent"
                    >
                      <span className="d-flex items-center gap-2.5">
                        <FiHelpCircle className="text-indigo-600 w-5 h-5 shrink-0" />
                        {faq.q}
                      </span>
                      <FiChevronDown className={`text-muted transition-transform duration-200 shrink-0 ${activeFaq === idx ? 'rotate-180 text-indigo-600' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {activeFaq === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-4 text-sm text-secondary border-top pt-3"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
