import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { useComparison } from '../context/ComparisonContext';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';
import { FiBarChart2, FiX } from 'react-icons/fi';

export const MainLayout = () => {
  const { comparedColleges, removeFromCompare, clearComparison } = useComparison();
  const location = useLocation();

  const isComparePage = location.pathname === ROUTES.COMPARE;

  return (
    <div className="min-h-screen d-flex flex-column bg-light text-dark">
      <Navbar />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />

      {/* Floating Bottom Comparison Bar (Hidden on /compare page) */}
      {comparedColleges.length > 0 && !isComparePage && (
        <div className="position-fixed bottom-0 start-50 translate-middle-x mb-4 z-50 w-90 max-w-2xl bg-slate-900 text-white border border-slate-800 shadow-2xl rounded-3 p-3 d-flex items-center justify-between gap-3 backdrop-blur-md">
          <div className="d-flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white d-flex items-center justify-center font-bold text-base shadow-md">
              <FiBarChart2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold text-indigo-300 uppercase tracking-wider mb-0">COMPARE DRAWER</p>
              <h6 className="text-xs font-black text-white mb-0">
                {comparedColleges.length} of 4 Colleges Selected
              </h6>
            </div>
          </div>

          <div className="d-flex items-center gap-2">
            <Link to={ROUTES.COMPARE}>
              <Button variant="primary" size="sm" className="btn-saas-primary text-xs font-bold px-3 py-2">
                Compare Now
              </Button>
            </Link>

            <button
              onClick={clearComparison}
              className="btn btn-link text-slate-400 hover:text-white text-xs p-0 ms-2 text-decoration-none"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
