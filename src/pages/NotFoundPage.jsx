import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiArrowLeft, FiCompass, FiAlertOctagon } from 'react-icons/fi';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 dark:bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="relative z-10 max-w-xl w-full text-center space-y-8 bg-white/80 dark:bg-[#111726]/90 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl"
      >
        {/* Animated 404 Visual Icon */}
        <div className="relative inline-flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="w-32 h-32 rounded-full border-2 border-dashed border-indigo-500/40 dark:border-indigo-400/40 flex items-center justify-center"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              404
            </span>
            <FiAlertOctagon className="w-5 h-5 text-indigo-500 mt-1" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
            The page you are trying to reach doesn't exist or has been relocated to a new web address. Check the URL or navigate back to safety.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate(-1)}
            leftIcon={<FiArrowLeft className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>

          <Link to={ROUTES.HOME} className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<FiHome className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </Link>

          <Link to={ROUTES.COLLEGES} className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="lg"
              leftIcon={<FiCompass className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Explore Colleges
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
