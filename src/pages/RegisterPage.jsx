import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '../validators/authSchemas';
import { useAuth } from '../context/AuthContext';
import { STREAMS } from '../constants/collegeData';
import { ROUTES } from '../constants/routes';
import { FiUser, FiMail, FiPhone, FiLock, FiZap } from 'react-icons/fi';

export const RegisterPage = () => {
  const { register: registerAuth } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      targetStream: 'Engineering',
      role: 'student',
    },
  });

  const onSubmit = async (data) => {
    try {
      await registerAuth(data);
      navigate(ROUTES.STUDENT_DASHBOARD);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-2xl border border-indigo-100/90 shadow-2xl rounded-3xl space-y-4 animate-in fade-in">
      
      {/* Centered Header Badge */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 text-white font-black d-flex items-center justify-center shadow-xl shadow-indigo-500/30 mx-auto text-2xl">
          🎓
        </div>
        <div>
          <h2 className="h3 font-black text-slate-900 mb-1">Create Account</h2>
          <p className="text-xs font-bold text-slate-600 mb-0">
            Join 100,000+ students predicting admissions & comparing universities
          </p>
        </div>
      </div>

      {/* Register Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        
        {/* Full Name */}
        <div>
          <label className="form-label text-xs font-black text-slate-900 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <div className="position-relative">
            <FiUser className="position-absolute top-50 start-0 translate-middle-y ms-3 text-indigo-500 w-4 h-4" />
            <input
              type="text"
              placeholder="e.g. Aarav Sharma"
              {...register('fullName')}
              className="form-control ps-5 text-xs font-extrabold bg-white text-slate-900 placeholder-slate-400 rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xs"
            />
          </div>
          {errors.fullName && (
            <span className="text-[11px] font-bold text-rose-600 mt-1 d-block">
              {errors.fullName.message}
            </span>
          )}
        </div>

        {/* Email Address */}
        <div>
          <label className="form-label text-xs font-black text-slate-900 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <div className="position-relative">
            <FiMail className="position-absolute top-50 start-0 translate-middle-y ms-3 text-indigo-500 w-4 h-4" />
            <input
              type="email"
              placeholder="name@example.com"
              {...register('email')}
              className="form-control ps-5 text-xs font-extrabold bg-white text-slate-900 placeholder-slate-400 rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xs"
            />
          </div>
          {errors.email && (
            <span className="text-[11px] font-bold text-rose-600 mt-1 d-block">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="form-label text-xs font-black text-slate-900 uppercase tracking-wider mb-1">
            Mobile Phone Number
          </label>
          <div className="position-relative">
            <FiPhone className="position-absolute top-50 start-0 translate-middle-y ms-3 text-indigo-500 w-4 h-4" />
            <input
              type="tel"
              placeholder="10-digit mobile number"
              {...register('phone')}
              className="form-control ps-5 text-xs font-extrabold bg-white text-slate-900 placeholder-slate-400 rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xs"
            />
          </div>
          {errors.phone && (
            <span className="text-[11px] font-bold text-rose-600 mt-1 d-block">
              {errors.phone.message}
            </span>
          )}
        </div>

        {/* Target Academic Stream */}
        <div>
          <label className="form-label text-xs font-black text-slate-900 uppercase tracking-wider mb-1">
            Target Academic Stream
          </label>
          <select
            {...register('targetStream')}
            className="form-select text-xs font-extrabold bg-white text-slate-900 rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xs"
          >
            {STREAMS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.targetStream && (
            <span className="text-[11px] font-bold text-rose-600 mt-1 d-block">
              {errors.targetStream.message}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="form-label text-xs font-black text-slate-900 uppercase tracking-wider mb-1">
            Password
          </label>
          <div className="position-relative">
            <FiLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-indigo-500 w-4 h-4" />
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className="form-control ps-5 text-xs font-extrabold bg-white text-slate-900 placeholder-slate-400 rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xs"
            />
          </div>
          {errors.password && (
            <span className="text-[11px] font-bold text-rose-600 mt-1 d-block">
              {errors.password.message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="form-label text-xs font-black text-slate-900 uppercase tracking-wider mb-1">
            Confirm Password
          </label>
          <div className="position-relative">
            <FiLock className="position-absolute top-50 start-0 translate-middle-y ms-3 text-indigo-500 w-4 h-4" />
            <input
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              className="form-control ps-5 text-xs font-extrabold bg-white text-slate-900 placeholder-slate-400 rounded-xl border-gray-200 py-2.5 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xs"
            />
          </div>
          {errors.confirmPassword && (
            <span className="text-[11px] font-bold text-rose-600 mt-1 d-block">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        {/* Create Free Account CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-saas-primary w-100 text-xs py-3 font-black shadow-lg shadow-indigo-500/30 d-flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
          >
            {isSubmitting ? (
              <span>Creating Account...</span>
            ) : (
              <>
                <span>Create Free Account</span>
                <FiZap className="w-4 h-4 fill-amber-300 text-amber-300" />
              </>
            )}
          </button>
        </div>

      </form>

      {/* Footer Sign In Link */}
      <div className="text-center text-xs font-semibold text-slate-600 pt-3 border-top border-gray-100">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-extrabold text-indigo-600 hover:text-indigo-800 text-decoration-none">
          Sign In
        </Link>
      </div>

    </div>
  );
};
