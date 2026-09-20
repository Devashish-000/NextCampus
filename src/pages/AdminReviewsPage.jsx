import React, { useState, useEffect } from 'react';
import { FiCheck, FiX, FiTrash2, FiStar, FiFilter, FiFileText } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

export const AdminReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('ALL');

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/reviews');
      setReviews(res.data);
    } catch (err) {
      toast.error('Failed to fetch reviews');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleApprove = async (id) => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/reviews/${id}`, { status: 'APPROVED' });
      setReviews(reviews.map(r => r._id === id ? res.data : r));
      toast.success('Review approved successfully!');
    } catch (err) {
      toast.error('Failed to approve review');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axios.put(`http://127.0.0.1:5000/api/reviews/${id}`, { status: 'REJECTED' });
      setReviews(reviews.map(r => r._id === id ? res.data : r));
      toast.error('Review rejected.');
    } catch (err) {
      toast.error('Failed to reject review');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this review?')) {
      try {
        await axios.delete(`http://127.0.0.1:5000/api/reviews/${id}`);
        setReviews(reviews.filter(r => r._id !== id));
        toast.success('Review deleted permanently.');
      } catch (err) {
        toast.error('Failed to delete review');
      }
    }
  };

  const filteredReviews = reviews.filter(r => {
    if (filter === 'ALL') return true;
    return r.status === filter;
  });

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        <div className="d-flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="h3 font-black text-dark mb-1">Review Moderation Queue</h1>
            <p className="text-sm text-gray-500 mb-0">Audit, approve, or reject student reviews before they go live.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 d-flex items-center gap-2">
            <FiFilter className="text-gray-400 w-4 h-4" />
            <select 
              className="border-0 bg-transparent text-sm focus:outline-none w-32 font-medium"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="ALL">All Reviews</option>
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredReviews.map(review => (
            <div key={review._id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="d-flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-dark text-lg mb-1">{review.college}</h4>
                  <div className="d-flex items-center gap-3 text-sm text-gray-500">
                    <span className="font-medium text-indigo-600">{review.author}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                    <span>•</span>
                    <div className="d-flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2 py-0.5 rounded text-xs">
                      <FiStar className="fill-current w-3 h-3" /> {review.rating}
                    </div>
                  </div>
                </div>
                <div>
                  <span className={`badge ${
                    review.status === 'APPROVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                    review.status === 'REJECTED' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 
                    'bg-amber-50 text-amber-700 border border-amber-200'} font-extrabold text-xs px-3 py-1.5 rounded-pill uppercase tracking-wider`}>
                    {review.status}
                  </span>
                </div>
              </div>

              <div className="row g-4 mb-4">
                <div className="col-md-6">
                  <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3 h-100">
                    <p className="text-xs font-bold text-emerald-800 mb-1">PROS</p>
                    <p className="text-sm text-gray-700 mb-0">{review.pros}</p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-3 h-100">
                    <p className="text-xs font-bold text-rose-800 mb-1">CONS</p>
                    <p className="text-sm text-gray-700 mb-0">{review.cons}</p>
                  </div>
                </div>
              </div>

              <div className="d-flex gap-2 justify-content-end border-t border-gray-100 pt-4">
                {review.status === 'PENDING' && (
                  <>
                    <button onClick={() => handleApprove(review._id)} className="btn btn-sm btn-success d-flex items-center gap-2 font-bold px-4">
                      <FiCheck /> Approve
                    </button>
                    <button onClick={() => handleReject(review._id)} className="btn btn-sm btn-warning d-flex items-center gap-2 font-bold px-4 text-white">
                      <FiX /> Reject
                    </button>
                  </>
                )}
                <button onClick={() => handleDelete(review._id)} className="btn btn-sm btn-danger d-flex items-center gap-2 font-bold px-4">
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}

          {filteredReviews.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 border-dashed">
              <FiFileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
              <h5 className="text-gray-500 font-medium">No reviews found in this category.</h5>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
