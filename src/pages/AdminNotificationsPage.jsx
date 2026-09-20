import React, { useState, useEffect } from 'react';
import { FiSend, FiBell, FiTrash2, FiAlertCircle, FiInfo, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axios from 'axios';

export const AdminNotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotif, setNewNotif] = useState({ message: '', type: 'Alert' });

  const fetchNotifications = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:5000/api/notifications');
      setNotifications(res.data);
    } catch (err) {
      toast.error('Failed to fetch notifications');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSend = async () => {
    if (!newNotif.message) return toast.error('Enter notification message.');
    
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/notifications', newNotif);
      setNotifications([res.data, ...notifications]);
      setNewNotif({ message: '', type: 'Alert' });
      toast.success('Notification pushed to all users!');
    } catch (err) {
      toast.error('Failed to send notification');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/notifications/${id}`);
      setNotifications(notifications.filter(n => n._id !== id));
      toast.success('Notification deleted');
    } catch (err) {
      toast.error('Failed to delete notification');
    }
  };

  const getIconForType = (type) => {
    switch(type) {
      case 'Alert': return <FiAlertCircle className="text-rose-600" />;
      case 'Scholarship': return <FiDollarSign className="text-emerald-600" />;
      case 'Placement': return <FiBriefcase className="text-indigo-600" />;
      case 'System Update': return <FiInfo className="text-amber-600" />;
      default: return <FiBell className="text-gray-600" />;
    }
  };

  const getBgForType = (type) => {
    switch(type) {
      case 'Alert': return 'bg-rose-100';
      case 'Scholarship': return 'bg-emerald-100';
      case 'Placement': return 'bg-indigo-100';
      case 'System Update': return 'bg-amber-100';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        <div className="d-flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="h3 font-black text-dark mb-1">Push Notifications</h1>
            <p className="text-sm text-gray-500 mb-0">Broadcast alerts and updates to all registered students.</p>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-5 shadow-sm">
          <h5 className="font-bold text-indigo-900 mb-3 d-flex items-center gap-2">
            <FiSend /> Send New Broadcast
          </h5>
          <div className="row g-3">
            <div className="col-md-8">
              <input 
                type="text" 
                value={newNotif.message}
                onChange={e => setNewNotif({...newNotif, message: e.target.value})}
                placeholder="Enter your message here..." 
                className="form-control form-control-lg border-0 shadow-sm rounded-xl"
              />
            </div>
            <div className="col-md-2">
              <select 
                value={newNotif.type}
                onChange={e => setNewNotif({...newNotif, type: e.target.value})}
                className="form-select form-select-lg border-0 shadow-sm rounded-xl"
              >
                <option value="Alert">Alert</option>
                <option value="Scholarship">Scholarship</option>
                <option value="Placement">Placement</option>
                <option value="System Update">System Update</option>
              </select>
            </div>
            <div className="col-md-2">
              <button onClick={handleSend} className="btn btn-indigo w-100 py-2 rounded-xl font-bold shadow-md" style={{ height: '48px' }}>
                Push Live
              </button>
            </div>
          </div>
          
          {/* Message Live Preview (Moved outside row to prevent button stretching) */}
          {newNotif.message && (
            <div className="mt-3 p-3 bg-white rounded-xl border border-indigo-100 shadow-sm d-flex items-center gap-3 w-75">
               <div className={`p-2 rounded-full ${getBgForType(newNotif.type)}`}>
                  {getIconForType(newNotif.type)}
               </div>
               <div>
                 <p className="font-bold text-dark mb-0 text-sm">{newNotif.message}</p>
                 <p className="text-xs text-gray-500 mb-0">{newNotif.type} • Preview</p>
               </div>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 shadow-sm rounded-3xl overflow-hidden mt-5">
          <div className="p-4 border-b border-gray-200 bg-slate-50">
            <h5 className="mb-0 font-bold text-dark d-flex items-center gap-2">
              <FiBell /> Sent History
            </h5>
          </div>
          <div className="p-4 space-y-3">
            {notifications.map(n => (
              <div key={n._id} className="d-flex justify-content-between items-center p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="d-flex items-center gap-3">
                  <div className={`p-2 rounded-full ${getBgForType(n.type)}`}>
                    {getIconForType(n.type)}
                  </div>
                  <div>
                    <p className="font-bold text-dark mb-0">{n.message}</p>
                    <p className="text-xs text-gray-500 mb-0">{n.type} • {new Date(n.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(n._id)} className="btn btn-sm text-gray-400 hover:text-rose-600">
                  <FiTrash2 />
                </button>
              </div>
            ))}
            {notifications.length === 0 && (
              <p className="text-center text-gray-500 my-4">No notifications sent yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
