const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

// Get all scholarships
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find().sort({ createdAt: -1 });
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new scholarship
router.post('/', async (req, res) => {
  const scholarship = new Scholarship(req.body);
  try {
    const newScholarship = await scholarship.save();
    res.status(201).json(newScholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a scholarship
router.put('/:id', async (req, res) => {
  try {
    const updatedScholarship = await Scholarship.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedScholarship);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a scholarship
router.delete('/:id', async (req, res) => {
  try {
    await Scholarship.findByIdAndDelete(req.params.id);
    res.json({ message: 'Scholarship deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
