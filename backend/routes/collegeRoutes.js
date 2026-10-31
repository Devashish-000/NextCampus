const express = require('express');
const router = express.Router();
const College = require('../models/College');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// @desc    Get all colleges (Public)
// @route   GET /api/colleges
// @access  Public
router.get('/', async (req, res) => {
  try {
    const colleges = await College.find().sort({ nirfRank: 1 });
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Get single college by ID (Public)
// @route   GET /api/colleges/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @desc    Add a new college (Admin only)
// @route   POST /api/colleges
// @access  Private (Admin)
router.post('/', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const college = new College(req.body);
    const newCollege = await college.save();
    res.status(201).json({ success: true, data: newCollege });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Update a college (Admin or authorized Institute rep)
// @route   PUT /api/colleges/:id
// @access  Private (Admin, Institute)
router.put('/:id', protect, authorizeRoles('admin', 'institute'), async (req, res) => {
  try {
    // If institute rep, verify they own this college
    if (req.user.role === 'institute' && req.user.collegeId && req.user.collegeId.toString() !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: 'You are only authorized to update your own institution.',
      });
    }

    const updatedCollege = await College.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCollege) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }

    res.json({ success: true, data: updatedCollege });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// @desc    Delete a college (Admin only)
// @route   DELETE /api/colleges/:id
// @access  Private (Admin)
router.delete('/:id', protect, authorizeRoles('admin'), async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);
    if (!college) {
      return res.status(404).json({ success: false, message: 'College not found' });
    }
    res.json({ success: true, message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
