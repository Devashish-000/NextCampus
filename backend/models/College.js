const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stream: { type: String, required: true },
  nirfRank: { type: Number, required: true },
  logo: { type: String, default: 'https://via.placeholder.com/150' },
  totalFees: { type: String, required: true },
  highestPackage: { type: String, required: true },
  avgPackage: { type: String, required: true },
  rating: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('College', collegeSchema);
