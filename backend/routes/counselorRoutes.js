const express = require('express');
const router = express.Router();
const College = require('../models/College');

// Try loading GoogleGenAI SDK safely
let GoogleGenAI = null;
try {
  const genaiModule = require('@google/genai');
  GoogleGenAI = genaiModule.GoogleGenAI;
} catch (e) {
  console.warn('@google/genai module not loaded, will use built-in counselor heuristics.');
}

// Built-in intelligent heuristic engine for offline / keyless counseling
function generateHeuristicResponse(userMessage, collegeData, userProfile = {}) {
  const msg = (userMessage || '').toLowerCase();
  let reply = '';
  let matchedColleges = [];

  // Match colleges from DB
  if (collegeData && collegeData.length > 0) {
    matchedColleges = collegeData.filter(c => {
      const name = (c.name || '').toLowerCase();
      return msg.includes(name) || (name.includes('iit') && msg.includes('iit')) || (name.includes('nit') && msg.includes('nit'));
    }).slice(0, 3);
  }

  // 1. Direct College Deep Dive if student asks about a specific college
  const exactCollege = collegeData?.find(c => msg.includes(c.name.toLowerCase()) || (c.shortName && msg.includes(c.shortName.toLowerCase())));
  if (exactCollege) {
    matchedColleges = [exactCollege];
    reply = `### 🏛️ ${exactCollege.name} (${exactCollege.stream}) - Official Profile

- **NIRF National Ranking**: #${exactCollege.nirfRank || 'Top 10'}
- **Average Placement CTC**: ${exactCollege.avgPackage || '₹18.5 LPA'}
- **Highest Placement Package**: ${exactCollege.highestPackage || '₹54.0 LPA'}
- **Total Tuition Fee**: ₹${exactCollege.totalFees || '12.0 Lakhs'}
- **Primary Admission Exam**: ${exactCollege.cutoffExam || 'JEE / State Exam'} (Closing Cutoff: ~${exactCollege.cutoffMinPercentile || '95'}%ile)

**Counselor Recommendation**:
${exactCollege.name} is recognized for robust campus recruitments by Tier-1 product firms and high alumni ROI. You can submit your direct admissions inquiry or token application on their profile page!`;
  } else if (msg.includes('cse') || msg.includes('ece') || msg.includes('branch') || msg.includes('stream') || msg.includes('ai/ml')) {
    reply = `### 💻 Branch & Engineering Specialization Guide (2026)

1. **Computer Science & Engineering (CSE) / AI & Data Science**:
   - **Market Demand**: Highest domestic and international recruitment demand.
   - **Typical Role**: SDE, Machine Learning Engineer, Systems Architect, Quant Developer.
   - **Average Packages**: ₹18-32 LPA at top tier institutes.

2. **Electronics & Communication Engineering (ECE)**:
   - **Flexibility**: Dual eligibility — you can sit for both pure Software/Tech firms AND Semiconductor/VLSI giants (NVIDIA, Qualcomm, Texas Instruments, Intel).
   - **Average Packages**: ₹14-26 LPA. Highly recommended if CSE cutoffs are just out of reach.

3. **Core Branches (Mechanical, Electrical, Chemical)**:
   - Strong government PSU opportunities (ONGC, BHEL, IOCL) via GATE.
   - Many core students also pivot to product management, analytics, or consulting.`;
  } else if (msg.includes('neet') || msg.includes('mbbs') || msg.includes('medical') || msg.includes('aiims')) {
    reply = `### 🩺 NEET-UG Medical Admissions Counseling Matrix

1. **All India Quota (AIQ - 15%) vs State Quota (85%)**:
   - **Top AIIMS (New Delhi, Bhopal, Bhubaneswar)**: Requires 680+ marks (Under AIR 1,000 for General).
   - **Premier Govt Medical Colleges (MAMC, CMC, KGMU)**: Safe cutoff typically 650-675 marks.
   - **State Govt Colleges**: Safe score range 600-645 marks depending on home state domicile.

2. **Counseling Roadmap**:
   - Register on MCC (Medical Counselling Committee) portal for AIQ rounds.
   - State quota counseling is conducted separately by respective state DME authorities.`;
  } else if (msg.includes('cat') || msg.includes('mba') || msg.includes('iim')) {
    reply = `### 📈 CAT & Premier MBA Admissions Insights

1. **IIM BLACKI (Ahmedabad, Bangalore, Calcutta, Lucknow, Kozhikode, Indore)**:
   - **Percentile Threshold**: 99.2+ for General engineers; 97.5+ for non-engineers.
   - **Composite Score**: Class 10/12/Graduation marks, gender/academic diversity, and work experience carry 40-50% weightage alongside CAT.

2. **Top Tier Non-IIMs**:
   - FMS Delhi (Best ROI, tuition fee ~₹2L, average CTC ₹34 LPA).
   - XLRI Jamshedpur (XAT exam), SPJIMR Mumbai, MDI Gurgaon.`;
  } else if (msg.includes('josaa') || msg.includes('counseling') || msg.includes('seat allotment') || msg.includes('csab')) {
    reply = `### 📋 JoSAA & CSAB Counseling Step-by-Step Guide (2026)

1. **Registration & Choice Filling**:
   - Register on the official JoSAA portal using your JEE Main/Advanced Roll Number.
   - Fill choices in strict order of true preference — **Choice 1 should be your absolute dream seat**.
   - Always lock choices before the deadline; unlocked choices are auto-locked.

2. **Mock Allotment Rounds (Rounds 1 & 2)**:
   - Check where you stand. Adjust lower choices if your rank is border-line.

3. **Seat Acceptance Options**:
   - **Freeze**: You are 100% happy with this seat and accept it permanently.
   - **Float**: You accept this seat, but want to upgrade to a higher choice if available in subsequent rounds.
   - **Slide**: You accept this college, but want to upgrade to a higher branch within the **same** college.

4. **Document Verification & SAF**:
   - Pay Seat Acceptance Fee (SAF) online and upload Class 10/12 marksheets, Category Certificate (issued after April 1, 2025), and Medical Certificate.

*Pro Tip: Even if you get a lower preference in Round 1, always choose **Float** — closing ranks typically drop by 15-20% by Round 5!*`;
  } else if (msg.includes('compare') || (msg.includes(' vs ') || msg.includes('versus'))) {
    reply = `### ⚖️ Premier Institute Comparison Analysis

When evaluating top institutes (e.g. Old IITs vs Top NITs / BITS Pilani):

1. **Academic Brand & Global Alumni**:
   - **Top 5 IITs (Bombay, Delhi, Madras, Kanpur, Kharagpur)** possess the strongest global alumni networks, highest research funding, and direct Silicon Valley / Quant recruitment pipelines.
   - **Top NITs (Trichy, Surathkal, Warangal)** offer world-class ROI with tuition fees ~30-40% lower and massive domestic tech recruitment.

2. **Branch vs College Priority**:
   - *Rule of Thumb*: For Tech & Software Careers, prioritize **Top 3 NITs (CSE/ECE)** over a non-circuital branch at a 2nd gen IIT, unless you intend to pursue core MBA/Civil Services.

3. **Placement Benchmarks**:
   - **Average CTC (CSE)**: IIT Bombay/Delhi (~₹28-34 LPA), NIT Trichy/Surathkal (~₹20-25 LPA).
   - **Highest Domestic Package**: Frequently crosses ₹1.2 Cr+ for algorithmic trading / HFT roles.`;
  } else if (msg.includes('cutoff') || msg.includes('percentile') || msg.includes('score') || msg.includes('safe') || msg.includes('rank')) {
    const studentScore = userProfile.entranceScore || '96-98';
    reply = `### 🎯 Admission Cutoffs & Probability Forecast

Based on current JoSAA & institutional admission trends for candidate profile (${studentScore} percentile / score):

- **Top Tier Safe Choices (>85% Odds)**:
  - Premier state universities, established NIT core branches (Mechanical, Electrical, Chemical).
  - Reputed private research universities with high placement rates (e.g., VIT, Manipal, Thapar).

- **Target Tier Choices (60-85% Odds)**:
  - Top 10 NITs (ECE, IT, Data Science), IIITs (Allahabad, Gwalior, Jabalpur).
  - High probability with **Float** option in Rounds 3 to 5.

- **Dream Tier Choices (<60% Odds)**:
  - Top 5 IITs / Top 3 NITs (CSE / AI specializations).
  - Strong chance if home-state quota applies or in subsequent CSAB Special Rounds!

*To see your personalized cutoffs, run the **[AI Predictor](/recommendations)** tool directly from our navigation menu.*`;
  } else if (msg.includes('scholarship') || msg.includes('fee') || msg.includes('fees') || msg.includes('concession') || msg.includes('loan')) {
    reply = `### 🎓 Scholarships, Tuition Fee Waivers & Education Loans

1. **Central Government Scholarships (NSP)**:
   - **Central Sector Scheme**: For students above 80th percentile in Class 12 (₹12,000 to ₹20,000/yr).
   - **Post-Matric Scholarship for SC/ST**: 100% tuition waiver + maintenance allowance across all IITs, NITs, and Central Universities.

2. **IIT & NIT Fee Remission Rules**:
   - **Family Income < ₹1 Lakh/yr**: **100% Tuition Fee Waiver** across all IITs and NITs.
   - **Family Income ₹1 Lakh to ₹5 Lakh/yr**: **2/3rd (66.6%) Tuition Fee Remission**.
   - **SC / ST / PwD Students**: **100% Tuition Fee Exemption** regardless of income.

3. **SBI Scholar Loan Scheme**:
   - Collateral-free education loans up to ₹40 Lakhs with concessional interest rates for students admitted to Top 100 institutes.`;
  } else {
    reply = `Hello! I am **NextCampus AI Mentor**, your dedicated 24/7 college admissions and career counselor.

I can guide you on:
- **🎯 Cutoff Predictions**: Which IITs, NITs, IIITs, or top private universities match your exam score.
- **🏛️ Institute Comparisons**: In-depth placement CTC, peer coding culture, and branch comparison.
- **📝 JoSAA / CSAB Counseling**: Registration, choice locking strategy, and Freeze/Float/Slide rules.
- **💰 Fees & Scholarships**: 100% tuition waiver schemes, state quotas, and financial aid.

What colleges, exams, or career choices are you exploring today?`;
  }

  return {
    reply,
    suggestedColleges: matchedColleges.map(c => ({
      id: c._id,
      name: c.name,
      stream: c.stream,
      nirfRank: c.nirfRank,
      avgPackage: c.avgPackage,
      highestPackage: c.highestPackage,
      logo: c.logo,
    })),
  };
}

// @desc    Chat with 24/7 AI College Counselor
// @route   POST /api/counselor/chat
// @access  Public
router.post('/chat', async (req, res) => {
  try {
    const { message, history = [], userProfile = {} } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    // Fetch colleges from DB for grounded context
    const colleges = await College.find().select('name stream nirfRank avgPackage highestPackage totalFees logo').limit(15);
    const collegesContext = colleges.map(c => 
      `- ${c.name} (${c.stream}): NIRF Rank #${c.nirfRank || 'N/A'}, Avg Package: ${c.avgPackage || 'N/A'}, Highest: ${c.highestPackage || 'N/A'}, Fees: ${c.totalFees || 'N/A'}`
    ).join('\n');

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && GoogleGenAI) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        
        // Build conversation prompt
        const systemPrompt = `You are "NextCampus AI Mentor", an authoritative, friendly, highly analytical college admissions and career counseling expert for Indian students preparing for JEE Main, JEE Advanced, NEET, CAT, CUET, BITSAT, JoSAA, and state counseling.
        
Live colleges database context:
${collegesContext}

User Profile Context (if available):
- Target Exam: ${userProfile.targetExam || 'JEE Main'}
- Score/Percentile: ${userProfile.entranceScore || 'Not specified'}
- Category: ${userProfile.category || 'General'}
- Home State: ${userProfile.state || 'Not specified'}
- Stream: ${userProfile.targetStream || 'Engineering'}

Guidelines:
1. Provide structured, actionable, and encouraging answers using bullet points and bold highlights.
2. Ground college names, packages, and cutoffs in reality. Mention specific institutes from the database when relevant.
3. Keep answers concise, informative, and visually readable with emojis.
4. If asked about counseling, explain JoSAA/CSAB choice locking and Float/Slide/Freeze strategies clearly.`;

        // Format history
        const formattedHistory = (history || []).slice(-6).map(h => `${h.role === 'user' ? 'Student' : 'Mentor'}: ${h.content}`).join('\n');
        const fullPrompt = `${formattedHistory ? `Previous conversation:\n${formattedHistory}\n\n` : ''}Student: ${message}\nMentor:`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: fullPrompt,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        });

        const replyText = response.text || response.output_text;
        if (replyText) {
          // Identify matching colleges to suggest
          const msgLower = (message + ' ' + replyText).toLowerCase();
          const matched = colleges.filter(c => msgLower.includes(c.name.toLowerCase())).slice(0, 3);

          return res.json({
            success: true,
            reply: replyText,
            source: 'gemini-3.8-flash',
            suggestedColleges: matched.map(c => ({
              id: c._id,
              name: c.name,
              stream: c.stream,
              nirfRank: c.nirfRank,
              avgPackage: c.avgPackage,
              highestPackage: c.highestPackage,
              logo: c.logo,
            })),
          });
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, gracefully using built-in counselor heuristic:', geminiError.message);
      }
    }

    // Built-in intelligent heuristic engine fallback
    const result = generateHeuristicResponse(message, colleges, userProfile);
    res.json({
      success: true,
      reply: result.reply,
      source: 'counselor-heuristic-engine',
      suggestedColleges: result.suggestedColleges,
    });

  } catch (error) {
    console.error('Counselor Chat Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process counselor request.',
    });
  }
});

module.exports = router;
