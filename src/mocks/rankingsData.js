import { ALL_MOCK_COLLEGES } from './collegesData';

export const MOCK_RANKINGS_LIST = ALL_MOCK_COLLEGES.map((college, index) => ({
  id: `rnk-${index + 1}`,
  nirfRank: index + 1,
  previousRank: Math.max(1, index + 1 + (index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0)),
  collegeId: college.id,
  collegeName: college.name,
  location: `${college.location}, ${college.state}`,
  stream: college.stream,
  teachingScore: +(95 - index * 0.4).toFixed(1),
  researchScore: +(94 - index * 0.35).toFixed(1),
  placementScore: +(96 - index * 0.3).toFixed(1),
  overallScore: +(99 - index * 0.35).toFixed(1),
  accreditation: college.accreditation || 'NAAC A++'
}));
