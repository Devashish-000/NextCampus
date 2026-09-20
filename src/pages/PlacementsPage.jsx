import React, { useState, useEffect } from 'react';
import { placementService } from '../services/otherServices';
import { Card } from '../components/ui/Card';
import { PlacementChart } from '../components/charts/PlacementChart';
import { SectorDistributionChart } from '../components/charts/SectorDistributionChart';
import { FiTrendingUp, FiAward, FiBriefcase, FiCheckCircle, FiGlobe } from 'react-icons/fi';

export const PlacementsPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    placementService.getPlacementStats().then((res) => setStats(res));
  }, []);

  if (!stats) return null;

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        {/* Header Bar */}
        <div className="pb-3 border-bottom border-gray-200/60">
          <div className="d-inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <FiBriefcase className="w-4 h-4 text-indigo-600" />
            <span>Audited Placement Analytics</span>
          </div>
          <h1 className="h2 font-black text-dark mb-1">
            University Placement Statistics & Recruiting Audit
          </h1>
          <p className="text-muted text-xs mb-0 max-w-3xl">
            Historical 5-year salary growth trends, top recruiter offer volumes, and industry sector breakdown across engineering, management, and medical campuses.
          </p>
        </div>

        {/* Top 4 Key Metric Cards Stage */}
        <div className="row g-3">
          
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 d-flex items-center gap-3 shadow-md saas-card-hover">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 d-flex items-center justify-center font-black text-xl shrink-0 shadow-sm border border-emerald-200/60">
                <FiAward />
              </div>
              <div>
                <span className="text-muted text-[10px] font-extrabold uppercase tracking-wider block">Highest Offer</span>
                <h3 className="h4 font-black text-dark mb-0">₹3.7 Cr</h3>
                <span className="text-emerald-600 text-xs font-extrabold">International Tech</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 d-flex items-center gap-3 shadow-md saas-card-hover">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 d-flex items-center justify-center font-black text-xl shrink-0 shadow-sm border border-indigo-200/60">
                <FiTrendingUp />
              </div>
              <div>
                <span className="text-muted text-[10px] font-extrabold uppercase tracking-wider block">Average Salary</span>
                <h3 className="h4 font-black text-dark mb-0">₹24.8 LPA</h3>
                <span className="text-indigo-600 text-xs font-extrabold">+18.5% YoY Growth</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 d-flex items-center gap-3 shadow-md saas-card-hover">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 d-flex items-center justify-center font-black text-xl shrink-0 shadow-sm border border-purple-200/60">
                <FiGlobe />
              </div>
              <div>
                <span className="text-muted text-[10px] font-extrabold uppercase tracking-wider block">Recruiters</span>
                <h3 className="h4 font-black text-dark mb-0">180+</h3>
                <span className="text-purple-600 text-xs font-extrabold">Top Fortune 500</span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 d-flex items-center gap-3 shadow-md saas-card-hover">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 d-flex items-center justify-center font-black text-xl shrink-0 shadow-sm border border-amber-200/60">
                <FiCheckCircle />
              </div>
              <div>
                <span className="text-muted text-[10px] font-extrabold uppercase tracking-wider block">Placement Rate</span>
                <h3 className="h4 font-black text-dark mb-0">98.2%</h3>
                <span className="text-amber-700 text-xs font-extrabold">Verified Offers</span>
              </div>
            </div>
          </div>

        </div>

        {/* Analytics Recharts Graphics Grid Stage */}
        <div className="row g-4">
          
          {/* YoY Salary Growth Area Chart */}
          <div className="col-12 col-lg-7">
            <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl h-100">
              <div className="d-flex items-center justify-between pb-3 border-bottom border-gray-100 mb-4">
                <div>
                  <h3 className="h5 font-black text-dark mb-0">Year-over-Year Package Growth (LPA)</h3>
                  <span className="text-muted text-xs font-semibold">5-Year Historical Salary Analysis</span>
                </div>
                <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 font-extrabold text-xs px-3 py-1 rounded-pill">
                  Live Data
                </span>
              </div>
              <PlacementChart data={stats.yearOverYearSalary} />
            </div>
          </div>

          {/* Sector Hiring Pie Distribution Chart */}
          <div className="col-12 col-lg-5">
            <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl h-100">
              <div className="d-flex items-center justify-between pb-3 border-bottom border-gray-100 mb-4">
                <div>
                  <h3 className="h5 font-black text-dark mb-0">Industry Sector Breakdown</h3>
                  <span className="text-muted text-xs font-semibold">Hiring Share Distribution</span>
                </div>
                <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold text-xs px-3 py-1 rounded-pill">
                  2025-26 Season
                </span>
              </div>
              <SectorDistributionChart data={stats.sectorWiseDistribution} />
            </div>
          </div>

        </div>

        {/* Top Recruiting Partners Grid Stage */}
        <div className="space-y-4 pt-2">
          <div className="d-flex items-center justify-between">
            <div>
              <h3 className="h4 font-black text-dark mb-0">Top Corporate Recruiting Partners</h3>
              <p className="text-muted text-xs font-semibold mb-0">Companies making 10+ offers per placement season</p>
            </div>
          </div>

          <div className="row g-3">
            {stats.topRecruitingPartners.map((partner, i) => (
              <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-3">
                <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 text-center saas-card-hover h-100 d-flex flex-column items-center justify-center space-y-2 shadow-md">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black d-flex items-center justify-center text-base shadow-md shadow-indigo-500/30">
                    {partner.logo}
                  </div>
                  <div className="w-100 pt-1">
                    <h4 className="font-extrabold text-dark text-sm mb-0">{partner.name}</h4>
                    <span className="text-emerald-600 font-black text-xs block mt-0.5">
                      {partner.avgPackage} Avg
                    </span>
                    <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold text-[10px] px-2 py-0.5 rounded-pill mt-1">
                      {partner.offersCount} Offers Made
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
