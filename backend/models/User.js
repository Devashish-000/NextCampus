const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin', 'institute'], default: 'student' },
  
  // Student Profile Fields
  phone: { type: String },
  city: { type: String },
  state: { type: String },
  targetExam: { type: String },
  targetStream: { type: String },
  entranceScore: { type: Number },
  category: { type: String, enum: ['General', 'OBC-NCL', 'SC', 'ST', 'EWS'], default: 'General' },
  budgetMax: { type: Number },
  bio: { type: String },
  avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  savedColleges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'College' }],
  savedCollegesCount: { type: Number, default: 0 },
  profileCompleted: { type: Number, default: 20 },

  // Institute Fields
  collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
  profileViews: { type: Number, default: 0 },
  studentsBookmarked: { type: Number, default: 0 },
  
  createdAt: { type: Date, default: Date.now }
});

// Pre-save hook: Hash password before saving to DB
userSchema.pre('save', async function () {
  if (!this.isModified('password')) {
    return;
  }
  // Only hash if not already hashed with bcrypt ($2a$ or $2b$)
  if (!this.password.startsWith('$2a$') && !this.password.startsWith('$2b$')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// Compare password with support for seamless legacy migration
userSchema.methods.matchPassword = async function (enteredPassword) {
  if (this.password.startsWith('$2a$') || this.password.startsWith('$2b$')) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  // Legacy plain-text fallback: match and immediately hash
  if (this.password === enteredPassword) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(enteredPassword, salt);
    await this.save();
    return true;
  }
  return false;
};

// Generate and sign JWT token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, email: this.email },
    process.env.JWT_SECRET || 'collegesphere_super_secret_jwt_key_2026_production_grade',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

module.exports = mongoose.model('User', userSchema);

