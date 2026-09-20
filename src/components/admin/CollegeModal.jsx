import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

export const CollegeModal = ({ isOpen, onClose, onSave, editingCollege }) => {
  const [formData, setFormData] = useState({
    name: '',
    stream: 'Engineering',
    nirfRank: '',
    logo: 'https://via.placeholder.com/150', // Default logo placeholder
    totalFees: '',
    highestPackage: '',
    avgPackage: '',
    rating: '',
  });

  useEffect(() => {
    if (editingCollege) {
      setFormData(editingCollege);
    } else {
      setFormData({
        name: '',
        stream: 'Engineering',
        nirfRank: '',
        logo: 'https://via.placeholder.com/150',
        totalFees: '',
        highestPackage: '',
        avgPackage: '',
        rating: '',
      });
    }
  }, [editingCollege, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl">
        <div className="p-4 sm:p-6 flex justify-between items-center bg-slate-900 text-white">
          <h3 className="text-xl font-black mb-0">
            {editingCollege ? 'Edit University' : 'Add New University'}
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <FiX className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-700 uppercase">College Name</label>
              <input required type="text" name="name" value={formData.name} onChange={handleChange} className="form-control rounded-xl border-gray-300" placeholder="e.g. IIT Bombay" />
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-700 uppercase">Stream</label>
              <select name="stream" value={formData.stream} onChange={handleChange} className="form-select rounded-xl border-gray-300">
                <option value="Engineering">Engineering</option>
                <option value="Management">Management</option>
                <option value="Medical">Medical</option>
                <option value="Law">Law</option>
              </select>
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-700 uppercase">NIRF Rank</label>
              <input required type="number" name="nirfRank" value={formData.nirfRank} onChange={handleChange} className="form-control rounded-xl border-gray-300" placeholder="e.g. 1" />
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-700 uppercase">Logo URL</label>
              <input type="text" name="logo" value={formData.logo} onChange={handleChange} className="form-control rounded-xl border-gray-300" placeholder="https://..." />
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-700 uppercase">Total Fees</label>
              <input required type="text" name="totalFees" value={formData.totalFees} onChange={handleChange} className="form-control rounded-xl border-gray-300" placeholder="e.g. ₹9.00 Lakhs" />
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-700 uppercase">Highest Package</label>
              <input required type="text" name="highestPackage" value={formData.highestPackage} onChange={handleChange} className="form-control rounded-xl border-gray-300" placeholder="e.g. ₹3.70 Cr" />
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-700 uppercase">Average Package</label>
              <input required type="text" name="avgPackage" value={formData.avgPackage} onChange={handleChange} className="form-control rounded-xl border-gray-300" placeholder="e.g. ₹23.50 Lakhs" />
            </div>
            <div className="space-y-1 text-start">
              <label className="text-xs font-bold text-gray-700 uppercase">Rating (out of 5)</label>
              <input required type="number" step="0.1" max="5" name="rating" value={formData.rating} onChange={handleChange} className="form-control rounded-xl border-gray-300" placeholder="e.g. 4.9" />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-4">
            <button type="button" onClick={onClose} className="btn btn-light px-4 py-2 font-bold rounded-xl bg-gray-200">Cancel</button>
            <button type="submit" className="btn btn-primary px-6 py-2 font-bold rounded-xl" style={{ backgroundColor: '#4f46e5', borderColor: '#4f46e5' }}>Save College</button>
          </div>
        </form>
      </div>
    </div>
  );
};