import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiBriefcase, FiTrendingUp } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

export const AdminPlacementsPage = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [metrics, setMetrics] = useState({
    highestOffer: '',
    averageSalary: '',
    placementRate: ''
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRecruiter, setNewRecruiter] = useState({ company: '', avgPackage: '', totalOffers: '' });

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/placements');
      if (res.data) {
        setMetrics({
          highestOffer: res.data.highestOffer,
          averageSalary: res.data.averageSalary,
          placementRate: res.data.placementRate
        });
        setRecruiters(res.data.recruiters);
      }
    } catch (err) {
      toast.error('Failed to fetch placements data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Save overall metrics
  const handleSaveChanges = async () => {
    try {
      await axios.put('http://127.0.0.1:5000/api/placements', metrics);
      toast.success('Metrics saved successfully!');
    } catch (err) {
      toast.error('Failed to save metrics');
    }
  };

  // Add recruiter
  const handleAddRecruiter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/placements/recruiters', newRecruiter);
      setRecruiters(res.data.recruiters);
      setIsModalOpen(false);
      setNewRecruiter({ company: '', avgPackage: '', totalOffers: '' });
      toast.success('Recruiter added');
    } catch (err) {
      toast.error('Failed to add recruiter');
    }
  };

  // Delete recruiter
  const handleDeleteRecruiter = async (id) => {
    if (window.confirm('Are you sure you want to remove this recruiter?')) {
      try {
        const res = await axios.delete(`http://127.0.0.1:5000/api/placements/recruiters/${id}`);
        setRecruiters(res.data.recruiters);
        toast.success('Recruiter removed');
      } catch (err) {
        toast.error('Failed to remove recruiter');
      }
    }
  };

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        <div className="d-flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="h3 font-black text-dark mb-1">Placements & Recruiters</h1>
            <p className="text-sm text-gray-500 mb-0">Update top recruiters, average packages, and growth metrics.</p>
          </div>
          <button onClick={handleSaveChanges} className="btn btn-primary d-flex items-center gap-2 font-bold px-4 rounded-xl shadow-sm">
             Save Changes
          </button>
        </div>

        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <label className="text-xs font-bold text-gray-500 uppercase mb-2">Overall Highest Offer</label>
              <div className="d-flex items-center gap-2">
                <FiTrendingUp className="text-emerald-500" />
                <input type="text" value={metrics.highestOffer} onChange={e => setMetrics({...metrics, highestOffer: e.target.value})} className="form-control font-bold" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <label className="text-xs font-bold text-gray-500 uppercase mb-2">Global Average Salary</label>
              <div className="d-flex items-center gap-2">
                <FiBriefcase className="text-indigo-500" />
                <input type="text" value={metrics.averageSalary} onChange={e => setMetrics({...metrics, averageSalary: e.target.value})} className="form-control font-bold" />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
              <label className="text-xs font-bold text-gray-500 uppercase mb-2">Overall Placement Rate %</label>
              <div className="d-flex items-center gap-2">
                <FiTrendingUp className="text-rose-500" />
                <input type="number" value={metrics.placementRate} onChange={e => setMetrics({...metrics, placementRate: e.target.value})} className="form-control font-bold" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden mt-5">
          <div className="p-4 border-b border-gray-200 d-flex justify-between items-center bg-slate-50">
            <h5 className="mb-0 font-bold text-dark">Top Recruiters List</h5>
            <button onClick={() => setIsModalOpen(true)} className="btn btn-sm btn-dark font-bold px-3 rounded-lg d-flex items-center gap-2">
              <FiPlus /> Add Recruiter
            </button>
          </div>
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="text-xs font-black uppercase text-gray-500 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Company Name</th>
                  <th className="py-3 px-4">Avg Package</th>
                  <th className="py-3 px-4">Total Offers</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recruiters.map((rec) => (
                  <tr key={rec._id}>
                    <td className="py-3 px-4 font-bold text-dark">{rec.company}</td>
                    <td className="py-3 px-4 text-emerald-600 font-bold">{rec.avgPackage}</td>
                    <td className="py-3 px-4 text-gray-600 font-medium">{rec.totalOffers} Offers</td>
                    <td className="py-3 px-4 text-end">
                      <button onClick={() => handleDeleteRecruiter(rec._id)} className="btn btn-sm btn-light text-rose-600 rounded-lg">
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
                {recruiters.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-center py-5 text-gray-500">
                      No recruiters added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add Recruiter Modal */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-2xl rounded-3xl overflow-hidden">
              <div className="modal-header bg-slate-50 border-b border-gray-100 p-4">
                <h5 className="modal-title font-black text-dark h5 mb-0">Add Recruiter</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <form onSubmit={handleAddRecruiter}>
                <div className="modal-body p-4 space-y-3">
                  <div>
                    <label className="form-label text-xs font-bold text-gray-500 uppercase">Company Name</label>
                    <input type="text" value={newRecruiter.company} onChange={e => setNewRecruiter({...newRecruiter, company: e.target.value})} className="form-control rounded-xl bg-gray-50 border-gray-200" required />
                  </div>
                  <div>
                    <label className="form-label text-xs font-bold text-gray-500 uppercase">Avg Package</label>
                    <input type="text" placeholder="e.g. 42 LPA" value={newRecruiter.avgPackage} onChange={e => setNewRecruiter({...newRecruiter, avgPackage: e.target.value})} className="form-control rounded-xl bg-gray-50 border-gray-200" required />
                  </div>
                  <div>
                    <label className="form-label text-xs font-bold text-gray-500 uppercase">Total Offers</label>
                    <input type="number" value={newRecruiter.totalOffers} onChange={e => setNewRecruiter({...newRecruiter, totalOffers: e.target.value})} className="form-control rounded-xl bg-gray-50 border-gray-200" required />
                  </div>
                </div>
                <div className="modal-footer border-t border-gray-100 p-3 bg-slate-50">
                  <button type="button" className="btn btn-light font-bold text-sm px-4 rounded-xl" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary font-bold text-sm px-4 rounded-xl">Save Recruiter</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
