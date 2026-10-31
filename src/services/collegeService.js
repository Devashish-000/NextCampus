import { mockApiDelay } from './axiosInstance';
import { ALL_MOCK_COLLEGES } from '../mocks/collegesData';
import axiosInstance from './axiosInstance';

export const collegeService = {
  getColleges: async (params = {}) => {
    // Fetch live colleges from MongoDB
    let dbColleges = [];
    try {
      const response = await axiosInstance.get('/colleges');
      // Format backend _id to id and map schema keys
      dbColleges = response.data.map(c => {
        const isPlaceholder = !c.logo || c.logo.includes('placeholder.com');
        const defaultImg = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
        return {
          ...c, 
          id: c._id, 
          highestSalary: c.highestPackage, 
          avgSalary: c.avgPackage,
          logo: isPlaceholder ? defaultImg : c.logo,
          image: isPlaceholder ? defaultImg : c.logo,
          location: c.city ? `${c.city}, ${c.state}` : (c.state || 'India')
        };
      });
    } catch (error) {
      console.warn('Backend not running, falling back to mock data only.');
    }

    // Combine newly added DB colleges (newest first) with mock data
    let filtered = [...dbColleges.reverse(), ...ALL_MOCK_COLLEGES];

    // Search query
    if (params.search) {
      const q = params.search.toLowerCase();
      filtered = filtered.filter(
        (c) => c.name.toLowerCase().includes(q) || (c.location || '').toLowerCase().includes(q) || (c.stream || '').toLowerCase().includes(q)
      );
    }

    // Stream filter
    if (params.stream && params.stream !== 'All') {
      filtered = filtered.filter((c) => (c.stream || '').toLowerCase() === params.stream.toLowerCase());
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
    try {
      // First try to fetch from DB
      const response = await axiosInstance.get(`/colleges/${id}`);
      const c = response.data;
      return {
        ...c, 
        id: c._id, 
        shortName: c.name.split(' ')[0] || c.name,
        highestSalary: c.highestPackage, 
        avgSalary: c.avgPackage,
        image: c.logo || 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80',
        location: c.city ? `${c.city}, ${c.state}` : (c.state || 'India'),
        feesBreakdown: [{term: 'Total Fees', amount: c.totalFees}],
        degrees: [c.stream],
        topRecruiters: ['TCS', 'Infosys'],
        accreditation: 'NAAC A',
        establishedYear: 2000,
        campusArea: '100 Acres',
        description: `${c.name} is a premier institute offering excellent education in ${c.stream}.`,
        placementRate: '90%',
        cutoffExam: 'Entrance',
        cutoffMinPercentile: 85,
        hostelAvailable: true
      };
    } catch (error) {
      // Fallback to mock data if not found in DB
      await mockApiDelay(350);
      const college = ALL_MOCK_COLLEGES.find((c) => c.id === id) || ALL_MOCK_COLLEGES[0];
      return college;
    }
  },

  getFeaturedColleges: async () => {
    let dbColleges = [];
    try {
      const response = await axiosInstance.get('/colleges');
      dbColleges = response.data.map(c => {
        const isPlaceholder = !c.logo || c.logo.includes('placeholder.com');
        const defaultImg = 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80';
        return {
          ...c, 
          id: c._id, 
          highestSalary: c.highestPackage, 
          avgSalary: c.avgPackage,
          logo: isPlaceholder ? defaultImg : c.logo,
          image: isPlaceholder ? defaultImg : c.logo,
          location: c.city ? `${c.city}, ${c.state}` : (c.state || 'India')
        };
      });
    } catch (error) {
      console.warn('Backend not running, falling back to mock data only.');
    }
    
    // Combine newly added DB colleges with the featured mock colleges
    const featuredMock = ALL_MOCK_COLLEGES.filter((c) => c.featured);
    return [...dbColleges, ...featuredMock];
  }
};
