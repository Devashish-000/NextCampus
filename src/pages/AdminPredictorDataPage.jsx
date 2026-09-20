import React, { useState, useRef } from 'react';
import { FiUploadCloud, FiDatabase, FiRefreshCw, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';

export const AdminPredictorDataPage = () => {
  const [syncStatus, setSyncStatus] = useState('Idle');
  const [isSyncing, setIsSyncing] = useState(false);
  const fileInputRef = useRef(null);

  const [datasets, setDatasets] = useState([
    { id: 1, name: 'JoSAA 2025 Opening & Closing Ranks', records: '45,210', lastUpdated: '2 months ago', status: 'Active' },
    { id: 2, name: 'NEET 2025 State Merit Lists', records: '12,850', lastUpdated: '3 months ago', status: 'Active' },
    { id: 3, name: 'JoSAA 2026 Round 1 Allotments', records: '15,000', lastUpdated: '2 days ago', status: 'Processing' },
  ]);

  const handleSyncModel = () => {
    if (isSyncing) return;
    setIsSyncing(true);
    toast('Syncing AI Model with latest data...', { icon: '🔄' });
    
    setTimeout(() => {
      setIsSyncing(false);
      toast.success('AI Model Synced Successfully!');
      
      // Mark processing ones as active
      setDatasets(datasets.map(d => d.status === 'Processing' ? { ...d, status: 'Active' } : d));
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv') && !file.name.endsWith('.xlsx')) {
      toast.error('Please upload a CSV or Excel file.');
      return;
    }

    setSyncStatus('Uploading...');
    toast('Uploading file...', { icon: '⏳' });
    
    setTimeout(() => {
      setSyncStatus('Processing AI Matrix...');
      toast('Validating cutoff matrix...', { icon: '🧠' });
      
      setTimeout(() => {
        setSyncStatus('Idle');
        toast.success('File uploaded and queued for processing!');
        
        // Add new dataset to table
        const newDataset = {
          id: Date.now(),
          name: file.name,
          records: Math.floor(Math.random() * 20000 + 5000).toLocaleString(),
          lastUpdated: 'Just now',
          status: 'Processing'
        };
        setDatasets([...datasets, newDataset]);
        
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
      }, 2500);
    }, 2000);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        <div className="d-flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h1 className="h3 font-black text-dark mb-1">AI Predictor Engine</h1>
            <p className="text-sm text-gray-500 mb-0">Upload JoSAA and NEET cutoff matrices to train the AI admission odds model.</p>
          </div>
          <div className="d-flex gap-2">
             <button 
                onClick={handleSyncModel}
                disabled={isSyncing || syncStatus !== 'Idle'}
                className="btn btn-outline-dark d-flex items-center gap-2 font-bold px-4 rounded-xl shadow-sm"
              >
                <FiRefreshCw className={isSyncing ? 'animate-spin' : ''} /> 
                {isSyncing ? 'Syncing...' : 'Sync Model'}
             </button>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-12 col-lg-8">
            <div className="bg-white border border-gray-200 shadow-xl rounded-3xl overflow-hidden h-100">
              <div className="p-4 border-b border-gray-200 bg-slate-50 d-flex justify-content-between items-center">
                <h5 className="mb-0 font-bold text-dark d-flex items-center gap-2">
                  <FiDatabase /> Active Datasets
                </h5>
              </div>
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="text-xs font-black uppercase text-gray-500 tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Dataset Name</th>
                      <th className="py-3 px-4">Records</th>
                      <th className="py-3 px-4">Last Updated</th>
                      <th className="py-3 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {datasets.map((data) => (
                      <tr key={data.id}>
                        <td className="py-3.5 px-4 font-bold text-dark text-sm">{data.name}</td>
                        <td className="py-3.5 px-4 text-gray-600 text-sm font-medium">{data.records}</td>
                        <td className="py-3.5 px-4 text-gray-500 text-sm">{data.lastUpdated}</td>
                        <td className="py-3.5 px-4">
                           <span className={`badge ${data.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'} font-extrabold text-[10px] px-2 py-1 rounded-pill uppercase border`}>
                             {data.status}
                           </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="bg-white p-5 rounded-3xl shadow-xl border border-gray-200 h-100 d-flex flex-col justify-content-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl -z-10"></div>
              
              <div className="w-16 h-16 bg-blue-50 rounded-2xl d-flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-sm text-blue-600">
                <FiUploadCloud className="w-8 h-8" />
              </div>
              <h4 className="font-black mb-2 text-dark">Upload Data File</h4>
              <p className="text-sm text-gray-500 mb-4 px-2 fw-medium leading-relaxed">
                Upload cutoff datasets in CSV format to retrain the AI prediction engine.
              </p>
              
              <input 
                type="file" 
                accept=".csv, .xlsx" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
              />
              
              <button 
                onClick={triggerFileInput}
                disabled={syncStatus !== 'Idle' || isSyncing}
                className="btn btn-primary bg-indigo-600 border-0 font-bold py-3 rounded-xl w-100 hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/30 transition-all"
              >
                {syncStatus !== 'Idle' ? syncStatus : 'Select CSV File'}
              </button>
              
              <div className="mt-4 pt-4 border-t border-gray-100 d-flex justify-content-between text-xs text-gray-500 font-bold">
                <span className="d-flex items-center gap-1"><FiCheckCircle className="text-emerald-500" /> Format: CSV</span>
                <span className="d-flex items-center gap-1"><FiCheckCircle className="text-emerald-500" /> Max: 50MB</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
