const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  college: { type: String, required: true },
  author: { type: String, required: true },
  date: { type: String, default: () => new Date().toISOString().split('T')[0] },
  rating: { type: Number, required: true },
  pros: { type: String, required: true },
  cons: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'APPROVED', 'REJECTED'], default: 'PENDING' }
});

module.exports = mongoose.model('Review', reviewSchema);
