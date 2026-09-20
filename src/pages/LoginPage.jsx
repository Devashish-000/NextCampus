import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { loginSchema } from '../validators/authSchemas';
import { useAuth } from '../context/AuthContext';
import { ROUTES } from '../constants/routes';
import { FiMail, FiLock, FiZap } from 'react-icons/fi';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const user = await login(data);
      if (user.role === 'admin') {
        navigate(ROUTES.ADMIN_DASHBOARD);
      } else if (user.role === 'institute') {
        navigate(ROUTES.INSTITUTE_DASHBOARD);
      } else {
        navigate(ROUTES.STUDENT_DASHBOARD);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fillDemo = (email, pass) => {
    setValue('email', email);
    setValue('password', pass);
  };

  return (
    <div className="saas-card p-4 p-md-5 bg-white/95 backdrop-blur-2xl border border-indigo-100/90 shadow-2xl rounded-3xl space-y-4 animate-in fade-in">
      
      {/* Centered Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 text-white font-black d-flex items-center justify-center shadow-xl shadow-indigo-500/30 mx-auto text-2xl">
          🎓
        </div>
        <div>
          <h2 className="h3 font-black text-slate-900 mb-1">Welcome Back</h2>
          <p className="text-xs font-bold text-slate-600 mb-0">
            Enter your credentials to access your student counseling workspace
          </p>
        </div>
      </div>

      {/* 1-Click Demo Fill Badges */}
      <div className="d-flex items-center justify-center gap-2 pt-1 flex-wrap">
        <button
          type="button"
          onClick={() => fillDemo('aarav.sharma@example.com', 'password123')}
          className="btn btn-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-[11px] px-3 py-1 rounded-pill border border-indigo-200 transition-all shadow-xs"
        >
          ⚡ Student Demo
        </button>
        <button
          type="button"
          onClick={() => fillDemo('admin@nextcampus.com', 'admin123')}
          className="btn btn-xs bg-purple-50 hover:bg-purple-100 text-purple-700 font-extrabold text-[11px] px-3 py-1 rounded-pill border border-purple-200 transition-all shadow-xs"
        >
          🔑 Admin Demo
        </button>
        <button
          type="button"
          onClick={() => fillDemo('institute@vit.edu', 'vit123')}
          className="btn btn-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold text-[11px] px-3 py-1 rounded-pill border border-emerald-200 transition-all shadow-xs"
        >
          🏫 Institute Demo
        </button>
      </div>

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        
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

        {/* Remember me & Forgot Password */}
        <div className="d-flex items-center justify-between text-xs pt-1">
          <label className="d-flex items-center gap-1.5 font-bold text-slate-800 cursor-pointer mb-0">
            <input type="checkbox" {...register('rememberMe')} className="form-check-input rounded accent-indigo-600" />
            <span>Remember me</span>
          </label>
          <a href="#" className="font-extrabold text-indigo-600 hover:text-indigo-800 text-decoration-none">
            Forgot password?
          </a>
        </div>

        {/* Sign In CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-saas-primary w-100 text-xs py-3 font-black shadow-lg shadow-indigo-500/30 d-flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-95 transition-all"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In to Account</span>
                <FiZap className="w-4 h-4 fill-amber-300 text-amber-300" />
              </>
            )}
          </button>
        </div>

      </form>

      {/* Footer Register Link */}
      <div className="text-center text-xs font-semibold text-slate-600 pt-3 border-top border-gray-100">
        Don't have an account?{' '}
        <Link to={ROUTES.REGISTER} className="font-extrabold text-indigo-600 hover:text-indigo-800 text-decoration-none">
          Create Account
        </Link>
      </div>

    </div>
  );
};
