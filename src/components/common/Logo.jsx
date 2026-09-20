import React from 'react';

export const Logo = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-13 h-13',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`d-flex items-center gap-3 ${className}`}>
      {/* 3D VECTOR SPHERE LOGO MARK */}
      <div
        className={`${
          sizeClasses[size] || 'w-11 h-11'
        } rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-600 to-purple-600 p-2 text-white d-flex items-center justify-center shrink-0 position-relative group cursor-pointer`}
        style={{
          boxShadow: 'inset 0 2px 4px rgba(255, 255, 255, 0.4), 0 8px 20px -2px rgba(79, 70, 229, 0.35)',
          border: '1px solid rgba(199, 210, 254, 0.4)',
        }}
      >
        {/* 3D Specular Light Arc Overlay */}
        <div className="position-absolute top-0 start-0 w-100 h-50 bg-gradient-to-b from-white/30 to-transparent rounded-t-2xl pointer-events-none" />

        {/* 3D Mortarboard Cap & Orbital Ring SVG */}
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full position-relative z-10 drop-shadow-md transition-transform duration-300 group-hover:scale-110"
        >
          {/* Orbital Ring with Glow */}
          <ellipse
            cx="18"
            cy="20"
            rx="14"
            ry="5.5"
            stroke="url(#ringGlow)"
            strokeWidth="1.75"
            strokeDasharray="4 2"
            transform="rotate(-15 18 20)"
          />

          {/* Graduation Cap Top Diamond */}
          <path
            d="M18 6.5L31 13.5L18 20.5L5 13.5L18 6.5Z"
            fill="url(#capGrad)"
            stroke="#FFFFFF"
            strokeWidth="1"
          />

          {/* Cap Skull Base */}
          <path
            d="M10.5 17V23.5C10.5 23.5 13.8 26.5 18 26.5C22.2 26.5 25.5 23.5 25.5 23.5V17"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Golden Tassel Accent */}
          <path
            d="M28 14.5V20.5"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="28" cy="21.5" r="1.5" fill="#F59E0B" />

          {/* SVG Gradients */}
          <defs>
            <linearGradient id="capGrad" x1="5" y1="6.5" x2="31" y2="20.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#E0E7FF" />
            </linearGradient>
            <linearGradient id="ringGlow" x1="4" y1="20" x2="32" y2="20" gradientUnits="userSpaceOnUse">
              <stop stopColor="#F59E0B" />
              <stop offset="0.5" stopColor="#FFFFFF" />
              <stop offset="1" stopColor="#6366F1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* BRAND TYPOGRAPHY */}
      <div className="d-flex flex-column">
        <div className="d-flex items-center gap-1.5">
          <span className="font-black text-2xl text-dark tracking-tight leading-none">
            Next<span className="gradient-text-saas">Campus</span>
          </span>
        </div>
        <span className="text-[10px] font-bold text-muted uppercase tracking-widest mt-0.5 hidden sm:inline">
          College Discovery & AI Counseling
        </span>
      </div>
    </div>
  );
};
