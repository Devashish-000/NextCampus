import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiSun,
  FiMoon,
  FiBookmark,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
  FiSearch,
  FiShield,
  FiBell,
  FiGrid,
  FiChevronDown,
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useSavedColleges } from '../../context/SavedCollegesContext';
import { NAV_LINKS, ROUTES } from '../../constants/routes';
import { Button } from '../ui/Button';
import { CommandPalette } from './CommandPalette';
import { Logo } from './Logo';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const { savedIds } = useSavedColleges();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Scroll listener for sticky navbar elevation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside listener for user dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isAdmin = user?.role === 'admin';

  return (
    <>
      <header
        className={`sticky-top w-100 transition-all duration-300 ${
          scrolled ? 'glass-navbar shadow-sm border-bottom' : 'bg-white border-bottom'
        }`}
      >
        <div className="container-fluid px-3 px-md-5">
          <div className="d-flex items-center justify-between py-2.5">
            
            {/* BRAND LOGO */}
            <Link to={ROUTES.HOME} className="text-decoration-none group">
              <Logo size="md" />
            </Link>

            {/* DESKTOP NAVIGATION (NO COMPARE LINK) */}
            <nav className="d-none d-lg-flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold text-decoration-none transition-all relative ${
                      isActive
                        ? 'text-indigo-600 bg-indigo-50/80 font-bold'
                        : 'text-secondary hover:text-indigo-600 hover:bg-light'
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="badge bg-danger ms-1.5 text-[9px] font-bold">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT SIDE ACTIONS */}
            <div className="d-flex items-center gap-2">
              
              {/* Quick Search Button */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="btn btn-light btn-sm d-flex items-center gap-2 text-muted px-3 py-2 rounded-xl border"
                title="Search Colleges (Cmd+K)"
              >
                <FiSearch className="text-indigo-600 w-4 h-4" />
                <span className="d-none d-xl-inline text-xs font-medium">Search...</span>
                <kbd className="d-none d-sm-inline-block px-1.5 py-0.5 text-[10px] bg-white border rounded text-muted font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* Notification Icon */}
              <Link
                to={ROUTES.NOTIFICATIONS}
                className="btn btn-light btn-sm p-2 rounded-xl border relative"
                title="Notifications"
              >
                <FiBell className="w-4 h-4 text-secondary" />
                <span className="position-absolute top-0 start-100 translate-middle p-1 bg-indigo-600 border border-light rounded-circle" />
              </Link>

              {/* Saved Colleges Bookmark */}
              <Link
                to={ROUTES.SAVED_COLLEGES}
                className="btn btn-light btn-sm p-2 rounded-xl border relative d-none d-sm-flex"
                title="Saved Colleges"
              >
                <FiBookmark className="w-4 h-4 text-secondary" />
                {savedIds.length > 0 && (
                  <span className="badge bg-indigo-600 rounded-pill position-absolute top-0 start-100 translate-middle text-[10px]">
                    {savedIds.length}
                  </span>
                )}
              </Link>

              {/* AUTH STATE: Dropdown vs Guest Buttons */}
              {isAuthenticated ? (
                <div className="position-relative" ref={dropdownRef}>
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="btn btn-light btn-sm p-1 rounded-xl border d-flex items-center gap-2"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.fullName}
                      className="w-7 h-7 rounded-lg object-cover border"
                    />
                    <span className="text-xs font-semibold text-dark d-none d-md-inline pe-1">
                      {user?.fullName}
                    </span>
                    <FiChevronDown className="text-muted w-3.5 h-3.5" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="position-absolute end-0 mt-2 w-64 bg-white border rounded-3 shadow-lg py-2 z-50"
                      >
                        <div className="px-3 py-2 border-bottom bg-light">
                          <div className="d-flex items-center justify-between">
                            <span className="fw-bold text-xs text-dark truncate">
                              {user?.fullName}
                            </span>
                            <span className={`badge text-[9px] ${isAdmin ? 'bg-purple text-purple-700' : 'bg-success-subtle text-success-emphasis'}`}>
                              {user?.role || 'STUDENT'}
                            </span>
                          </div>
                          <span className="text-muted text-xs d-block text-truncate mt-0.5">
                            {user?.email}
                          </span>
                        </div>

                        <div className="py-1">
                          <Link
                            to={isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.STUDENT_DASHBOARD}
                            className="dropdown-item px-3 py-2 text-xs font-semibold d-flex items-center gap-2"
                          >
                            <FiGrid className="text-indigo-600" />
                            <span>{isAdmin ? 'Admin Dashboard' : 'Student Dashboard'}</span>
                          </Link>

                          <Link
                            to={ROUTES.PROFILE}
                            className="dropdown-item px-3 py-2 text-xs font-semibold d-flex items-center gap-2"
                          >
                            <FiUser className="text-indigo-600" />
                            <span>My Profile</span>
                          </Link>

                          <Link
                            to={ROUTES.SETTINGS}
                            className="dropdown-item px-3 py-2 text-xs font-semibold d-flex items-center gap-2"
                          >
                            <FiShield className="text-indigo-600" />
                            <span>Settings</span>
                          </Link>
                        </div>

                        <div className="border-top pt-1">
                          <button
                            onClick={() => {
                              logout();
                              navigate(ROUTES.HOME);
                            }}
                            className="dropdown-item px-3 py-2 text-xs font-semibold text-danger d-flex items-center gap-2"
                          >
                            <FiLogOut />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="d-none d-sm-flex items-center gap-2">
                  <Link to={ROUTES.LOGIN}>
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link to={ROUTES.REGISTER}>
                    <Button variant="primary" size="sm">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="btn btn-light btn-sm d-lg-none p-2 rounded-xl border"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>

            </div>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="d-lg-none border-top bg-white px-3 py-3 space-y-2"
            >
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="d-block px-3 py-2 rounded-xl text-sm font-semibold text-dark text-decoration-none hover:bg-light"
                >
                  {link.name}
                </Link>
              ))}

              {!isAuthenticated && (
                <div className="pt-2 border-top d-flex flex-column gap-2">
                  <Link to={ROUTES.LOGIN}>
                    <Button variant="outline" className="w-100">
                      Sign In
                    </Button>
                  </Link>
                  <Link to={ROUTES.REGISTER}>
                    <Button variant="primary" className="w-100">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CommandPalette isOpen={commandPaletteOpen} onClose={setCommandPaletteOpen} />
    </>
  );
};
