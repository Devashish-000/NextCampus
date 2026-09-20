import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiLinkedin, FiYoutube, FiInstagram, FiGithub, FiCheckCircle, FiShield, FiMail, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { ROUTES } from '../../constants/routes';
import { STREAMS } from '../../constants/collegeData';

export const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      toast.success('Subscribed! You will receive JoSAA & NEET counseling alerts.');
      setEmail('');
    }
  };

  return (
    <footer className="bg-white border-top text-secondary pt-5 pb-4 transition-colors">
      <div className="container px-3 px-md-5">
        
        {/* TOP SECTION: Multi-Column Bootstrap Grid */}
        <div className="row g-4 pb-5 border-bottom">
          
          {/* Column 1: Brand Info & Social Proof (Clean Typography, No Square Logo Box) */}
          <div className="col-12 col-lg-4 space-y-4">
            <Link to={ROUTES.HOME} className="text-decoration-none d-inline-block">
              <div className="d-flex items-center gap-2">
                <span className="font-black text-2xl text-dark tracking-tight leading-none">
                  Next<span className="gradient-text-saas">Campus</span>
                </span>
              </div>
            </Link>
            <p className="text-xs text-muted leading-relaxed max-w-sm">
              India's premier AI-powered college discovery, NIRF ranking comparison, and JoSAA/NEET counseling analytics platform. Enabling 100k+ students to make confident academic decisions.
            </p>

            {/* Social Media Links */}
            <div className="d-flex items-center gap-2 pt-1">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-light text-secondary hover:bg-indigo-600 hover:text-white d-flex items-center justify-center transition-all border"
                aria-label="Twitter"
              >
                <FiTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-light text-secondary hover:bg-indigo-600 hover:text-white d-flex items-center justify-center transition-all border"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-light text-secondary hover:bg-rose-600 hover:text-white d-flex items-center justify-center transition-all border"
                aria-label="YouTube"
              >
                <FiYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-light text-secondary hover:bg-purple-600 hover:text-white d-flex items-center justify-center transition-all border"
                aria-label="Instagram"
              >
                <FiInstagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl bg-light text-secondary hover:bg-dark hover:text-white d-flex items-center justify-center transition-all border"
                aria-label="GitHub"
              >
                <FiGithub className="w-4 h-4" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="d-flex items-center gap-3 pt-2 text-[11px] font-semibold text-muted">
              <span className="d-flex items-center gap-1">
                <FiCheckCircle className="text-emerald-500" />
                JoSAA 2026 Verified Data
              </span>
              <span className="d-flex items-center gap-1">
                <FiShield className="text-indigo-500" />
                ISO 27001 Certified
              </span>
            </div>
          </div>

          {/* Column 2: Explore Platform */}
          <div className="col-6 col-md-3 col-lg-2 space-y-3">
            <h4 className="text-xs font-black text-dark uppercase tracking-widest mb-3">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-xs list-unstyled">
              <li>
                <Link to={ROUTES.COLLEGES} className="text-muted hover:text-indigo-600 font-semibold text-decoration-none">
                  All Colleges Directory
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RANKINGS} className="text-muted hover:text-indigo-600 font-semibold text-decoration-none">
                  NIRF & QS Rankings
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RECOMMENDATIONS} className="text-muted hover:text-indigo-600 font-semibold text-decoration-none">
                  AI Admission Predictor
                </Link>
              </li>
              <li>
                <Link to={ROUTES.COMPARE} className="text-muted hover:text-indigo-600 font-semibold text-decoration-none">
                  College Comparison Tool
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SCHOLARSHIPS} className="text-muted hover:text-indigo-600 font-semibold text-decoration-none">
                  Scholarship Finder
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Popular Streams */}
          <div className="col-6 col-md-3 col-lg-2 space-y-3">
            <h4 className="text-xs font-black text-dark uppercase tracking-widest mb-3">
              Popular Streams
            </h4>
            <ul className="space-y-2 text-xs list-unstyled">
              {STREAMS.slice(0, 5).map((stream, idx) => (
                <li key={idx}>
                  <Link
                    to={`${ROUTES.COLLEGES}?stream=${encodeURIComponent(stream)}`}
                    className="text-muted hover:text-indigo-600 font-semibold text-decoration-none"
                  >
                    {stream}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Counseling Alerts & Newsletter */}
          <div className="col-12 col-md-6 col-lg-4 space-y-3">
            <h4 className="text-xs font-black text-dark uppercase tracking-widest mb-2">
              Stay Informed
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Subscribe to get real-time JoSAA round updates, exam notification deadlines, and cut-off percentile drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="position-relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="form-control text-xs rounded-xl border-gray-200 py-2.5 ps-9 pe-3"
                  required
                />
                <FiMail className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
              </div>
              <button
                type="submit"
                className="w-100 btn btn-saas-primary text-xs py-2.5 d-flex items-center justify-center gap-1.5"
              >
                <span>Subscribe to Counseling Alerts</span>
                <FiSend className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM LEGAL BAR */}
        <div className="pt-4 d-flex flex-column flex-md-row items-center justify-between gap-3 text-xs text-muted font-medium">
          <div>
            © {new Date().getFullYear()} NextCampus Enterprise Inc. All rights reserved.
          </div>
          <div className="d-flex flex-wrap items-center gap-3">
            <a href="#privacy" className="text-muted hover:text-indigo-600 text-decoration-none">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#terms" className="text-muted hover:text-indigo-600 text-decoration-none">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#security" className="text-muted hover:text-indigo-600 text-decoration-none">
              Security & Audit
            </a>
            <span>•</span>
            <a href="#sitemap" className="text-muted hover:text-indigo-600 text-decoration-none">
              Sitemap
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
