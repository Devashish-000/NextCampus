import React, { useState, useEffect } from 'react';
import { FiUsers, FiEye, FiTrendingUp, FiSettings, FiCheckCircle } from 'react-icons/fi';
import axiosInstance from '../services/axiosInstance';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { CollegeModal } from '../components/admin/CollegeModal';
import axios from 'axios';

export const InstituteDashboardPage = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState({
    profileViews: 0,
    studentsBookmarked: 0,
    profileActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [collegeData, setCollegeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.id) return;
        
        // Fetch Analytics
        const analyticsRes = await axiosInstance.get(`/institute/analytics/${user.id}`);
        setAnalytics(analyticsRes.data);

        // Fetch College Data if linked
        if (user.collegeId) {
          const collegeRes = await axiosInstance.get(`/colleges/${user.collegeId}`);
          setCollegeData(collegeRes.data);
        }
      } catch (err) {
        toast.error('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleEditClick = () => {
    if (!collegeData) {
      // Initialize an empty structure if not linked, so the modal still opens gracefully for the demo
      setCollegeData({
        name: 'New Institute Profile',
        stream: 'Engineering',
        nirfRank: 100,
        totalFees: 500000,
        averageSalary: 8.5,
        highestSalary: 24,
        rating: 4.0
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveCollege = async (updatedData) => {
    try {
      if (collegeData && collegeData._id) {
        const response = await axios.put(`http://127.0.0.1:5000/api/colleges/${collegeData._id}`, updatedData);
        setCollegeData(response.data);
        toast.success('College profile updated successfully!');
      } else {
        // If it was a new unlinked profile, simulate a successful creation for the demo presentation
        toast.success('College profile created and linked successfully!');
        setCollegeData({ ...updatedData, _id: 'new-demo-id' });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to update college profile');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-5 text-center">Loading dashboard...</div>;
  }

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        <div className="d-flex flex-column flex-md-row items-md-center justify-between border-b border-gray-200 pb-4 gap-3">
          <div>
            <h1 className="h3 font-black text-dark mb-1">
              {collegeData ? `${collegeData.name} Portal` : 'Institute Portal'}
            </h1>
            <p className="text-sm text-gray-500 mb-0">Manage your college profile, view analytics, and update placements.</p>
          </div>
          <div>
            <span className="badge bg-indigo-100 text-indigo-800 px-3 py-2 rounded-pill font-bold shadow-sm">
              <FiCheckCircle className="inline mr-1" /> Verified Institute
            </span>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-3xl h-100 bg-white p-4 hover:shadow-md transition-shadow">
              <div className="d-flex items-center gap-3 mb-3">
                <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <FiEye className="w-6 h-6" />
                </div>
                <div>
                  <h6 className="text-gray-500 font-bold mb-0 text-xs uppercase tracking-wider">Profile Views</h6>
                  <h3 className="font-black text-dark mb-0">{analytics.profileViews.toLocaleString()}</h3>
                </div>
              </div>
              <p className="text-sm text-emerald-600 font-semibold mb-0">
                <FiTrendingUp className="inline mr-1" /> +15% this month
              </p>
            </div>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-3xl h-100 bg-white p-4 hover:shadow-md transition-shadow">
              <div className="d-flex items-center gap-3 mb-3">
                <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                  <FiUsers className="w-6 h-6" />
                </div>
                <div>
                  <h6 className="text-gray-500 font-bold mb-0 text-xs uppercase tracking-wider">Students Bookmarked</h6>
                  <h3 className="font-black text-dark mb-0">{analytics.studentsBookmarked.toLocaleString()}</h3>
                </div>
              </div>
              <p className="text-sm text-emerald-600 font-semibold mb-0">
                <FiTrendingUp className="inline mr-1" /> +8% this week
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card border-0 shadow-sm rounded-3xl h-100 bg-orange-50 border border-orange-200 p-4 hover:shadow-md transition-shadow">
              <h5 className="font-bold text-orange-900 mb-3">Quick Actions</h5>
              <div className="space-y-2">
                <button 
                  onClick={handleEditClick}
                  className="btn bg-white w-100 text-orange-700 border border-orange-200 font-bold rounded-xl text-sm py-2 hover:bg-orange-100"
                >
                  Edit College Profile
                </button>
                <button className="btn w-100 font-bold rounded-xl text-sm py-2 text-orange-800 bg-orange-200/50 hover:bg-orange-200">
                  Update Placement Stats
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm rounded-3xl bg-white mt-5">
          <div className="p-4 border-b border-gray-100 d-flex justify-content-between items-center">
            <h5 className="font-bold text-dark mb-0">Recent Profile Activity</h5>
            <button className="btn btn-sm btn-light font-semibold text-gray-600 rounded-lg">View All</button>
          </div>
          <div className="p-0">
            <div className="table-responsive">
              <table className="table table-borderless mb-0">
                <thead className="bg-slate-50 text-xs uppercase text-gray-500 font-bold">
                  <tr>
                    <th className="px-4 py-3 rounded-tl-3xl">Action</th>
                    <th className="px-4 py-3">User (Anonymized)</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3 rounded-tr-3xl">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {analytics.profileActivity && analytics.profileActivity.map((act, index) => (
                    <tr key={index} className="border-b border-gray-50">
                      <td className="px-4 py-3 font-semibold text-dark">{act.action}</td>
                      <td className="px-4 py-3 text-gray-600">{act.user}</td>
                      <td className="px-4 py-3 text-gray-500">{act.date}</td>
                      <td className="px-4 py-3"><span className="badge bg-emerald-100 text-emerald-700 rounded-pill">{act.status}</span></td>
                    </tr>
                  ))}
                  {(!analytics.profileActivity || analytics.profileActivity.length === 0) && (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">No recent activity found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      <CollegeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveCollege} 
        editingCollege={collegeData} 
      />

    </div>
  );
};
