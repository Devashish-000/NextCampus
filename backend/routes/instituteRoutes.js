const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get Institute Analytics
router.get('/analytics/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'institute') {
      return res.status(404).json({ message: 'Institute not found' });
    }
    
    // In a real scenario, this would aggregate views and bookmarks from other collections.
    // For now we just return the counts stored on the User profile (or mock them).
    res.json({
      profileViews: user.profileViews || 12450,
      studentsBookmarked: user.studentsBookmarked || 3205,
      profileActivity: [
        { action: 'Bookmarked College', user: 'Student ID: #8492', date: 'Today, 10:45 AM', status: 'Active' },
        { action: 'Downloaded Brochure', user: 'Student ID: #1129', date: 'Yesterday', status: 'Active' },
        { action: 'Viewed Placements', user: 'Student ID: #9932', date: '2 days ago', status: 'Active' }
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
