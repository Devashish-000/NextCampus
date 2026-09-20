import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiGrid, FiList, FiSliders } from 'react-icons/fi';
import { collegeService } from '../services/collegeService';
import { CollegeCard } from '../features/colleges/CollegeCard';
import { CollegeFilters } from '../features/colleges/CollegeFilters';
import { QuickViewModal } from '../features/colleges/QuickViewModal';
import { Pagination } from '../components/common/Pagination';
import { SkeletonCard } from '../components/ui/SkeletonLoader';
import { EmptyState } from '../components/ui/EmptyState';
import { Button } from '../components/ui/Button';

export const CollegesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState({ colleges: [], total: 0, page: 1, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [selectedQuickView, setSelectedQuickView] = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  // Filter State synced with URL parameters
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    stream: searchParams.get('stream') || 'All',
    state: searchParams.get('state') || 'All',
    maxFees: searchParams.get('maxFees') || '3000000',
    minRating: searchParams.get('minRating') || '0',
    sortBy: searchParams.get('sortBy') || 'popularity_desc',
    page: Number(searchParams.get('page')) || 1,
  });

  const fetchColleges = async (currentFilters) => {
    setLoading(true);
    try {
      const res = await collegeService.getColleges(currentFilters);
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchColleges(filters);
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const updated = { ...filters, [key]: value, page: 1 };
    setFilters(updated);
    setSearchParams(updated);
  };

  const handleResetFilters = () => {
    const reset = {
      search: '',
      stream: 'All',
      state: 'All',
      maxFees: '3000000',
      minRating: '0',
      sortBy: 'popularity_desc',
      page: 1,
    };
    setFilters(reset);
    setSearchParams({});
  };

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container-fluid px-3 px-md-5 space-y-4">
        
        {/* Header Bar */}
        <div className="d-flex flex-column flex-md-row items-md-center justify-content-between gap-3 pb-3">
          <div>
            <h1 className="h2 font-black text-dark mb-1">
              Explore Universities & Colleges
            </h1>
            <p className="text-muted text-xs mb-0">
              Showing <span className="fw-bold text-dark">{data.total}</span> institutes matching your criteria
            </p>
          </div>

          <div className="d-flex items-center gap-2">
            {/* Mobile Filter Drawer Button */}
            <Button
              variant="outline"
              className="d-lg-none"
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              leftIcon={<FiSliders />}
            >
              Filters
            </Button>

            {/* View Mode Toggle */}
            <div className="btn-group border rounded-xl p-1 bg-white shadow-xs">
              <button
                onClick={() => setViewMode('grid')}
                className={`btn btn-sm py-1 px-2.5 rounded-lg border-0 ${
                  viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-xs font-bold' : 'text-muted'
                }`}
                aria-label="Grid View"
              >
                <FiGrid />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`btn btn-sm py-1 px-2.5 rounded-lg border-0 ${
                  viewMode === 'list' ? 'bg-indigo-600 text-white shadow-xs font-bold' : 'text-muted'
                }`}
                aria-label="List View"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {/* Main Bootstrap Grid Layout */}
        <div className="row g-4 items-start">
          
          {/* Desktop Sidebar */}
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <CollegeFilters
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="col-12 d-lg-none mb-3">
              <CollegeFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
              />
            </div>
          )}

          {/* Main Colleges Grid */}
          <div className="col-12 col-lg-9">
            {loading ? (
              <div className="row g-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="col-12 col-md-6 col-xl-4">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : data.colleges.length === 0 ? (
              <EmptyState
                title="No Colleges Match Your Search"
                description="We could not find any colleges matching your exact filters. Try broadening your criteria or resetting filters."
                actionLabel="Reset All Filters"
                onAction={handleResetFilters}
              />
            ) : (
              <>
                <div className="row g-4">
                  {data.colleges.map((college) => (
                    <div
                      key={college.id}
                      className={viewMode === 'grid' ? 'col-12 col-md-6 col-xl-4' : 'col-12'}
                    >
                      <CollegeCard
                        college={college}
                        onQuickView={(clg) => setSelectedQuickView(clg)}
                      />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={data.page}
                  totalPages={data.totalPages}
                  onPageChange={(p) => handleFilterChange('page', p)}
                />
              </>
            )}
          </div>
        </div>

        {/* Quick View Snapshot Modal */}
        <QuickViewModal
          college={selectedQuickView}
          isOpen={!!selectedQuickView}
          onClose={() => setSelectedQuickView(null)}
        />
      </div>
    </div>
  );
};
