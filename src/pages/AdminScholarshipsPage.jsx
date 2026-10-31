import React, { useState, useEffect } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';

export const AdminScholarshipsPage = () => {
  const [scholarships, setScholarships] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    provider: '',
    amount: '',
    deadline: '',
    type: 'Government',
    status: 'Active'
  });

  // Fetch Scholarships
  const fetchScholarships = async () => {
    try {
      const res = await axiosInstance.get('/scholarships');
      const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setScholarships(data);
    } catch (err) {
      toast.error('Failed to fetch scholarships');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchScholarships();
  }, []);

  // Filter based on search query
  const filteredScholarships = scholarships.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handlers
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClick = () => {
    setEditingScholarship(null);
    setFormData({ name: '', provider: '', amount: '', deadline: '', type: 'Government', status: 'Active' });
    setIsModalOpen(true);
  };

  const handleEditClick = (sch) => {
    setEditingScholarship(sch);
    setFormData({
      name: sch.name,
      provider: sch.provider,
      amount: sch.amount,
      deadline: sch.deadline,
      type: sch.type,
      status: sch.status
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        await axiosInstance.delete(`/scholarships/${id}`);
        setScholarships(scholarships.filter(s => s._id !== id));
        toast.success('Scholarship removed');
      } catch (err) {
        toast.error('Failed to delete scholarship');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingScholarship) {
        // Update
        const res = await axiosInstance.put(`/scholarships/${editingScholarship._id}`, formData);
        const updated = res.data?.data || res.data;
        setScholarships(scholarships.map(s => s._id === editingScholarship._id ? updated : s));
        toast.success('Scholarship updated successfully');
      } else {
        // Create
        const res = await axiosInstance.post('/scholarships', formData);
        const created = res.data?.data || res.data;
        setScholarships([created, ...scholarships]);
        toast.success('Scholarship added successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Error saving scholarship');
    }
  };

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        <div className="d-flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="h3 font-black text-dark mb-1">Scholarships Manager</h1>
            <p className="text-sm text-gray-500 mb-0">Add, edit, or remove financial aid programs.</p>
          </div>
          <div className="d-flex gap-3">
            <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 d-flex items-center gap-2">
              <FiSearch className="text-gray-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="border-0 bg-transparent text-sm focus:outline-none w-32" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button onClick={handleAddClick} className="btn btn-primary d-flex items-center gap-2 font-bold px-4 rounded-xl shadow-sm">
              <FiPlus /> Add Scholarship
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-slate-50 border-b border-gray-200 text-xs font-black uppercase text-gray-500 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Scholarship Name & Provider</th>
                  <th className="py-3 px-4">Grant Amount</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredScholarships.map((sch) => (
                  <tr key={sch._id}>
                    <td className="py-4 px-4">
                      <p className="font-bold text-dark text-sm mb-0">{sch.name}</p>
                      <p className="text-xs text-gray-500 mb-0">{sch.provider}</p>
                    </td>
                    <td className="py-4 px-4 font-medium text-emerald-600 text-sm">
                      <div className="d-flex items-center gap-1">
                        <FiDollarSign className="w-3 h-3" /> {sch.amount}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="badge bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold px-2 py-1 rounded">
                        {sch.type}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm font-medium text-amber-600">
                      {sch.deadline}
                    </td>
                    <td className="py-4 px-4 text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button onClick={() => handleEditClick(sch)} className="btn btn-sm btn-light text-indigo-600 rounded-lg">
                          <FiEdit2 />
                        </button>
                        <button onClick={() => handleDelete(sch._id)} className="btn btn-sm btn-light text-rose-600 rounded-lg">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredScholarships.length === 0 && (
                  <tr>
                    <td colSpan="5" className="text-center py-5 text-gray-500">
                      No scholarships found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-2xl rounded-3xl overflow-hidden">
              <div className="modal-header bg-slate-50 border-b border-gray-100 p-4">
                <h5 className="modal-title font-black text-dark h5 mb-0">
                  {editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body p-4 space-y-3">
                  <div>
                    <label className="form-label text-xs font-bold text-gray-500 uppercase">Scholarship Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="form-control rounded-xl bg-gray-50 border-gray-200" required />
                  </div>
                  <div>
                    <label className="form-label text-xs font-bold text-gray-500 uppercase">Provider Name</label>
                    <input type="text" name="provider" value={formData.provider} onChange={handleInputChange} className="form-control rounded-xl bg-gray-50 border-gray-200" required />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <label className="form-label text-xs font-bold text-gray-500 uppercase">Grant Amount</label>
                      <input type="text" name="amount" placeholder="e.g. ₹100,000" value={formData.amount} onChange={handleInputChange} className="form-control rounded-xl bg-gray-50 border-gray-200" required />
                    </div>
                    <div className="col-6">
                      <label className="form-label text-xs font-bold text-gray-500 uppercase">Deadline</label>
                      <input type="date" name="deadline" value={formData.deadline} onChange={handleInputChange} className="form-control rounded-xl bg-gray-50 border-gray-200" required />
                    </div>
                  </div>
                  <div>
                    <label className="form-label text-xs font-bold text-gray-500 uppercase">Type</label>
                    <select name="type" value={formData.type} onChange={handleInputChange} className="form-select rounded-xl bg-gray-50 border-gray-200">
                      <option value="Government">Government</option>
                      <option value="Private Trust">Private Trust</option>
                      <option value="University">University</option>
                      <option value="Corporate">Corporate</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-t border-gray-100 p-3 bg-slate-50">
                  <button type="button" className="btn btn-light font-bold text-sm px-4 rounded-xl" onClick={() => setIsModalOpen(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary font-bold text-sm px-4 rounded-xl">Save Scholarship</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
