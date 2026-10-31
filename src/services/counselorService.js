import axiosInstance, { mockApiDelay } from './axiosInstance';

export const counselorService = {
  sendMessage: async ({ message, history = [], userProfile = {} }) => {
    try {
      const response = await axiosInstance.post('/counselor/chat', {
        message,
        history,
        userProfile,
      });
      return response.data;
    } catch (error) {
      console.warn('Backend counselor service unreachable, using client heuristic:', error.message);
      await mockApiDelay(600);

      const msg = (message || '').toLowerCase();
      let reply = '';

      if (msg.includes('josaa') || msg.includes('counseling') || msg.includes('seat')) {
        reply = `### 📋 JoSAA & CSAB Counseling Highlights (2026)

1. **Choice Filling Rule**: Always arrange colleges in your genuine priority order (Choice 1 = Dream seat).
2. **Freeze vs Float vs Slide**:
   - **Freeze**: Lock current allotment permanently.
   - **Float**: Accept current seat, eligible for higher choice upgrade in next rounds.
   - **Slide**: Upgrade to higher branch within the **same** institute.
3. **SAF (Seat Acceptance Fee)**: Mandatory to pay after Round 1 allotment to retain your seat!`;
      } else if (msg.includes('compare') || msg.includes('vs')) {
        reply = `### ⚖️ Premier Institute Comparison

- **Top 5 IITs vs Top 3 NITs**: Top IITs provide unmatched global research, alumni network, and quant finance roles. Top NITs (Trichy, Surathkal, Warangal) offer phenomenal tech ROI with tuition fees ~35% lower.
- **CSE vs Circuital Branches**: CSE offers immediate software product roles; ECE/Data Science provide dual flexibility across semiconductors and tech.`;
      } else {
        reply = `Hello! I am **NextCampus AI Mentor**. I am here to help you navigate:
- 🎯 Cutoff percentiles for IITs, NITs, and premier universities.
- ⚖️ Branch vs College trade-offs.
- 📋 JoSAA/CSAB round-by-round strategies.
- 💰 Tuition fee waivers and scholarships.

What specific college or exam score would you like guidance on?`;
      }

      return {
        success: true,
        reply,
        source: 'client-offline-fallback',
        suggestedColleges: [],
      };
    }
  },
};
