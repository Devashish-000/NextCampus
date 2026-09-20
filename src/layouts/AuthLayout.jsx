import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-vh-100 position-relative d-flex flex-column justify-content-center items-center p-3 p-md-4 bg-tech-grid overflow-hidden">
      
      {/* Ambient Soft Glow Orbs */}
      <div className="position-absolute top-20 start-50 translate-middle-x w-96 h-96 bg-indigo-500/15 rounded-circle blur-3xl pointer-events-none" />
      <div className="position-absolute bottom-20 end-10 w-80 h-80 bg-purple-500/15 rounded-circle blur-3xl pointer-events-none" />

      {/* Centered Auth Stage Container */}
      <div className="w-100 max-w-md z-10">
        <Outlet />
      </div>
    </div>
  );
};
