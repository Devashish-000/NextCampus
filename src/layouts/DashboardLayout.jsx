import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Sidebar } from '../components/common/Sidebar';
import { Footer } from '../components/common/Footer';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen d-flex flex-column bg-light text-dark">
      <Navbar />

      <div className="container-fluid px-3 px-md-5 py-4 flex-grow-1">
        <div className="row g-4">
          <div className="col-12 col-md-3 col-lg-2 d-none d-md-block">
            <Sidebar />
          </div>

          <main className="col-12 col-md-9 col-lg-10">
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};
