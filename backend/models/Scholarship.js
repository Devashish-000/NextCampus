const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  provider: { type: String, required: true },
  amount: { type: String, required: true },
  deadline: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);
