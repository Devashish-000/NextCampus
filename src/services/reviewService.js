import axiosInstance, { mockApiDelay } from './axiosInstance';
import { MOCK_REVIEWS } from '../mocks/reviewsData';

export const reviewService = {
  getReviews: async (params = {}) => {
    try {
      const response = await axiosInstance.get('/reviews');
      // Only show APPROVED reviews to students
      let result = response.data.filter(r => r.status === 'APPROVED');
      if (params.collegeId) {
        result = result.filter((r) => r.collegeId === params.collegeId);
      }
      return result;
    } catch (err) {
      console.warn('Falling back to mock reviews', err);
      let result = [...MOCK_REVIEWS];
      if (params.collegeId) {
        result = result.filter((r) => r.collegeId === params.collegeId);
      }
      return result;
    }
  },

  addReview: async (reviewData) => {
    try {
      const payload = {
        college: reviewData.collegeName || 'Unknown College', // map to schema
        author: 'Aarav Sharma', 
        rating: reviewData.overallRating,
        pros: reviewData.pros,
        cons: reviewData.cons,
        status: 'PENDING',
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      };
      const response = await axiosInstance.post('/reviews', payload);
      return response.data;
    } catch (err) {
      console.warn('Failed to submit to backend, using mock', err);
      const newReview = {
        id: `rev-${Date.now()}`,
        ...reviewData,
        studentName: 'Aarav Sharma (You)',
        isVerifiedStudent: true,
        date: new Date().toISOString().split('T')[0],
        helpfulCount: 0,
      };
      return newReview;
    }
  }
};
