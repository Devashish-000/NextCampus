const express = require('express');
const router = express.Router();
const College = require('../models/College');

// @desc    Predict college admission odds with multi-exam & quota awareness
// @route   POST /api/recommendations/predict
// @access  Public
router.post('/predict', async (req, res) => {
  try {
    const {
      exam = 'JEE Main',
      score = 90,
      scoreType = 'percentile', // 'percentile' or 'rank'
      category = 'General',     // 'General', 'OBC-NCL', 'EWS', 'SC', 'ST'
      homeState = '',
      stream = 'All',           // 'Engineering', 'Management', 'Medical', etc.
      budgetMax = 2000000,
      gender = 'Gender-Neutral'
    } = req.body;

    const numericScore = Number(score) || 85;
    const numericBudget = Number(budgetMax) || 2500000;

    // 1. Convert Rank to Percentile if rank was provided
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

    // 2. Reservation Category Percentile Adjustment Factor
    const categoryAdjustments = {
      'General': 0,
      'EWS': 3.0,
      'OBC-NCL': 4.5,
      'SC': 10.0,
      'ST': 14.0,
    };
    const boost = categoryAdjustments[category] || 0;
    const effectivePercentile = Math.min(99.99, basePercentile + boost);

    // 3. Fetch Colleges from DB with graceful offline fallback
    let colleges = [];
    try {
      const mongoose = require('mongoose');
      if (mongoose.connection.readyState === 1) {
        colleges = await College.find();
      }
    } catch (dbErr) {
      console.warn('Database query bypassed, using fallback dataset:', dbErr.message);
    }

    // If DB is empty, use default mock data structure
    if (!colleges || colleges.length === 0) {
      colleges = [
        {
          _id: 'db-1',
          name: 'Indian Institute of Technology (IIT) Bombay',
          shortName: 'IIT Bombay',
          location: 'Powai, Mumbai',
          state: 'Maharashtra',
          stream: 'Engineering',
          nirfRank: 1,
          highestPackage: 37000000,
          avgPackage: 2350000,
          totalFees: 900000,
          cutoffExam: 'JEE Advanced',
          cutoffMinPercentile: 99.8,
          rating: 4.9,
          reviewCount: 342,
          logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
        },
        {
          _id: 'db-2',
          name: 'Indian Institute of Technology (IIT) Delhi',
          shortName: 'IIT Delhi',
          location: 'Hauz Khas, New Delhi',
          state: 'Delhi NCR',
          stream: 'Engineering',
          nirfRank: 2,
          highestPackage: 40000000,
          avgPackage: 2400000,
          totalFees: 880000,
          cutoffExam: 'JEE Advanced',
          cutoffMinPercentile: 99.7,
          rating: 4.8,
          reviewCount: 298,
          logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
        },
        {
          _id: 'db-3',
          name: 'National Institute of Technology (NIT) Trichy',
          shortName: 'NIT Trichy',
          location: 'Tiruchirappalli, Tamil Nadu',
          state: 'Tamil Nadu',
          stream: 'Engineering',
          nirfRank: 9,
          highestPackage: 5200000,
          avgPackage: 1580000,
          totalFees: 620000,
          cutoffExam: 'JEE Main',
          cutoffMinPercentile: 97.2,
          rating: 4.7,
          reviewCount: 210,
          logo: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?auto=format&fit=crop&w=200&q=80',
        },
        {
          _id: 'db-4',
          name: 'National Institute of Technology (NIT) Surathkal',
          shortName: 'NIT Surathkal',
          location: 'Mangalore, Karnataka',
          state: 'Karnataka',
          stream: 'Engineering',
          nirfRank: 12,
          highestPackage: 5400000,
          avgPackage: 1650000,
          totalFees: 640000,
          cutoffExam: 'JEE Main',
          cutoffMinPercentile: 96.8,
          rating: 4.7,
          reviewCount: 185,
          logo: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=200&q=80',
        },
        {
          _id: 'db-5',
          name: 'Vellore Institute of Technology (VIT)',
          shortName: 'VIT Vellore',
          location: 'Vellore, Tamil Nadu',
          state: 'Tamil Nadu',
          stream: 'Engineering',
          nirfRank: 11,
          highestPackage: 10200000,
          avgPackage: 925000,
          totalFees: 1200000,
          cutoffExam: 'JEE Main',
          cutoffMinPercentile: 88.0,
          rating: 4.5,
          reviewCount: 420,
          logo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80',
        },
        {
          _id: 'db-6',
          name: 'Delhi Technological University (DTU)',
          shortName: 'DTU Delhi',
          location: 'Rohini, New Delhi',
          state: 'Delhi NCR',
          stream: 'Engineering',
          nirfRank: 29,
          highestPackage: 8200000,
          avgPackage: 1540000,
          totalFees: 780000,
          cutoffExam: 'JEE Main',
          cutoffMinPercentile: 94.5,
          rating: 4.6,
          reviewCount: 310,
          logo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=200&q=80',
        },
      ];
    }

    // 4. Run AI Matching Engine
    let scoredColleges = colleges.map((clg) => {
      const c = clg.toObject ? clg.toObject() : clg;
      const minCutoff = c.cutoffMinPercentile || 85.0;
      const clgFees = c.totalFees || 1000000;
      
      // Calculate Cutoff Differential
      const diff = effectivePercentile - minCutoff;

      // Base probability centered at 60%
      let probability = 60 + (diff * 6.5);

      // Home State Quota Bonus (e.g. NITs/State Universities give 50% state quota)
      let isHomeStateAdvantage = false;
      if (homeState && c.state && c.state.toLowerCase() === homeState.toLowerCase()) {
        probability += 7;
        isHomeStateAdvantage = true;
      }

      // Stream matching bonus
      if (stream !== 'All' && c.stream && c.stream.toLowerCase() === stream.toLowerCase()) {
        probability += 5;
      }

      // Budget compliance
      let isBudgetFriendly = false;
      if (clgFees <= numericBudget) {
        probability += 5;
        isBudgetFriendly = true;
      } else if (clgFees > numericBudget * 1.4) {
        probability -= 12;
      }

      // Female supernumerary seat boost if applicable
      if (gender === 'Female-Only') {
        probability += 4;
      }

      // Clamp between 25% and 99%
      probability = Math.round(Math.min(99, Math.max(25, probability)));

      // Classify into SaaS Counseling Tiers
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

      // Generate Context-Aware AI Explanation
      let reasons = [];
      if (diff >= 3) {
        reasons.push(`Score (${effectivePercentile}%) exceeds closing cutoff (${minCutoff}%)`);
      } else if (diff >= 0) {
        reasons.push(`Score closely aligns with projected Round 3-6 cutoff (${minCutoff}%)`);
      } else {
        reasons.push(`Aspirational stretch choice; requires higher spot-round vacancy`);
      }

      if (category !== 'General') {
        reasons.push(`${category} category quota advantage applied`);
      }
      if (isHomeStateAdvantage) {
        reasons.push(`Benefitting from ${c.state} Home State quota allotment`);
      }
      if (isBudgetFriendly) {
        reasons.push(`Tuition fee fits comfortably within ₹${(numericBudget / 100000).toFixed(1)}L budget`);
      }

      return {
        ...c,
        id: c._id || c.id,
        admissionProbability: probability,
        tier,
        tierLabel,
        tierColor,
        isHomeStateAdvantage,
        isBudgetFriendly,
        minCutoff,
        effectivePercentile,
        aiReason: reasons.join(' • '),
        highestSalary: c.highestPackage || c.highestSalary,
        avgSalary: c.avgPackage || c.avgSalary,
        location: c.city ? `${c.city}, ${c.state}` : (c.location || c.state),
      };
    });

    // Sort by highest probability first
    scoredColleges.sort((a, b) => b.admissionProbability - a.admissionProbability);

    // Compute Summary Stats
    const dreamCount = scoredColleges.filter((c) => c.tier === 'Dream').length;
    const targetCount = scoredColleges.filter((c) => c.tier === 'Target').length;
    const safeCount = scoredColleges.filter((c) => c.tier === 'Safe').length;

    let strategyTip = 'Balanced choice matrix: ensure you list your Dream institutes in early counseling rounds and keep Safe choices as solid backups.';
    if (effectivePercentile > 98) {
      strategyTip = 'Outstanding percentile! Prioritize top branches (CSE/AI/ECE) across Tier-1 institutes without compromising on branch preference.';
    } else if (effectivePercentile < 80) {
      strategyTip = 'Focus heavily on State Counseling Home-State quotas and top private universities with stellar placement records.';
    }

    res.json({
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
    });
  } catch (error) {
    console.error('Recommendation Engine Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Internal error predicting recommendations.',
    });
  }
});

module.exports = router;
