const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  company: { type: String, required: true },
  avgPackage: { type: String, required: true },
  totalOffers: { type: Number, required: true }
});

const placementDataSchema = new mongoose.Schema({
  highestOffer: { type: String, default: '3.7 Cr' },
  averageSalary: { type: String, default: '24.8 LPA' },
  placementRate: { type: String, default: '98.2' },
  recruiters: [recruiterSchema]
});

module.exports = mongoose.model('PlacementData', placementDataSchema);
