const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  collegeId: { type: String, required: true }, // can store ObjectId or mock ID
  collegeName: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studentName: { type: String, required: true, trim: true },
  studentEmail: { type: String, required: true, lowercase: true, trim: true },
  studentPhone: { type: String, required: true, trim: true },
  studentCity: { type: String, default: '' },
  courseInterested: { type: String, default: 'B.Tech Computer Science & Engineering' },
  examTaken: { type: String, default: 'JEE Main' },
  score: { type: Number },
  message: { type: String, default: '' },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Counseling', 'Admitted', 'Archived'],
    default: 'New'
  },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'paid'],
    default: 'unpaid'
  },
  amountPaid: { type: Number, default: 0 },
  transactionId: { type: String, default: '' },
  paidAt: { type: Date },
  notes: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lead', leadSchema);
