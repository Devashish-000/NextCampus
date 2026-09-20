import { mockApiDelay } from './axiosInstance';
import { MOCK_REVIEWS } from '../mocks/reviewsData';

let reviewsList = [...MOCK_REVIEWS];

export const reviewService = {
  getReviews: async (params = {}) => {
    await mockApiDelay(350);
    let result = [...reviewsList];
    if (params.collegeId) {
      result = result.filter((r) => r.collegeId === params.collegeId);
    }
    return result;
  },

  addReview: async (reviewData) => {
    await mockApiDelay(500);
    const newReview = {
      id: `rev-${Date.now()}`,
      ...reviewData,
      studentName: 'Aarav Sharma (You)',
      isVerifiedStudent: true,
      date: new Date().toISOString().split('T')[0],
      helpfulCount: 0,
    };
    reviewsList.unshift(newReview);
    return newReview;
  }
};
