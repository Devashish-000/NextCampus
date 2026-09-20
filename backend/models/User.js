const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'institute'], default: 'student' },
  
  // Student Profile Fields
  phone: { type: String },
  city: { type: String },
  state: { type: String },
  targetExam: { type: String },
  targetStream: { type: String },
  entranceScore: { type: Number },
  budgetMax: { type: Number },
  bio: { type: String },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  savedCollegesCount: { type: Number, default: 0 },
  profileCompleted: { type: Number, default: 20 },

  // Institute Fields
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  profileViews: { type: Number, default: 0 },
  studentsBookmarked: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
