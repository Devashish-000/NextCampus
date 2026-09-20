const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Get all notifications
router.get('/', async (req, res) => {
  try {
    let notifications = await Notification.find().sort({ createdAt: -1 });
    if (notifications.length === 0) {
      const dummy = [
        { message: 'JoSAA Counselling Round 1 Seat Allotment Live', type: 'Alert' },
        { message: 'Reliance Foundation Scholarship Deadline Approaching', type: 'Scholarship' }
      ];
      await Notification.insertMany(dummy);
      notifications = await Notification.find().sort({ createdAt: -1 });
    }
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add new notification
router.post('/', async (req, res) => {
  const notification = new Notification({
    message: req.body.message,
    type: req.body.type
  });
  try {
    const newNotification = await notification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete notification
router.delete('/:id', async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notification deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
