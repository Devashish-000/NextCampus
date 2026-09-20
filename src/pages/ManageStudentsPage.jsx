import React, { useState } from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiSearch } from 'react-icons/fi';

export const ManageStudentsPage = () => {
  // Mock student data
  const [students] = useState([
    { id: 1, name: 'Aarav Sharma', email: 'aarav@example.com', stream: 'Engineering', status: 'Active', joined: '2025-01-15' },
    { id: 2, name: 'Ananya Iyer', email: 'ananya@example.com', stream: 'Management', status: 'Active', joined: '2025-02-15' },
    { id: 3, name: 'Rahul Verma', email: 'rahul@example.com', stream: 'Medical', status: 'Inactive', joined: '2025-03-01' },
    { id: 4, name: 'Priya Patel', email: 'priya@example.com', stream: 'Law', status: 'Active', joined: '2025-04-10' },
  ]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Live filter logic
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.stream.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        <div className="d-flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="h3 font-black text-dark mb-1">Student Management</h1>
            <p className="text-sm text-gray-500 mb-0">View and manage all registered student accounts.</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 d-flex items-center gap-2 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <FiSearch className="text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search students by name, email..." 
              className="border-0 bg-transparent text-sm focus:outline-none w-64 text-dark font-semibold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="row g-4 mb-5">
          <div className="col-12 col-md-4">
            <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="d-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 d-flex items-center justify-center">
                  <FiUsers className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Total Students</p>
                  <p className="h4 font-black text-dark mb-0">{students.length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="d-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 d-flex items-center justify-center">
                  <FiUserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Active Accounts</p>
                  <p className="h4 font-black text-dark mb-0">{students.filter(s => s.status === 'Active').length}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="p-4 bg-white border border-gray-200 shadow-sm rounded-2xl">
              <div className="d-flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 d-flex items-center justify-center">
                  <FiUserX className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Inactive / Suspended</p>
                  <p className="h4 font-black text-dark mb-0">{students.filter(s => s.status !== 'Active').length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-slate-50 border-b border-gray-200 text-xs font-black uppercase text-gray-500 tracking-wider">
                <tr>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Target Stream</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Joined Date</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-5 text-gray-500 font-bold">
                      No students found matching "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="py-3.5 px-4 font-bold text-sm text-dark">{student.name}</td>
                      <td className="py-3.5 px-4 text-sm text-gray-600">{student.email}</td>
                      <td className="py-3.5 px-4 text-sm text-gray-600">{student.stream}</td>
                      <td className="py-3.5 px-4">
                        <span className={`badge ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'} font-extrabold text-xs px-2.5 py-1 rounded-pill`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-sm text-gray-500">{student.joined}</td>
                      <td className="py-3.5 px-4 text-end">
                        <button 
                          className="btn btn-sm btn-light font-bold text-xs rounded-lg text-indigo-600 border border-gray-200 hover:bg-indigo-50 hover:border-indigo-200 transition-colors"
                          onClick={() => setSelectedStudent(student)}
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Profile Modal */}
      {selectedStudent && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-2xl rounded-3xl overflow-hidden">
              <div className="modal-header bg-slate-50 border-b border-gray-100 p-4">
                <h5 className="modal-title font-black text-dark h5 mb-0">Student Profile</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedStudent(null)}></button>
              </div>
              <div className="modal-body p-4 space-y-4">
                <div className="d-flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-600 d-flex items-center justify-center font-black h3 mb-0">
                    {selectedStudent.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-dark mb-1">{selectedStudent.name}</h4>
                    <span className={`badge ${selectedStudent.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'} font-extrabold text-xs px-2.5 py-1 rounded-pill`}>
                      {selectedStudent.status}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 space-y-3">
                  <div className="d-flex justify-content-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500 font-bold text-xs uppercase">Email</span>
                    <span className="text-dark font-semibold text-sm">{selectedStudent.email}</span>
                  </div>
                  <div className="d-flex justify-content-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500 font-bold text-xs uppercase">Target Stream</span>
                    <span className="text-dark font-semibold text-sm">{selectedStudent.stream}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="text-gray-500 font-bold text-xs uppercase">Joined Date</span>
                    <span className="text-dark font-semibold text-sm">{selectedStudent.joined}</span>
                  </div>
                </div>

              </div>
              <div className="modal-footer border-t border-gray-100 p-3 bg-slate-50">
                <button type="button" className="btn btn-light font-bold text-sm px-4 rounded-xl" onClick={() => setSelectedStudent(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

