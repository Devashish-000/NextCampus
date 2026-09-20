import React, { useState } from 'react';
import { FiUploadCloud, FiCheckCircle } from 'react-icons/fi';

export const FileUpload = ({ label, error, onChange, accept = '.pdf,.png,.jpg', helperText }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      if (onChange) onChange(file);
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{label}</label>}
      <label className="relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl cursor-pointer bg-gray-50/50 dark:bg-slate-900/50 transition-colors">
        <input type="file" accept={accept} onChange={handleFileChange} className="hidden" />
        {fileName ? (
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
            <FiCheckCircle className="w-5 h-5" />
            <span>{fileName}</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center">
            <FiUploadCloud className="w-8 h-8 text-indigo-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Click or drag file to upload
            </span>
            <span className="text-xs text-gray-400 mt-1">{helperText || 'PDF, PNG or JPG (Max 5MB)'}</span>
          </div>
        )}
      </label>
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
