const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
const collegeRoutes = require('./routes/collegeRoutes');
const scholarshipRoutes = require('./routes/scholarshipRoutes');
const placementRoutes = require('./routes/placementRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const recommendationRoutes = require('./routes/recommendationRoutes');
const leadRoutes = require('./routes/leadRoutes');
const counselorRoutes = require('./routes/counselorRoutes');

app.use('/api/colleges', collegeRoutes);
app.use('/api/scholarships', scholarshipRoutes);
app.use('/api/placements', placementRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/institute', instituteRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/counselor', counselorRoutes);

// Health check for cloud deployments (Render, Vercel, Uptime monitors)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'NextCampus / CollegeSphere API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
