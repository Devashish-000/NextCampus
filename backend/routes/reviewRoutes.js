const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Get all reviews
router.get('/', async (req, res) => {
  try {
    let reviews = await Review.find().sort({ _id: -1 });
    // Seed dummy data if empty
    if (reviews.length === 0) {
      const dummy = [
        { college: 'Indian Institute of Technology (IIT) Bombay', author: 'Aarav Sharma', date: '2025-01-15', rating: 4.5, pros: 'Phenomenal peer group and coding culture.', cons: 'Academic workload can be intense.', status: 'PENDING' },
        { college: 'Indian Institute of Technology (IIT) Delhi', author: 'Ananya Iyer', date: '2025-02-15', rating: 4.8, pros: 'Top tier placement offers from companies like Amazon, Google.', cons: 'Mess food quality varies occasionally.', status: 'APPROVED' },
        { college: 'National Institute of Technology (NIT) Trichy', author: 'Rahul Verma', date: '2025-03-01', rating: 3.5, pros: 'Good infrastructure and faculty.', cons: 'Hostel facilities need improvement.', status: 'REJECTED' }
      ];
      await Review.insertMany(dummy);
      reviews = await Review.find().sort({ _id: -1 });
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new review
router.post('/', async (req, res) => {
  try {
    const { college, author, rating, pros, cons, status } = req.body;
    const newReview = new Review({
      college: college || 'General University',
      author: author || 'Student',
      rating: Number(rating) || 4.5,
      pros: pros || '',
      cons: cons || '',
      status: status || 'PENDING',
      date: new Date().toISOString().split('T')[0],
    });
    const saved = await newReview.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update review status
router.put('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete review
router.delete('/:id', async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
