import { mockApiDelay } from './axiosInstance';
import { ALL_MOCK_COLLEGES } from '../mocks/collegesData';

export const recommendationService = {
  predictColleges: async (criteria) => {
    await mockApiDelay(700);
    const { stream, score, budgetMax, preferredState } = criteria;
    const userScore = Number(score) || 90;

    let matches = ALL_MOCK_COLLEGES.map((c) => {
      let matchScore = 70;
      
      // Stream alignment
      if (stream && c.stream.toLowerCase() === stream.toLowerCase()) {
        matchScore += 15;
      }
      
      // Budget alignment
      if (budgetMax && c.totalFees <= Number(budgetMax)) {
        matchScore += 10;
      }

      // Cutoff alignment
      if (userScore >= c.cutoffMinPercentile) {
        matchScore += 5;
      } else {
        matchScore -= 10;
      }

      // State preference
      if (preferredState && c.state === preferredState) {
        matchScore += 5;
      }

      const finalChance = Math.min(99, Math.max(35, matchScore));
      
      let category = 'Dream Choice';
      if (finalChance > 80) category = 'High Admission Probability (Safety)';
      else if (finalChance > 60) category = 'Moderate Admission Chance (Target)';
      
      return {
        ...c,
        admissionProbability: finalChance,
        recommendationCategory: category,
      };
    });

    matches.sort((a, b) => b.admissionProbability - a.admissionProbability);

    return {
      totalAnalyzed: ALL_MOCK_COLLEGES.length,
      recommendations: matches.slice(0, 8),
    };
  }
};
