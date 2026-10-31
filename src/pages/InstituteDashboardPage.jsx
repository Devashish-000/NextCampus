import React, { useState, useEffect } from 'react';
import {
  FiUsers,
  FiEye,
  FiTrendingUp,
  FiSettings,
  FiCheckCircle,
  FiSearch,
  FiDownload,
  FiPhone,
  FiMail,
  FiMessageCircle,
  FiFilter,
  FiAward,
  FiClock,
  FiChevronDown,
  FiEdit,
  FiZap,
} from 'react-icons/fi';
import axiosInstance from '../services/axiosInstance';
import { leadService } from '../services/leadService';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { CollegeModal } from '../components/admin/CollegeModal';

export const InstituteDashboardPage = () => {
  const { user } = useAuth();

  const [analytics, setAnalytics] = useState({
    profileViews: 14200,
    studentsBookmarked: 3820,
    conversionRate: 24,
    totalLeads: 0,
    newLeads: 0,
    convertedLeads: 0,
    profileActivity: [],
  });

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collegeData, setCollegeData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // CRM Filter & Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.id) return;

        // 1. Fetch Analytics
        try {
          const analyticsRes = await axiosInstance.get(`/institute/analytics/${user.id}`);
          if (analyticsRes.data) {
            setAnalytics((prev) => ({ ...prev, ...analyticsRes.data }));
          }
        } catch (e) {
          console.warn('Analytics API error:', e.message);
        }

        // 2. Fetch College Data if linked
        if (user.collegeId) {
          try {
            const collegeRes = await axiosInstance.get(`/colleges/${user.collegeId}`);
            setCollegeData(collegeRes.data);
          } catch (e) {
            console.warn('College fetch error:', e.message);
          }
        }

        // 3. Fetch Real-Time CRM Leads
        const leadsData = await leadService.getInstituteLeads(user.collegeId || 'clg-1');
        if (leadsData && leadsData.data) {
          setLeads(leadsData.data);
          if (leadsData.metrics) {
            setAnalytics((prev) => ({
              ...prev,
              totalLeads: leadsData.metrics.totalLeads,
              newLeads: leadsData.metrics.newCount,
              convertedLeads: leadsData.metrics.admittedCount,
              conversionRate: leadsData.metrics.conversionRate,
            }));
          }
        }
      } catch (err) {
        toast.error('Failed to load institute dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  // Status Change Handler
  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await leadService.updateLeadStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
      );
      toast.success(`Lead status updated to ${newStatus}`);
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  // Export Leads to CSV for Admissions Team
  const handleExportCSV = () => {
    if (!leads || leads.length === 0) {
      toast.error('No leads available to export.');
      return;
    }

    const headers = ['Student Name', 'Email', 'Phone', 'City', 'Course Interested', 'Exam', 'Score', 'Status', 'Date Received'];
    const rows = leads.map((l) => [
      `"${l.studentName || ''}"`,
      `"${l.studentEmail || ''}"`,
      `"${l.studentPhone || ''}"`,
      `"${l.studentCity || ''}"`,
      `"${l.courseInterested || ''}"`,
      `"${l.examTaken || ''}"`,
      `"${l.score || ''}"`,
      `"${l.status || 'New'}"`,
      `"${new Date(l.createdAt).toLocaleDateString('en-IN')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `admissions_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('Leads exported to CSV successfully!');
  };

  // College Profile Edit Modal
  const handleEditClick = () => {
    if (!collegeData) {
      setCollegeData({
        name: user.fullName?.replace(' Rep', '') || 'Premier Institute Profile',
        stream: 'Engineering',
        nirfRank: 12,
        totalFees: 640000,
        avgSalary: 1650000,
        highestSalary: 5400000,
        rating: 4.7,
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveCollege = async (updatedData) => {
    try {
      if (collegeData && collegeData._id) {
        const response = await axiosInstance.put(`/colleges/${collegeData._id}`, updatedData);
        setCollegeData(response.data.data || response.data);
        toast.success('College profile updated successfully!');
      } else {
        toast.success('College profile saved!');
        setCollegeData({ ...updatedData, _id: 'demo-inst-id' });
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to update college profile');
      console.error(error);
    }
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      l.studentName?.toLowerCase().includes(query) ||
      l.studentEmail?.toLowerCase().includes(query) ||
      l.studentPhone?.includes(query) ||
      l.courseInterested?.toLowerCase().includes(query) ||
      l.studentCity?.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'New':
        return 'bg-indigo-100 text-indigo-700 border-indigo-200';
      case 'Contacted':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'Counseling':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Admitted':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Archived':
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  if (loading) {
    return (
      <div className="w-100 min-vh-100 bg-tech-grid d-flex flex-column items-center justify-center space-y-3 py-16">
        <div className="spinner-border text-indigo-600" role="status">
          <span className="visually-hidden">Loading CRM Portal...</span>
        </div>
        <p className="text-xs font-bold text-muted">Loading Institute CRM & Admissions Desk...</p>
      </div>
    );
  }

  return (
    <div className="w-100 min-vh-100 bg-slate-50/70 py-6">
      <div className="container-xl max-w-7xl mx-auto px-4 space-y-6">
        
        {/* Portal Header */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm d-flex flex-column flex-md-row items-md-center justify-between gap-4">
          <div className="d-flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white d-flex items-center justify-center font-black text-xl shadow-md shrink-0">
              {collegeData?.shortName ? collegeData.shortName.substring(0, 2) : 'IN'}
            </div>
            <div>
              <div className="d-flex items-center gap-2 mb-1">
                <span className="badge bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-pill">
                  <FiCheckCircle className="inline mr-1" /> Verified Partner Institute
                </span>
                <span className="text-xs text-muted font-bold">B2B SaaS Portal</span>
              </div>
              <h1 className="h4 font-black text-dark mb-0">
                {collegeData?.name || user?.fullName || 'Institute Admissions Portal'}
              </h1>
              <p className="text-xs text-muted mb-0">
                Manage incoming student admission inquiries, counseling pipeline, and campus profile.
              </p>
            </div>
          </div>

          <div className="d-flex items-center gap-2">
            <button
              type="button"
              onClick={handleExportCSV}
              className="btn btn-outline-secondary btn-sm font-extrabold rounded-xl text-xs px-3.5 py-2.5 d-inline-flex items-center gap-1.5 shadow-xs"
            >
              <FiDownload className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              type="button"
              onClick={handleEditClick}
              className="btn btn-saas-primary btn-sm font-extrabold rounded-xl text-xs px-4 py-2.5 d-inline-flex items-center gap-1.5 shadow-md shadow-indigo-500/20"
            >
              <FiEdit className="w-3.5 h-3.5" />
              <span>Edit Campus Profile</span>
            </button>
          </div>
        </div>

        {/* Top KPI Metrics Row */}
        <div className="row g-4">
          {/* Total Leads */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm h-100 hover:shadow-md transition-shadow">
              <div className="d-flex items-center justify-between mb-3">
                <span className="text-xs font-black text-muted uppercase tracking-wider">Total Inquiries</span>
                <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-2xl">
                  <FiUsers className="w-5 h-5" />
                </div>
              </div>
              <h3 className="h3 font-black text-dark mb-1">{leads.length}</h3>
              <p className="text-xs text-emerald-600 font-extrabold mb-0 d-flex items-center gap-1">
                <FiTrendingUp className="w-3.5 h-3.5" />
                <span>+18% from AI Predictor</span>
              </p>
            </div>
          </div>

          {/* New Leads Actionable */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm h-100 hover:shadow-md transition-shadow">
              <div className="d-flex items-center justify-between mb-3">
                <span className="text-xs font-black text-muted uppercase tracking-wider">New Actionable</span>
                <div className="p-2.5 bg-rose-50 text-rose-600 rounded-2xl">
                  <FiZap className="w-5 h-5" />
                </div>
              </div>
              <h3 className="h3 font-black text-dark mb-1">
                {leads.filter((l) => l.status === 'New').length}
              </h3>
              <p className="text-xs text-rose-600 font-extrabold mb-0">Requires Counselor Callback</p>
            </div>
          </div>

          {/* In Counseling */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm h-100 hover:shadow-md transition-shadow">
              <div className="d-flex items-center justify-between mb-3">
                <span className="text-xs font-black text-muted uppercase tracking-wider">In Counseling</span>
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-2xl">
                  <FiClock className="w-5 h-5" />
                </div>
              </div>
              <h3 className="h3 font-black text-dark mb-1">
                {leads.filter((l) => l.status === 'Counseling').length}
              </h3>
              <p className="text-xs text-amber-600 font-extrabold mb-0">Active Round Interviews</p>
            </div>
          </div>

          {/* Conversion Rate */}
          <div className="col-12 col-sm-6 col-lg-3">
            <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm h-100 hover:shadow-md transition-shadow">
              <div className="d-flex items-center justify-between mb-3">
                <span className="text-xs font-black text-muted uppercase tracking-wider">Conversion Rate</span>
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <FiAward className="w-5 h-5" />
                </div>
              </div>
              <h3 className="h3 font-black text-dark mb-1">{analytics.conversionRate}%</h3>
              <p className="text-xs text-emerald-600 font-extrabold mb-0">
                {leads.filter((l) => l.status === 'Admitted').length} Admitted Candidates
              </p>
            </div>
          </div>
        </div>

        {/* LEAD MANAGEMENT CRM CONSOLE */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          
          {/* CRM Controls Bar */}
          <div className="p-5 border-b border-gray-100 d-flex flex-column flex-lg-row items-lg-center justify-between gap-4">
            <div>
              <h3 className="h5 font-black text-dark mb-0">Student Admissions Lead Pipeline</h3>
              <p className="text-xs text-muted mb-0">
                Direct student inquiries submitted from college profile and AI predictor
              </p>
            </div>

            <div className="d-flex flex-column flex-sm-row items-sm-center gap-3">
              {/* Search Bar */}
              <div className="input-group" style={{ minWidth: '240px' }}>
                <span className="input-group-text bg-slate-50 border-gray-200 text-slate-400">
                  <FiSearch className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-control text-xs font-semibold rounded-e-xl border-gray-200 py-2 focus:border-indigo-500"
                  placeholder="Search student, city, course..."
                />
              </div>

              {/* Status Filter Tabs */}
              <div className="d-inline-flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
                {['All', 'New', 'Contacted', 'Counseling', 'Admitted'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`btn btn-sm text-[11px] font-black px-3 py-1.5 rounded-xl transition-all ${
                      statusFilter === status
                        ? 'bg-white text-indigo-700 shadow-xs'
                        : 'text-slate-600 hover:text-dark'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* CRM Leads Table */}
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-slate-50 border-bottom border-gray-200/80 text-[11px] font-extrabold text-muted uppercase tracking-wider">
                <tr>
                  <th className="ps-5 py-3">Student Candidate</th>
                  <th className="py-3">Contact Details</th>
                  <th className="py-3">Course / Specialization</th>
                  <th className="py-3">Exam Score</th>
                  <th className="py-3">Status Stage</th>
                  <th className="py-3">Received</th>
                  <th className="pe-5 py-3 text-end">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs font-medium">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-12 text-muted">
                      No admission inquiries found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead._id}>
                      {/* Candidate Name & City */}
                      <td className="ps-5 py-3.5">
                        <div className="d-flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 font-black text-xs d-flex items-center justify-center shrink-0">
                            {lead.studentName?.charAt(0) || 'S'}
                          </div>
                          <div>
                            <span className="font-extrabold text-dark d-block">{lead.studentName}</span>
                            <span className="text-[11px] text-muted">{lead.studentCity || 'India'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Contact Details */}
                      <td className="py-3.5">
                        <div className="space-y-0.5">
                          <span className="d-block font-semibold text-slate-700">{lead.studentPhone}</span>
                          <span className="text-[11px] text-muted d-block text-truncate" style={{ maxWidth: '170px' }}>
                            {lead.studentEmail}
                          </span>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5">
                        <span className="badge bg-slate-100 text-slate-800 font-bold px-2.5 py-1 rounded-pill text-[11px]">
                          {lead.courseInterested || 'B.Tech CSE'}
                        </span>
                      </td>

                      {/* Score */}
                      <td className="py-3.5">
                        <div>
                          <span className="font-black text-indigo-600">{lead.score ? `${lead.score}%` : 'N/A'}</span>
                          <span className="text-[10px] text-muted d-block uppercase font-bold">{lead.examTaken || 'JEE'}</span>
                        </div>
                      </td>

                      {/* Status Stage with Dropdown */}
                      <td className="py-3.5">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          className={`form-select form-select-sm text-xs font-extrabold py-1 px-2.5 rounded-pill border ${getStatusBadgeClass(
                            lead.status
                          )}`}
                          style={{ width: 'auto', minWidth: '110px' }}
                        >
                          <option value="New">🔥 New</option>
                          <option value="Contacted">📞 Contacted</option>
                          <option value="Counseling">🤝 Counseling</option>
                          <option value="Admitted">🎉 Admitted</option>
                          <option value="Archived">📁 Archived</option>
                        </select>
                      </td>

                      {/* Received Time */}
                      <td className="py-3.5 text-muted text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </td>

                      {/* Quick Actions (WhatsApp, Call, Mail) */}
                      <td className="pe-5 py-3.5 text-end">
                        <div className="d-inline-flex items-center gap-1.5">
                          {/* WhatsApp Action */}
                          {lead.studentPhone && (
                            <a
                              href={`https://wa.me/${lead.studentPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                                lead.studentName
                              )},%20this%20is%20from%20the%20admissions%20office.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-light p-2 rounded-xl text-emerald-600 hover:bg-emerald-50"
                              title="Chat on WhatsApp"
                            >
                              <FiMessageCircle className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Phone Call Action */}
                          {lead.studentPhone && (
                            <a
                              href={`tel:${lead.studentPhone}`}
                              className="btn btn-sm btn-light p-2 rounded-xl text-indigo-600 hover:bg-indigo-50"
                              title="Call Student"
                            >
                              <FiPhone className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Email Action */}
                          {lead.studentEmail && (
                            <a
                              href={`mailto:${lead.studentEmail}?subject=Regarding%20Your%20Admission%20Inquiry`}
                              className="btn btn-sm btn-light p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                              title="Send Email"
                            >
                              <FiMail className="w-3.5 h-3.5" />
                            </a>
                          )}
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

      {/* College Profile Modal for Editing */}
      {isModalOpen && (
        <CollegeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCollege}
          college={collegeData}
        />
      )}
    </div>
  );
};
