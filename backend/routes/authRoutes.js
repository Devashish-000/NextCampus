const express = require('express');
const router = express.Router();
const User = require('../models/User');
const College = require('../models/College');
const { protect } = require('../middleware/authMiddleware');

// @desc    Register a new user (Student / Institute / Admin)
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role, targetStream, targetExam, phone, state, category } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide full name, email, and password.',
      });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.',
      });
    }

    // Create user (password will be hashed by pre-save hook)
    const user = new User({
      fullName,
      email: email.toLowerCase(),
      password,
      role: role || 'student',
      targetStream: targetStream || 'Engineering',
      targetExam: targetExam || 'JEE Main',
      phone: phone || '',
      state: state || '',
      category: category || 'General',
    });

    await user.save();

    // Generate real signed JWT token
    const token = user.getSignedJwtToken();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration.',
    });
  }
});

// @desc    Authenticate user & get JWT token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: cleanEmail });

    // Auto-provision demo accounts if they don't exist yet
    if (!user) {
      let role = 'student';
      let fullName = 'Aarav Sharma';
      let collegeId = null;

      if (cleanEmail.startsWith('admin')) {
        role = 'admin';
        fullName = 'System Admin';
      } else if (cleanEmail.startsWith('aarav')) {
        role = 'student';
        fullName = 'Aarav Sharma';
      } else {
        // Match email prefix with college directory for institute reps
        const localPart = cleanEmail.split('@')[0].replace(/[^a-z0-9]/g, '');
        const allColleges = await College.find();

        let collegeMatch = null;
        for (const clg of allColleges) {
          const strippedName = clg.name.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (strippedName === localPart) {
            collegeMatch = clg;
            break;
          }
        }

        if (!collegeMatch) {
          for (const clg of allColleges) {
            const strippedName = clg.name.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
            if (localPart.length >= 3 && (strippedName.includes(localPart) || localPart.includes(strippedName))) {
              collegeMatch = clg;
              break;
            }
          }
        }

        if (collegeMatch) {
          role = 'institute';
          collegeId = collegeMatch._id;
          fullName = collegeMatch.name + ' Rep';
        } else if (cleanEmail.startsWith('institute')) {
          role = 'institute';
          fullName = 'College Rep';
        } else {
          return res.status(401).json({
            success: false,
            message: 'Invalid email or password.',
          });
        }
      }

      // Create demo user
      user = new User({
        email: cleanEmail,
        password,
        role,
        fullName,
        collegeId,
      });

      await user.save();
    } else {
      // User exists - verify password (supports bcrypt & auto-migration of plain text)
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password.',
        });
      }

      // Retroactively link college for institute accounts if missing
      if (user.role === 'institute' && !user.collegeId) {
        const localPart = cleanEmail.split('@')[0].replace(/[^a-z0-9]/g, '');
        const allColleges = await College.find();
        let collegeMatch = null;

        for (const clg of allColleges) {
          const strippedName = clg.name.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (strippedName === localPart || (localPart.length >= 3 && strippedName.includes(localPart))) {
            collegeMatch = clg;
            break;
          }
        }

        if (collegeMatch) {
          user.collegeId = collegeMatch._id;
          user.fullName = collegeMatch.name + ' Rep';
          await user.save();
        }
      }
    }

    // Generate real signed JWT token
    const token = user.getSignedJwtToken();

    // Sanitize user object
    const userResponse = user.toObject();
    delete userResponse.password;

    res.json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login.',
    });
  }
});

// @desc    Get currently logged in user profile
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Auth /me Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve profile.',
    });
  }
});

// @desc    Update user profile data
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
  try {
    const allowedFields = [
      'fullName',
      'phone',
      'city',
      'state',
      'targetExam',
      'targetStream',
      'entranceScore',
      'category',
      'budgetMax',
      'bio',
      'avatar',
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update profile.',
    });
  }
});

// @desc    Get all registered users (optional role filter)
// @route   GET /api/auth/users
// @access  Public / Private (Admin)
router.get('/users', async (req, res) => {
  try {
    const { role } = req.query;
    const filter = {};
    if (role) {
      filter.role = role;
    }
    const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error('Fetch Users Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch users.',
    });
  }
});

module.exports = router;
