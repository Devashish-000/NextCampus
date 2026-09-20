import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiAward, FiCheckCircle, FiStar, FiArrowRight, FiSearch, FiSliders, FiTrendingUp, FiZap } from 'react-icons/fi';
import { rankingService } from '../services/otherServices';
import { STREAMS } from '../constants/collegeData';
import { Pagination } from '../components/common/Pagination';

export const RankingsPage = () => {
  const [rankings, setRankings] = useState([]);
  const [selectedStream, setSelectedStream] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    rankingService.getRankings(selectedStream).then((res) => {
      setRankings(res);
      setCurrentPage(1);
    });
  }, [selectedStream]);

  const filteredRankings = rankings.filter((item) =>
    item.collegeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRankings.length / itemsPerPage) || 1;
  const paginatedRankings = filteredRankings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const topThree = rankings.slice(0, 3);

  const getRankBadgeClass = (rank) => {
    if (rank === 1) return 'bg-amber-500 text-white shadow-md shadow-amber-500/30 font-black';
    if (rank === 2) return 'bg-slate-700 text-white shadow-md font-black';
    if (rank === 3) return 'bg-amber-800 text-white shadow-md font-black';
    return 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-extrabold';
  };

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-4">
        
        {/* Header Bar */}
        <div className="d-flex flex-column flex-md-row items-md-center justify-content-between gap-3 pb-2">
          <div>
            <div className="d-inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <FiAward className="w-4 h-4 text-indigo-600" />
              <span>Ministry of Education Official Data</span>
            </div>
            <h1 className="h2 font-black text-dark mb-1">
              NIRF Official Rankings 2026
            </h1>
            <p className="text-muted text-xs mb-0">
              Verified Ministry of Education rankings based on Teaching, Research, and Graduation Outcomes.
            </p>
          </div>

          {/* Quick Search & Stream Filter */}
          <div className="d-flex flex-wrap items-center gap-2">
            <div className="position-relative">
              <input
                type="text"
                placeholder="Search college or city..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="form-control text-xs font-semibold rounded-xl border-gray-200 py-2.5 ps-8 pe-3 bg-white shadow-xs"
              />
              <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-2.5 text-muted" />
            </div>

            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="form-select text-xs font-bold rounded-xl border-gray-200 py-2.5 px-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-white shadow-xs"
            >
              <option value="All">All Streams</option>
              {STREAMS.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* TOP 3 PODIUM SPOTLIGHT CARDS */}
        {topThree.length >= 3 && searchQuery === '' && currentPage === 1 && (
          <div className="row g-3 pt-2">
            
            {/* Rank 2 - Silver */}
            <div className="col-12 col-md-4 order-2 order-md-1">
              <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 h-100 d-flex flex-column justify-between shadow-md saas-card-hover">
                <div>
                  <div className="d-flex items-center justify-between mb-3">
                    <span className="badge bg-slate-700 text-white font-black text-xs px-3 py-1.5 rounded-pill shadow-sm">
                      SILVER #2
                    </span>
                    <span className="badge bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase">
                      {topThree[1].stream}
                    </span>
                  </div>
                  <h3 className="h6 font-extrabold text-dark mb-1">{topThree[1].collegeName}</h3>
                  <span className="text-xs text-muted font-semibold d-block mb-3">{topThree[1].location}</span>
                  <div className="d-flex items-center justify-between text-xs font-extrabold text-dark pt-2 border-top">
                    <span>NIRF Score:</span>
                    <span className="text-indigo-600 font-black">{topThree[1].overallScore} / 100</span>
                  </div>
                </div>
                <div className="pt-3">
                  <Link to={`/colleges/${topThree[1].collegeId}`} className="btn btn-sm btn-saas-primary w-100 text-xs font-bold py-2 text-decoration-none d-flex items-center justify-center gap-1.5">
                    <span>Explore Profile</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Rank 1 - GOLD SPOTLIGHT */}
            <div className="col-12 col-md-4 order-1 order-md-2">
              <div className="saas-card p-4 p-md-5 bg-gradient-to-b from-slate-900 to-indigo-950 text-white border-2 border-amber-500/80 h-100 d-flex flex-column justify-between shadow-2xl transform md:-translate-y-2">
                <div>
                  <div className="d-flex items-center justify-between mb-3">
                    <span className="badge bg-gradient-to-r from-amber-400 to-amber-600 text-white font-black text-xs px-3 py-1.5 rounded-pill shadow-md d-inline-flex items-center gap-1">
                      <FiZap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      GOLD #1 RANK
                    </span>
                    <span className="badge bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-extrabold uppercase">
                      Top National Institute
                    </span>
                  </div>
                  <h3 className="h5 font-black text-white mb-1">{topThree[0].collegeName}</h3>
                  <span className="text-xs text-indigo-300 font-semibold d-block mb-3">{topThree[0].location}</span>
                  <div className="d-flex items-center justify-between text-xs font-extrabold text-white pt-2 border-top border-slate-800">
                    <span>NIRF Score:</span>
                    <span className="text-amber-400 text-base font-black">{topThree[0].overallScore} / 100</span>
                  </div>
                </div>
                <div className="pt-3">
                  <Link to={`/colleges/${topThree[0].collegeId}`} className="btn btn-sm btn-saas-primary w-100 text-xs py-2.5 text-decoration-none d-flex items-center justify-center gap-1.5">
                    <span>Explore #1 Rank Institute</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Rank 3 - Bronze */}
            <div className="col-12 col-md-4 order-3">
              <div className="saas-card p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 h-100 d-flex flex-column justify-between shadow-md saas-card-hover">
                <div>
                  <div className="d-flex items-center justify-between mb-3">
                    <span className="badge bg-amber-800 text-white font-black text-xs px-3 py-1.5 rounded-pill shadow-sm">
                      BRONZE #3
                    </span>
                    <span className="badge bg-indigo-50 text-indigo-700 text-[10px] font-extrabold uppercase">
                      {topThree[2].stream}
                    </span>
                  </div>
                  <h3 className="h6 font-extrabold text-dark mb-1">{topThree[2].collegeName}</h3>
                  <span className="text-xs text-muted font-semibold d-block mb-3">{topThree[2].location}</span>
                  <div className="d-flex items-center justify-between text-xs font-extrabold text-dark pt-2 border-top">
                    <span>NIRF Score:</span>
                    <span className="text-indigo-600 font-black">{topThree[2].overallScore} / 100</span>
                  </div>
                </div>
                <div className="pt-3">
                  <Link to={`/colleges/${topThree[2].collegeId}`} className="btn btn-sm btn-saas-primary w-100 text-xs font-bold py-2 text-decoration-none d-flex items-center justify-center gap-1.5">
                    <span>Explore Profile</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* High-End Glass Rankings Table */}
        <div className="saas-card p-0 overflow-hidden bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-xl rounded-3xl">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0 text-sm">
              <thead className="bg-slate-900 text-white text-xs uppercase font-extrabold tracking-wider border-bottom border-slate-800">
                <tr>
                  <th className="py-4 px-4 text-center">Rank</th>
                  <th className="py-4 px-4">College Name</th>
                  <th className="py-4 px-4">Stream</th>
                  <th className="py-4 px-4 text-center">NIRF Score</th>
                  <th className="py-4 px-4 text-center">Accreditation</th>
                  <th className="py-4 px-4 text-end">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {paginatedRankings.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-indigo-50/50">
                    
                    {/* Rank Badge Pill */}
                    <td className="py-4 px-4 text-center">
                      <span className={`badge text-xs px-3 py-1.5 rounded-pill ${getRankBadgeClass(item.nirfRank)}`}>
                        #{item.nirfRank}
                      </span>
                    </td>

                    {/* College Name & Location with Avatar Mark */}
                    <td className="py-4 px-4">
                      <div className="d-flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-extrabold text-xs d-flex items-center justify-center shrink-0 shadow-xs">
                          {item.collegeName.split(' ')[0]}
                        </div>
                        <div>
                          <span className="font-extrabold text-dark d-block text-base leading-tight">
                            {item.collegeName}
                          </span>
                          <span className="text-xs text-muted font-semibold mt-0.5 d-block">
                            {item.location}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Stream Pill */}
                    <td className="py-4 px-4">
                      <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200/90 font-extrabold text-xs px-2.5 py-1.5 rounded-pill">
                        {item.stream}
                      </span>
                    </td>

                    {/* NIRF Score with Gradient Progress Bar */}
                    <td className="py-4 px-4 text-center">
                      <div className="max-w-[130px] mx-auto space-y-1">
                        <span className="font-black text-dark text-sm d-block">{item.overallScore} / 100</span>
                        <div className="w-100 bg-slate-200 rounded-full h-2 overflow-hidden shadow-inner">
                          <div
                            className="bg-gradient-to-r from-indigo-600 via-indigo-600 to-purple-600 h-2 rounded-full"
                            style={{ width: `${item.overallScore}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Accreditation Badge */}
                    <td className="py-4 px-4 text-center">
                      <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200/90 font-extrabold text-xs px-3 py-1.5 rounded-pill">
                        {item.accreditation}
                      </span>
                    </td>

                    {/* Enhanced View Profile Button (Gradient CTA Pill) */}
                    <td className="py-4 px-4 text-end">
                      <Link
                        to={`/colleges/${item.collegeId}`}
                        className="btn btn-saas-primary text-xs px-4 py-2 text-decoration-none d-inline-flex items-center gap-1.5 shadow-md hover:-translate-y-0.5 transition-all"
                      >
                        <span>View Profile</span>
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center pt-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

      </div>
    </div>
  );
};
