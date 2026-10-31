import axiosInstance, { mockApiDelay } from './axiosInstance';
import { ALL_MOCK_COLLEGES } from '../mocks/collegesData';

export const recommendationService = {
  predictColleges: async (criteria) => {
    try {
      const response = await axiosInstance.post('/recommendations/predict', criteria);
      if (response.data && response.data.recommendations) {
        return response.data;
      }
    } catch (err) {
      console.warn('Backend prediction endpoint unreachable, executing client-side engine:', err.message);
    }

    // Client-side predictive fallback engine
    await mockApiDelay(600);

    const {
      exam = 'JEE Main',
      score = 90,
      scoreType = 'percentile',
      category = 'General',
      homeState = '',
      stream = 'All',
      budgetMax = 2000000,
      gender = 'Gender-Neutral',
    } = criteria;

    const numericScore = Number(score) || 85;
    const numericBudget = Number(budgetMax) || 2500000;

    // 1. Convert Rank to Percentile if rank was supplied
    let basePercentile = numericScore;
    if (scoreType === 'rank') {
      const candidatePools = {
        'JEE Main': 1200000,
        'JEE Advanced': 180000,
        'NEET': 2200000,
        'CAT': 300000,
        'CUET': 1500000,
        'GATE': 800000,
      };
      const pool = candidatePools[exam] || 1000000;
      basePercentile = Math.max(1, 100 - (numericScore / pool) * 100);
      basePercentile = Number(basePercentile.toFixed(2));
    }

    // 2. Reservation Category adjustments
    const categoryAdjustments = {
      General: 0,
      EWS: 3.0,
      'OBC-NCL': 4.5,
      SC: 10.0,
      ST: 14.0,
    };
    const boost = categoryAdjustments[category] || 0;
    const effectivePercentile = Math.min(99.99, basePercentile + boost);

    // 3. Score against ALL_MOCK_COLLEGES
    let scoredColleges = ALL_MOCK_COLLEGES.map((c) => {
      const minCutoff = c.cutoffMinPercentile || 85.0;
      const clgFees = c.totalFees || 1000000;

      const diff = effectivePercentile - minCutoff;
      let probability = 60 + diff * 6.5;

      let isHomeStateAdvantage = false;
      if (homeState && c.state && c.state.toLowerCase() === homeState.toLowerCase()) {
        probability += 7;
        isHomeStateAdvantage = true;
      }

      if (stream !== 'All' && c.stream && c.stream.toLowerCase() === stream.toLowerCase()) {
        probability += 5;
      }

      let isBudgetFriendly = false;
      if (clgFees <= numericBudget) {
        probability += 5;
        isBudgetFriendly = true;
      } else if (clgFees > numericBudget * 1.4) {
        probability -= 12;
      }

      if (gender === 'Female-Only') {
        probability += 4;
      }

      probability = Math.round(Math.min(99, Math.max(25, probability)));

      let tier = 'Target';
      let tierColor = 'amber';
      let tierLabel = '🎯 Target Choice';
      if (probability >= 85) {
        tier = 'Safe';
        tierColor = 'emerald';
        tierLabel = '🛡️ Safe Choice';
      } else if (probability < 60) {
        tier = 'Dream';
        tierColor = 'purple';
        tierLabel = '🌟 Dream Choice';
      }

      let reasons = [];
      if (diff >= 3) {
        reasons.push(`Score (${effectivePercentile}%) exceeds closing cutoff (${minCutoff}%)`);
      } else if (diff >= 0) {
        reasons.push(`Score closely aligns with projected Round 3-6 cutoff (${minCutoff}%)`);
      } else {
        reasons.push(`Aspirational stretch choice; requires higher spot-round vacancy`);
      }

      if (category !== 'General') {
        reasons.push(`${category} quota advantage applied`);
      }
      if (isHomeStateAdvantage) {
        reasons.push(`${c.state} Home State quota allotment active`);
      }
      if (isBudgetFriendly) {
        reasons.push(`Tuition fits within ₹${(numericBudget / 100000).toFixed(1)}L budget`);
      }

      return {
        ...c,
        admissionProbability: probability,
        tier,
        tierLabel,
        tierColor,
        isHomeStateAdvantage,
        isBudgetFriendly,
        minCutoff,
        effectivePercentile,
        aiReason: reasons.join(' • '),
      };
    });

    scoredColleges.sort((a, b) => b.admissionProbability - a.admissionProbability);

    const dreamCount = scoredColleges.filter((c) => c.tier === 'Dream').length;
    const targetCount = scoredColleges.filter((c) => c.tier === 'Target').length;
    const safeCount = scoredColleges.filter((c) => c.tier === 'Safe').length;

    let strategyTip = 'Balanced choice matrix: ensure you list your Dream institutes in early counseling rounds and keep Safe choices as solid backups.';
    if (effectivePercentile > 98) {
      strategyTip = 'Outstanding percentile! Prioritize top branches (CSE/AI/ECE) across Tier-1 institutes without compromising on branch preference.';
    } else if (effectivePercentile < 80) {
      strategyTip = 'Focus heavily on State Counseling Home-State quotas and top private universities with stellar placement records.';
    }

    return {
      success: true,
      meta: {
        exam,
        enteredScore: numericScore,
        scoreType,
        effectivePercentile,
        category,
        homeState,
        budgetMax: numericBudget,
        gender,
        totalEvaluated: scoredColleges.length,
        dreamCount,
        targetCount,
        safeCount,
        strategyTip,
      },
      recommendations: scoredColleges,
    };
  },
};
