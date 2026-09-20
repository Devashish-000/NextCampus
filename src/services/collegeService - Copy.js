import { mockApiDelay } from './axiosInstance';
import { ALL_MOCK_COLLEGES } from '../mocks/collegesData';

export const collegeService = {
  getColleges: async (params = {}) => {
    await mockApiDelay(400);
    let filtered = [...ALL_MOCK_COLLEGES];

    // Search query
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (c) => c.name.toLowerCase().includes(q) || c.location.toLowerCase().includes(q) || c.stream.toLowerCase().includes(q)
      );
    }

    // Stream filter
    if (params.stream && params.stream !== 'All') {
      filtered = filtered.filter((c) => c.stream.toLowerCase() === params.stream.toLowerCase());
    }

    // State filter
    if (params.state && params.state !== 'All') {
      filtered = filtered.filter((c) => c.state === params.state);
    }

    // Fees filter
    if (params.maxFees) {
      filtered = filtered.filter((c) => c.totalFees <= Number(params.maxFees));
    }

    // Rating filter
    if (params.minRating) {
      filtered = filtered.filter((c) => c.rating >= Number(params.minRating));
    }

    // Sorting
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'rank_asc':
          filtered.sort((a, b) => a.nirfRank - b.nirfRank);
          break;
        case 'salary_desc':
          filtered.sort((a, b) => b.highestSalary - a.highestSalary);
          break;
        case 'fees_asc':
          filtered.sort((a, b) => a.totalFees - b.totalFees);
          break;
        case 'fees_desc':
          filtered.sort((a, b) => b.totalFees - a.totalFees);
          break;
        case 'rating_desc':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
    }

    // Pagination
    const page = Number(params.page) || 1;
    const limit = Number(params.limit) || 9;
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedData = filtered.slice((page - 1) * limit, page * limit);

    return {
      colleges: paginatedData,
      total,
      page,
      totalPages,
    };
  },

  getCollegeById: async (id) => {
    await mockApiDelay(350);
    const college = ALL_MOCK_COLLEGES.find((c) => c.id === id) || ALL_MOCK_COLLEGES[0];
    return college;
  },

  getFeaturedColleges: async () => {
    await mockApiDelay(300);
    return ALL_MOCK_COLLEGES.filter((c) => c.featured);
  }
};
