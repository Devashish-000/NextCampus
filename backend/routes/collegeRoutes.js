const express = require('express');
const router = express.Router();
const College = require('../models/College');

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const colleges = await College.find().sort({ nirfRank: 1 });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single college
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) return res.status(404).json({ message: 'College not found' });
    res.json(college);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new college
router.post('/', async (req, res) => {
  const college = new College(req.body);
  try {
    const newCollege = await college.save();
    res.status(201).json(newCollege);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a college
router.put('/:id', async (req, res) => {
  try {
    const updatedCollege = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCollege);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a college
router.delete('/:id', async (req, res) => {
  try {
    await College.findByIdAndDelete(req.params.id);
    res.json({ message: 'College deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
