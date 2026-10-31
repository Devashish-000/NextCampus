import React, { useState } from 'react';
import {
  FiX,
  FiSend,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiBookOpen,
  FiAward,
  FiShield,
  FiCheckCircle,
} from 'react-icons/fi';
import { useAuth } from '../../../context/AuthContext';
import { leadService } from '../../../services/leadService';
import toast from 'react-hot-toast';

export const ApplyLeadModal = ({ college, isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    studentName: user?.fullName || '',
    studentEmail: user?.email || '',
    studentPhone: user?.phone || '',
    studentCity: user?.city || '',
    courseInterested: 'B.Tech Computer Science & Engineering',
    examTaken: user?.targetExam || 'JEE Main',
    score: user?.entranceScore || '95.5',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen || !college) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.studentName || !formData.studentEmail || !formData.studentPhone) {
      toast.error('Please provide your name, email, and phone number.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        collegeId: college.id || college._id,
        collegeName: college.name,
        studentId: user?.id || user?._id || null,
      };

      const res = await leadService.submitLead(payload);
      toast.success(res.message || 'Application submitted successfully! College counselor will call you.');
      if (onSuccess) onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error('Lead submission failed:', err);
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)', zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 rounded-3xl shadow-2xl overflow-hidden bg-white">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 d-flex items-start justify-between border-b border-slate-800">
            <div className="d-flex items-center gap-3.5">
              <img
                src={college.logo}
                alt={college.shortName || college.name}
                className="w-12 h-12 rounded-2xl bg-white p-1 object-contain border border-white/20 shadow-sm shrink-0"
              />
              <div>
                <span className="badge bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-pill mb-1 d-inline-block">
                  Admissions Office Desk
                </span>
                <h3 className="h5 font-black text-white mb-0 text-truncate max-w-md">
                  Apply to {college.name}
                </h3>
                <p className="text-slate-300 text-xs mb-0">
                  {college.location}, {college.state} • NIRF #{college.nirfRank}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-sm text-slate-400 hover:text-white p-2 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body */}
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            <div className="row g-3">
              
              {/* Full Name */}
              <div className="col-12 col-md-6">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Student Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-slate-50 border-gray-200 text-slate-400">
                    <FiUser className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="form-control text-sm font-semibold rounded-e-xl border-gray-200 py-2.5 focus:border-indigo-500"
                    placeholder="e.g. Aarav Sharma"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="col-12 col-md-6">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-slate-50 border-gray-200 text-slate-400">
                    <FiMail className="w-4 h-4" />
                  </span>
                  <input
                    type="email"
                    required
                    value={formData.studentEmail}
                    onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
                    className="form-control text-sm font-semibold rounded-e-xl border-gray-200 py-2.5 focus:border-indigo-500"
                    placeholder="e.g. aarav@gmail.com"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="col-12 col-md-6">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Mobile Number (WhatsApp) <span className="text-rose-500">*</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-slate-50 border-gray-200 text-slate-400">
                    <FiPhone className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    required
                    value={formData.studentPhone}
                    onChange={(e) => setFormData({ ...formData, studentPhone: e.target.value })}
                    className="form-control text-sm font-semibold rounded-e-xl border-gray-200 py-2.5 focus:border-indigo-500"
                    placeholder="e.g. +91 98765 43210"
                  />
                </div>
              </div>

              {/* City */}
              <div className="col-12 col-md-6">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Current City
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-slate-50 border-gray-200 text-slate-400">
                    <FiMapPin className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={formData.studentCity}
                    onChange={(e) => setFormData({ ...formData, studentCity: e.target.value })}
                    className="form-control text-sm font-semibold rounded-e-xl border-gray-200 py-2.5 focus:border-indigo-500"
                    placeholder="e.g. Mumbai, Maharashtra"
                  />
                </div>
              </div>

              {/* Course Interested */}
              <div className="col-12 col-md-6">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Degree / Branch Interested
                </label>
                <select
                  value={formData.courseInterested}
                  onChange={(e) => setFormData({ ...formData, courseInterested: e.target.value })}
                  className="form-select text-sm font-semibold py-2.5 rounded-xl border-gray-200 focus:border-indigo-500"
                >
                  <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science & Engineering</option>
                  <option value="B.Tech Artificial Intelligence & Data Science">B.Tech Artificial Intelligence & Data Science</option>
                  <option value="B.Tech Electronics & Communication">B.Tech Electronics & Communication</option>
                  <option value="B.Tech Mechanical Engineering">B.Tech Mechanical Engineering</option>
                  <option value="MBA / PGDM (Finance & Marketing)">MBA / PGDM (Finance & Marketing)</option>
                  <option value="MBBS / Health Sciences">MBBS / Health Sciences</option>
                </select>
              </div>

              {/* Exam & Score */}
              <div className="col-12 col-md-6">
                <div className="d-flex items-center justify-between mb-1.5">
                  <label className="text-xs font-extrabold text-dark uppercase tracking-wider mb-0">
                    Entrance Exam & Percentile
                  </label>
                  <span className="text-[10px] text-muted">Latest Test</span>
                </div>
                <div className="input-group">
                  <select
                    value={formData.examTaken}
                    onChange={(e) => setFormData({ ...formData, examTaken: e.target.value })}
                    className="form-select text-xs font-bold border-gray-200"
                    style={{ maxWidth: '130px' }}
                  >
                    <option value="JEE Main">JEE Main</option>
                    <option value="JEE Advanced">JEE Adv</option>
                    <option value="NEET">NEET</option>
                    <option value="CAT">CAT</option>
                    <option value="CUET">CUET</option>
                  </select>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    max="100"
                    value={formData.score}
                    onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                    className="form-control text-sm font-bold border-gray-200"
                    placeholder="%ile"
                  />
                  <span className="input-group-text bg-slate-50 text-xs font-bold text-muted">%</span>
                </div>
              </div>

              {/* Message */}
              <div className="col-12">
                <label className="text-xs font-extrabold text-dark uppercase tracking-wider d-block mb-1.5">
                  Questions for Admissions Counselor (Optional)
                </label>
                <textarea
                  rows="2"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-control text-sm font-semibold rounded-xl border-gray-200 focus:border-indigo-500"
                  placeholder="e.g. Inquiring about scholarship eligibility and Round 2 cutoff status..."
                />
              </div>
            </div>

            {/* Trust Signals */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 d-flex items-center gap-3 text-xs text-muted">
              <FiShield className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Your request is directly routed to <strong>{college.name} Admissions Committee</strong>. Free official counseling with 0 spam.
              </span>
            </div>

            {/* Footer Buttons */}
            <div className="d-flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-light px-4 py-2.5 rounded-xl text-xs font-extrabold text-slate-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-saas-primary px-5 py-2.5 rounded-xl text-xs font-black d-flex items-center gap-2 shadow-lg shadow-indigo-500/25"
              >
                {loading ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <FiSend className="w-3.5 h-3.5" />
                    <span>Submit Admission Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};
