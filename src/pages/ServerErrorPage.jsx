import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiServer, FiRefreshCw, FiHome, FiArrowLeft } from 'react-icons/fi';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

export const ServerErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600/15 dark:bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 max-w-xl w-full text-center space-y-8 bg-white/80 dark:bg-[#111726]/90 backdrop-blur-xl border border-gray-200/80 dark:border-slate-800 p-8 sm:p-12 rounded-3xl shadow-2xl"
      >
        <div className="relative inline-flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <FiServer className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-full uppercase tracking-wider">
            HTTP 500 Server Error
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Internal Server Error
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-md mx-auto">
            Something went wrong on our servers while processing your request. Please refresh the page or try again in a few moments.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.reload()}
            leftIcon={<FiRefreshCw className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Reload Page
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
        </div>
      </motion.div>
    </div>
  );
};
