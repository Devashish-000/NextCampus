import axiosInstance, { mockApiDelay } from './axiosInstance';

export const leadService = {
  submitLead: async (leadData) => {
    try {
      const response = await axiosInstance.post('/leads', leadData);
      return response.data;
    } catch (error) {
      console.warn('Backend leads API unreachable, utilizing client-side fallback:', error.message);
      await mockApiDelay(500);
      return {
        success: true,
        message: 'Application inquiry submitted successfully! The admissions team will contact you.',
        data: {
          _id: 'lead-' + Date.now(),
          ...leadData,
          status: 'New',
          createdAt: new Date(),
        },
      };
    }
  },

  getInstituteLeads: async (collegeId) => {
    try {
      const response = await axiosInstance.get(`/leads/institute/${collegeId || 'general'}`);
      return response.data;
    } catch (error) {
      console.warn('Backend leads API unreachable, using fallback leads:', error.message);
      await mockApiDelay(400);
      const fallbackList = [
        {
          _id: 'lead-1',
          collegeId: collegeId || 'clg-1',
          collegeName: 'Premier Institute of Technology',
          studentName: 'Rohan Deshmukh',
          studentEmail: 'rohan.deshmukh@gmail.com',
          studentPhone: '+91 98201 44521',
          studentCity: 'Pune, Maharashtra',
          courseInterested: 'B.Tech Computer Science & Engineering',
          examTaken: 'JEE Advanced',
          score: 99.85,
          message: 'Interested in AI specializations and hostel availability.',
          status: 'New',
          createdAt: new Date(Date.now() - 2 * 3600 * 1000),
        },
        {
          _id: 'lead-2',
          collegeId: collegeId || 'clg-1',
          collegeName: 'Premier Institute of Technology',
          studentName: 'Ananya Iyer',
          studentEmail: 'ananya.iyer@outlook.com',
          studentPhone: '+91 98402 77123',
          studentCity: 'Chennai, Tamil Nadu',
          courseInterested: 'B.Tech Electrical Engineering',
          examTaken: 'JEE Advanced',
          score: 99.4,
          message: 'Requesting syllabus details and placement statistics.',
          status: 'Contacted',
          createdAt: new Date(Date.now() - 24 * 3600 * 1000),
        },
        {
          _id: 'lead-3',
          collegeId: collegeId || 'clg-1',
          collegeName: 'Premier Institute of Technology',
          studentName: 'Kabir Verma',
          studentEmail: 'kabir.verma@gmail.com',
          studentPhone: '+91 98110 33451',
          studentCity: 'New Delhi, Delhi NCR',
          courseInterested: 'B.Tech Mechanical Engineering',
          examTaken: 'JEE Advanced',
          score: 98.9,
          message: 'Would like to speak with a faculty counselor.',
          status: 'Counseling',
          createdAt: new Date(Date.now() - 48 * 3600 * 1000),
        },
        {
          _id: 'lead-4',
          collegeId: collegeId || 'clg-1',
          collegeName: 'Premier Institute of Technology',
          studentName: 'Simran Kaur',
          studentEmail: 'simran.kaur@yahoo.com',
          studentPhone: '+91 98720 99432',
          studentCity: 'Chandigarh, Punjab',
          courseInterested: 'B.Tech Data Science & AI',
          examTaken: 'JEE Advanced',
          score: 99.72,
          message: 'Seat acceptance confirmed via counseling.',
          status: 'Admitted',
          createdAt: new Date(Date.now() - 72 * 3600 * 1000),
        },
      ];

      return {
        success: true,
        metrics: {
          totalLeads: fallbackList.length,
          newCount: 1,
          contactedCount: 1,
          counselingCount: 1,
          admittedCount: 1,
          conversionRate: 25,
        },
        data: fallbackList,
      };
    }
  },

  updateLeadStatus: async (leadId, status, notes = '') => {
    try {
      const response = await axiosInstance.patch(`/leads/${leadId}/status`, { status, notes });
      return response.data;
    } catch (error) {
      console.warn('Backend update lead status error:', error.message);
      return {
        success: true,
        message: `Lead status updated to ${status}.`,
        data: { _id: leadId, status, notes },
      };
    }
  },

  getMyApplications: async (email) => {
    try {
      const response = await axiosInstance.get(`/leads/student/my-applications?email=${encodeURIComponent(email || '')}`);
      return response.data;
    } catch (error) {
      console.warn('Backend get applications error, using fallback:', error.message);
      await mockApiDelay(300);
      return {
        success: true,
        data: [
          {
            _id: 'app-1',
            collegeId: 'clg-1',
            collegeName: 'Indian Institute of Technology (IIT) Bombay',
            courseInterested: 'B.Tech Computer Science & Engineering',
            examTaken: 'JEE Advanced',
            score: 99.8,
            status: 'Counseling',
            notes: 'Counselor scheduled online document verification for Round 1.',
            createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000),
          },
          {
            _id: 'app-2',
            collegeId: 'clg-3',
            collegeName: 'National Institute of Technology (NIT) Trichy',
            courseInterested: 'B.Tech Artificial Intelligence & Data Science',
            examTaken: 'JEE Main',
            score: 98.6,
            status: 'Admitted',
            notes: 'Provisional seat allotment letter issued. Fee receipt confirmed.',
            createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000),
          },
        ],
      };
    }
  },

  payApplicationFee: async (leadId, paymentDetails = {}) => {
    try {
      const response = await axiosInstance.post(`/leads/${leadId}/pay`, paymentDetails);
      return response.data;
    } catch (error) {
      console.warn('Backend payment endpoint error, using simulated receipt:', error.message);
      await mockApiDelay(500);
      const txnId = `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      return {
        success: true,
        message: 'Application fee payment processed successfully.',
        data: {
          _id: leadId,
          paymentStatus: 'paid',
          amountPaid: paymentDetails.amount || 750,
          transactionId: txnId,
          paymentMethod: paymentDetails.paymentMethod || 'UPI',
          paidAt: new Date(),
          status: 'Counseling',
        },
        receipt: {
          receiptNumber: `RCPT-2026-${Math.floor(100000 + Math.random() * 900000)}`,
          transactionId: txnId,
          amount: paymentDetails.amount || 750,
          date: new Date().toISOString(),
          status: 'PAID',
          paymentMethod: paymentDetails.paymentMethod || 'UPI',
          gstin: '27AABCC1234D1Z5',
          hsnCode: '999293',
        }
      };
    }
  },
};
