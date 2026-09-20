import React, { useState } from 'react';
import { FiStar, FiCheck, FiX, FiCheckCircle, FiThumbsUp, FiMessageSquare } from 'react-icons/fi';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MOCK_REVIEWS } from '../../mocks/reviewsData';

export const ReviewsSection = () => {
  const [filterCategory, setFilterCategory] = useState('All');

  const categories = ['All', '5 Star Ratings', 'Engineering B.Tech', 'MBA / Management'];

  const filteredReviews = MOCK_REVIEWS.filter((rev) => {
    if (filterCategory === '5 Star Ratings') return rev.rating >= 4.8;
    if (filterCategory === 'Engineering B.Tech') return rev.course.includes('B.Tech') || rev.course.includes('CS');
    if (filterCategory === 'MBA / Management') return rev.course.includes('MBA') || rev.course.includes('PGDM');
    return true;
  });

  return (
    <section className="saas-section bg-transparent relative">
      <div className="container px-3 px-md-5 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="text-indigo-600 font-bold text-xs uppercase tracking-wider d-block mb-1">
            AUTHENTIC STUDENT FEEDBACK
          </span>
          <h2 className="fw-extrabold text-dark display-6">Verified Student Reviews & Alumni Ratings</h2>
          <p className="text-muted text-sm">
            Transparent insights shared by current students and alumni regarding campus life, placements, and faculty.
          </p>
        </div>

        {/* Overall Rating & Category Filter Bar */}
        <div className="saas-card p-3.5 mb-5 max-w-4xl mx-auto d-flex flex-column flex-md-row items-center justify-between gap-3 bg-white/90 border border-indigo-100 shadow-sm backdrop-blur-md">
          <div className="d-flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white d-flex items-center justify-center font-black text-xl shrink-0 shadow-md shadow-amber-500/30">
              4.8
            </div>
            <div>
              <div className="d-flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-muted text-xs font-bold">Based on 100,000+ Verified Student Audits</span>
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`btn btn-sm px-3.5 py-1.5 rounded-pill font-bold text-xs transition-all ${
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 border-indigo-600'
                    : 'bg-white text-secondary border hover:bg-indigo-50 hover:text-indigo-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Equal-Height Reviews Grid */}
        <div className="row g-4 items-stretch">
          {filteredReviews.slice(0, 4).map((rev) => (
            <div key={rev.id} className="col-12 col-md-6">
              <div className="saas-card p-4 p-md-5 h-100 border border-gray-200/90 saas-card-hover d-flex flex-column justify-between bg-white/90 backdrop-blur-md">
                <div className="space-y-4">
                  
                  {/* Header: Student Avatar, Name, Verified Badge, Star Pill */}
                  <div className="d-flex items-center justify-between pb-3 border-bottom border-gray-100">
                    <div className="d-flex items-center gap-3">
                      <div className="position-relative shrink-0">
                        <img
                          src={rev.avatar}
                          alt={rev.author}
                          className="w-12 h-12 rounded-circle object-cover border-2 border-indigo-500/40 p-0.5 shadow-xs"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                          }}
                        />
                        <span className="position-absolute bottom-0 end-0 p-1 bg-emerald-500 rounded-circle border border-white" title="Verified Alumni" />
                      </div>
                      <div>
                        <div className="d-flex items-center gap-1.5">
                          <h6 className="fw-extrabold text-dark mb-0 text-base">{rev.author}</h6>
                          <FiCheckCircle className="text-emerald-500 w-4 h-4 shrink-0" title="Verified Student" />
                        </div>
                        <span className="text-muted text-xs font-semibold">
                          {rev.course} • Batch {rev.batchYear}
                        </span>
                      </div>
                    </div>

                    <div className="d-flex items-center gap-1 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-pill">
                      <FiStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-black text-amber-900">{rev.rating} / 5</span>
                    </div>
                  </div>

                  {/* Review Title & Description */}
                  <div>
                    <h5 className="font-extrabold text-dark text-base mb-2">{rev.title}</h5>
                    <p className="text-secondary text-sm leading-relaxed mb-0">{rev.content}</p>
                  </div>

                  {/* 2-Column Green Pros vs Rose Cons */}
                  <div className="row g-2 pt-2 text-xs">
                    <div className="col-12 col-sm-6">
                      <div className="p-3 bg-emerald-50/90 border border-emerald-200/90 rounded-xl h-100">
                        <span className="font-bold text-emerald-800 uppercase tracking-wider d-block mb-1 d-flex items-center gap-1">
                          <FiCheck className="text-emerald-600 font-bold" /> Pros
                        </span>
                        <p className="text-emerald-900 mb-0 leading-relaxed font-medium">{rev.pros}</p>
                      </div>
                    </div>

                    <div className="col-12 col-sm-6">
                      <div className="p-3 bg-rose-50/90 border border-rose-200/90 rounded-xl h-100">
                        <span className="font-bold text-rose-800 uppercase tracking-wider d-block mb-1 d-flex items-center gap-1">
                          <FiX className="text-rose-600 font-bold" /> Cons
                        </span>
                        <p className="text-rose-900 mb-0 leading-relaxed font-medium">{rev.cons}</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Info */}
                <div className="pt-3 mt-4 border-top border-gray-100 d-flex items-center justify-between text-xs text-muted">
                  <span>University: <strong className="text-dark font-bold">{rev.collegeName}</strong></span>
                  <span className="fw-bold text-indigo-600 d-flex items-center gap-1">
                    <FiThumbsUp className="w-3.5 h-3.5" /> Helpful ({rev.helpfulCount})
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
