import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import { MOCK_REVIEWS } from '../mocks/reviewsData';
import { FiUsers, FiAward, FiFileText, FiPlus, FiShield, FiTrash2, FiEdit2, FiTrendingUp } from 'react-icons/fi';
import { CollegeModal } from '../components/admin/CollegeModal';
import toast from 'react-hot-toast';

export const AdminDashboardPage = () => {
  const [colleges, setColleges] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch colleges from Backend
  const fetchColleges = async () => {
    try {
      const response = await axiosInstance.get('/colleges');
      const list = Array.isArray(response.data) ? response.data : (response.data?.data || []);
      setColleges([...list].reverse());
    } catch (error) {
      toast.error('Failed to fetch colleges from Database!');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  // Handlers
  const handleAddClick = () => {
    setEditingCollege(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (college) => {
    setEditingCollege(college);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this college?')) {
      try {
        await axiosInstance.delete(`/colleges/${id}`);
        toast.success('College deleted successfully');
        setColleges(colleges.filter(c => c._id !== id));
      } catch (error) {
        toast.error('Failed to delete college');
        console.error(error);
      }
    }
  };

  const handleSaveCollege = async (collegeData) => {
    try {
      if (editingCollege) {
        // Update existing college
        const response = await axiosInstance.put(`/colleges/${editingCollege._id}`, collegeData);
        const updated = response.data?.data || response.data;
        setColleges(colleges.map(c => c._id === editingCollege._id ? updated : c));
        toast.success('College updated successfully');
      } else {
        // Create new college
        const response = await axiosInstance.post('/colleges', collegeData);
        const created = response.data?.data || response.data;
        setColleges([created, ...colleges]);
        toast.success('College added successfully');
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to save college');
      console.error(error);
    }
  };

  return (
    <div className="w-100 min-vh-100 bg-slate-50 py-4 font-sans">
      <div className="container px-3 px-md-5 space-y-5">
        
        {/* Header Hero Console */}
        <div className="p-4 p-md-5 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white border border-slate-800 shadow-2xl rounded-3xl d-flex flex-column flex-md-row items-md-center justify-content-between gap-4 relative overflow-hidden group">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>
          
          <div className="space-y-3 relative z-10">
            <span className="badge bg-purple-500/20 text-purple-200 border border-purple-500/30 font-extrabold text-xs px-3 py-1.5 rounded-pill shadow-sm">
              👑 Enterprise Super Admin Console
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-0 drop-shadow-md">
              University Directory Analytics
            </h1>
            <p className="text-white text-xs sm:text-sm font-semibold max-w-2xl mb-0 opacity-90">
              Manage live institute cutoff profiles, verified student reviews, JoSAA/NEET seat matrices, and system user privileges.
            </p>
          </div>

          <button
            onClick={handleAddClick}
            type="button"
            className="btn border-0 text-xs font-black px-4 py-3 rounded-xl shadow-lg shadow-indigo-500/30 d-inline-flex items-center gap-2 shrink-0 hover:scale-105 active:scale-95 transition-all relative z-10 text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500"
          >
            <FiPlus className="w-5 h-5" />
            <span>Add New University</span>
          </button>
        </div>

        {/* Admin Metrics Grid */}
        <div className="row g-4">
          
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-3xl space-y-3 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="d-flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 d-flex items-center justify-center shadow-inner">
                  <FiAward className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Total Colleges</span>
                  <p className="h3 font-black text-slate-800 mb-0 leading-none">{colleges.length}</p>
                </div>
              </div>
              <div className="d-flex items-center justify-between relative z-10 pt-2 border-t border-slate-50">
                <span className="text-xs text-slate-500 font-bold">Active Listings</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-pill d-flex items-center gap-1">
                  <FiTrendingUp /> +12%
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-3xl space-y-3 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="d-flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 d-flex items-center justify-center shadow-inner">
                  <FiFileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Total Reviews</span>
                  <p className="h3 font-black text-slate-800 mb-0 leading-none">{MOCK_REVIEWS.length}</p>
                </div>
              </div>
              <div className="d-flex items-center justify-between relative z-10 pt-2 border-t border-slate-50">
                <span className="text-xs text-slate-500 font-bold">Verified Feed</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-pill d-flex items-center gap-1">
                  <FiTrendingUp /> +8%
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-3xl space-y-3 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="d-flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 d-flex items-center justify-center shadow-inner">
                  <FiShield className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Pending Queue</span>
                  <p className="h3 font-black text-slate-800 mb-0 leading-none">14</p>
                </div>
              </div>
              <div className="d-flex items-center justify-between relative z-10 pt-2 border-t border-slate-50">
                <span className="text-xs text-slate-500 font-bold">Requires Audit</span>
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-pill">
                  Action Needed
                </span>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-lg-3">
            <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-3xl space-y-3 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
              <div className="d-flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 d-flex items-center justify-center shadow-inner">
                  <FiUsers className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-0.5">Active Students</span>
                  <p className="h3 font-black text-slate-800 mb-0 leading-none">12.4k</p>
                </div>
              </div>
              <div className="d-flex items-center justify-between relative z-10 pt-2 border-t border-slate-50">
                <span className="text-xs text-slate-500 font-bold">Total Accounts</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-pill d-flex items-center gap-1">
                  <FiTrendingUp /> +24%
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Listings Management Table Stage */}
        <div className="p-4 p-md-5 bg-white border border-slate-200/90 shadow-sm rounded-3xl space-y-4">
          <div className="d-flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="h5 font-extrabold text-slate-900 mb-1">University Listings Management</h3>
              <span className="text-xs text-slate-500 font-semibold">Live Institute Database Sync</span>
            </div>
            <span className="badge bg-emerald-50 text-emerald-700 font-extrabold text-xs px-3 py-1.5 rounded-pill border border-emerald-200 shadow-sm d-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              MongoDB Connected
            </span>
          </div>

          <div className="table-responsive rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <table className="table table-hover align-middle mb-0 bg-white">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 text-slate-500 text-[10px] font-black uppercase tracking-widest border-0">College Name</th>
                  <th className="py-3 px-4 text-slate-500 text-[10px] font-black uppercase tracking-widest border-0">Stream</th>
                  <th className="py-3 px-4 text-slate-500 text-[10px] font-black uppercase tracking-widest border-0 text-center">NIRF Rank</th>
                  <th className="py-3 px-4 text-slate-500 text-[10px] font-black uppercase tracking-widest border-0 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="text-center py-10">
                      <div className="spinner-border text-indigo-500 spinner-border-sm mb-2" role="status"></div>
                      <div className="text-xs text-slate-500 font-bold">Loading Data from Database...</div>
                    </td>
                  </tr>
                ) : colleges.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-10 text-slate-500 font-bold text-sm bg-slate-50/50">
                      No Colleges in Database. Add a new one to get started!
                    </td>
                  </tr>
                ) : (
                  colleges.map((c) => (
                    <tr key={c._id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-3 px-4 font-bold text-slate-800 text-xs sm:text-sm border-0">
                        <div className="d-flex items-center gap-3">
                          {/* Avatar fallback logic */}
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 d-flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm">
                            {c.logo && !c.logo.includes('placeholder.com') ? (
                              <img src={c.logo} alt="" className="w-100 h-100 object-cover" 
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }} 
                              />
                            ) : null}
                            <span className="font-black text-indigo-400 text-xs uppercase" style={{ display: (c.logo && !c.logo.includes('placeholder.com')) ? 'none' : 'flex' }}>
                              {c.name.substring(0, 2)}
                            </span>
                          </div>
                          <span className="group-hover:text-indigo-600 transition-colors">{c.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-0">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100/50">
                          {c.stream}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-slate-700 text-xs sm:text-sm text-center border-0">
                        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 border border-slate-200 shadow-sm">
                          {c.nirfRank}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-end border-0">
                        <div className="d-flex justify-content-end gap-2">
                          <button 
                            onClick={() => handleEditClick(c)}
                            className="btn btn-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700 border border-emerald-200 hover:border-emerald-300 d-inline-flex items-center justify-center w-8 h-8 p-0 rounded-lg shadow-sm transition-colors"
                            title="Edit College"
                          >
                            <FiEdit2 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(c._id)}
                            className="btn btn-sm bg-rose-50 hover:bg-rose-100 text-rose-600 hover:text-rose-700 border border-rose-200 hover:border-rose-300 d-inline-flex items-center justify-center w-8 h-8 p-0 rounded-lg shadow-sm transition-colors"
                            title="Delete College"
                          >
                            <FiTrash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* The Add/Edit Modal Component */}
      <CollegeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveCollege} 
        editingCollege={editingCollege} 
      />

    </div>
  );
};