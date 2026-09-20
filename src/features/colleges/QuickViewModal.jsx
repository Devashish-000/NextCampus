import React from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiStar, FiCheck, FiAward, FiDollarSign, FiBookOpen } from 'react-icons/fi';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { formatCurrency } from '../../utils/formatters';

export const QuickViewModal = ({ college, isOpen, onClose }) => {
  if (!college) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={college.shortName || college.name} maxWidth="max-w-3xl">
      <div className="space-y-6">
        {/* Banner */}
        <div className="relative h-48 rounded-2xl overflow-hidden">
          <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
            <div>
              <h2 className="text-xl font-bold">{college.name}</h2>
              <p className="text-xs text-gray-300 flex items-center gap-1 mt-1">
                <FiMapPin className="text-indigo-400" />
                {college.location}, {college.state}
              </p>
            </div>
            <Badge variant="emerald" className="text-sm">
              NIRF #{college.nirfRank}
            </Badge>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-slate-900/60 rounded-2xl border border-gray-100 dark:border-slate-800">
          <div>
            <span className="text-xs text-gray-400 font-medium block">Highest Package</span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(college.highestSalary)}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Avg Salary</span>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {formatCurrency(college.avgSalary)}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Total Fees</span>
            <span className="text-base font-semibold text-gray-900 dark:text-white">
              {formatCurrency(college.totalFees)}
            </span>
          </div>
          <div>
            <span className="text-xs text-gray-400 font-medium block">Rating</span>
            <div className="flex items-center gap-1 text-amber-500 font-bold text-base">
              <FiStar className="fill-amber-400" />
              <span>{college.rating} / 5</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">About College</h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {college.description}
          </p>
        </div>

        {/* Top Recruiters */}
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">Top Recruiters</h4>
          <div className="flex flex-wrap gap-2">
            {college.topRecruiters?.map((rec, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 rounded-lg text-xs font-semibold border border-indigo-200 dark:border-indigo-900"
              >
                {rec}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 dark:border-slate-800 pt-4">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Link to={`/colleges/${college.id}`} onClick={onClose}>
            <Button variant="primary">Full College Profile</Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
