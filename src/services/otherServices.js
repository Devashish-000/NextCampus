import { mockApiDelay } from './axiosInstance';
import { MOCK_SCHOLARSHIPS } from '../mocks/scholarshipsData';
import { MOCK_PLACEMENT_STATS } from '../mocks/placementsData';
import { MOCK_RANKINGS_LIST } from '../mocks/rankingsData';

export const scholarshipService = {
  getScholarships: async (streamFilter = '') => {
    await mockApiDelay(350);
    if (!streamFilter || streamFilter === 'All') return MOCK_SCHOLARSHIPS;
    return MOCK_SCHOLARSHIPS.filter((s) => s.stream.toLowerCase().includes(streamFilter.toLowerCase()));
  }
};

export const placementService = {
  getPlacementStats: async () => {
    await mockApiDelay(350);
    return MOCK_PLACEMENT_STATS;
  }
};

export const rankingService = {
  getRankings: async (streamFilter = '') => {
    await mockApiDelay(350);
    if (!streamFilter || streamFilter === 'All') return MOCK_RANKINGS_LIST;
    return MOCK_RANKINGS_LIST.filter((r) => r.stream.toLowerCase() === streamFilter.toLowerCase());
  }
};
