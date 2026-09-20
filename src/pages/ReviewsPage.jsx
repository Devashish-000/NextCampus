import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiPlus, FiStar, FiCheckCircle, FiSearch, FiMessageSquare } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { reviewService } from '../services/reviewService';
import { reviewSchema } from '../validators/reviewSchemas';
import { ALL_MOCK_COLLEGES } from '../mocks/collegesData';
import { ReviewCard } from '../features/reviews/ReviewCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/forms/Input';
import { Select } from '../components/forms/Select';
import { Textarea } from '../components/forms/Textarea';
import { Pagination } from '../components/common/Pagination';

export const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('0');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      overallRating: 5,
      placementsRating: 5,
      infrastructureRating: 4,
      facultyRating: 5,
      campusLifeRating: 4,
      batchYear: 2024,
    },
  });

  useEffect(() => {
    reviewService.getReviews().then((res) => setReviews(res));
  }, []);

  const filteredReviews = reviews.filter((rev) => {
    const minRating = parseFloat(ratingFilter);
    const matchesRating = (rev.overallRating || rev.rating) >= minRating;
    const matchesSearch =
      rev.studentName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.collegeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.title?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage) || 1;
  const paginatedReviews = filteredReviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const onSubmitReview = async (data) => {
    try {
      const added = await reviewService.addReview(data);
      setReviews([added, ...reviews]);
      toast.success('Review submitted successfully for moderation!');
      setIsModalOpen(false);
      reset();
    } catch (err) {
      toast.error('Failed to submit review.');
    }
  };

  return (
    <div className="w-100 min-vh-100 bg-tech-grid py-4">
      <div className="container px-3 px-md-5 space-y-5">
        
        {/* Header Bar */}
        <div className="d-flex flex-column flex-md-row items-md-center justify-content-between gap-3 pb-3 border-bottom border-gray-200/60">
          <div>
            <div className="d-inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
              <FiMessageSquare className="w-4 h-4 text-indigo-600" />
              <span>Verified Student Feedback</span>
            </div>
            <h1 className="h2 font-black text-dark mb-1">
              Verified Student Reviews & Feedback
            </h1>
            <p className="text-muted text-xs mb-0 max-w-3xl">
              Real experiences shared by verified alumni and current students across top Indian universities.
            </p>
          </div>

          {/* Action Bar & Controls */}
          <div className="d-flex flex-wrap items-center gap-2">
            <div className="position-relative">
              <input
                type="text"
                placeholder="Search reviews or colleges..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="form-control text-xs font-semibold rounded-xl border-gray-200 py-2.5 ps-8 pe-3 bg-white shadow-xs"
              />
              <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-2.5 text-muted" />
            </div>

            <select
              value={ratingFilter}
              onChange={(e) => {
                setRatingFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="form-select text-xs font-bold rounded-xl border-gray-200 py-2.5 px-3 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 bg-white shadow-xs"
            >
              <option value="0">All Ratings</option>
              <option value="4.5">4.5+ Star Ratings</option>
              <option value="4.0">4.0+ Star Ratings</option>
            </select>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn btn-saas-primary text-xs font-extrabold px-4 py-2.5 d-inline-flex items-center gap-2 shadow-md"
            >
              <FiPlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid Stage */}
        <div className="row g-4">
          {paginatedReviews.map((rev) => (
            <div key={rev.id} className="col-12 col-md-6">
              <ReviewCard review={rev} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center pt-3">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        )}

        {/* Review Submission Modal */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Write a College Review">
          <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
            <Select
              label="Select University / College"
              {...register('collegeId')}
              error={errors.collegeId?.message}
              options={ALL_MOCK_COLLEGES.map((c) => ({ label: c.name, value: c.id }))}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Course Name" placeholder="e.g. B.Tech CSE" {...register('courseName')} error={errors.courseName?.message} />
              <Input label="Graduation Batch Year" type="number" {...register('batchYear')} error={errors.batchYear?.message} />
            </div>

            <Input label="Review Title" placeholder="Summarize your overall campus experience" {...register('title')} error={errors.title?.message} />

            <div className="grid grid-cols-2 gap-4">
              <Input label="Overall Rating (1-5)" type="number" step="0.5" min="1" max="5" {...register('overallRating')} error={errors.overallRating?.message} />
              <Input label="Placements Rating (1-5)" type="number" step="0.5" min="1" max="5" {...register('placementsRating')} error={errors.placementsRating?.message} />
            </div>

            <Textarea label="What did you like? (Pros)" placeholder="Mention faculty quality, placements, peer culture..." {...register('pros')} error={errors.pros?.message} />
            <Textarea label="What could be improved? (Cons)" placeholder="Mention workload, hostel food, campus constraints..." {...register('cons')} error={errors.cons?.message} />

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary" isLoading={isSubmitting}>Submit Review</Button>
            </div>
          </form>
        </Modal>

      </div>
    </div>
  );
};
