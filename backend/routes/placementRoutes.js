const express = require('express');
const router = express.Router();
const PlacementData = require('../models/PlacementData');

// Get the single placement data document
router.get('/', async (req, res) => {
  try {
    let data = await PlacementData.findOne();
    if (!data) {
      // Create default if it doesn't exist
      data = new PlacementData({
        recruiters: [
          { company: 'Google', avgPackage: '42 LPA', totalOffers: 48 },
          { company: 'Microsoft', avgPackage: '45 LPA', totalOffers: 65 },
          { company: 'Apple', avgPackage: '50 LPA', totalOffers: 15 }
        ]
      });
      await data.save();
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update overall metrics
router.put('/', async (req, res) => {
  try {
    let data = await PlacementData.findOne();
    if (data) {
      data.highestOffer = req.body.highestOffer;
      data.averageSalary = req.body.averageSalary;
      data.placementRate = req.body.placementRate;
      await data.save();
      res.json(data);
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a recruiter
router.post('/recruiters', async (req, res) => {
  try {
    let data = await PlacementData.findOne();
    data.recruiters.push(req.body);
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a recruiter
router.delete('/recruiters/:recruiterId', async (req, res) => {
  try {
    let data = await PlacementData.findOne();
    data.recruiters = data.recruiters.filter(r => r._id.toString() !== req.params.recruiterId);
    await data.save();
    res.json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
