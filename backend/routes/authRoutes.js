const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    // Auto-create the demo accounts if they don't exist
    if (!user) {
      let role = 'student';
      let fullName = 'Aarav Sharma';
      let collegeId = null;

      if (email.startsWith('admin')) {
        role = 'admin';
        fullName = 'System Admin';
      } else if (email.startsWith('aarav')) {
        role = 'student';
      } else {
        // Try to match the email prefix (e.g., iit from iit@gmail.com) with any college
        const localPart = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        const College = require('../models/College');
        const allColleges = await College.find();
        
        let collegeMatch = null;
        // First try exact match
        for (const clg of allColleges) {
          const strippedName = clg.name.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (strippedName === localPart) {
            collegeMatch = clg;
            break;
          }
        }
        // Then partial match
        if (!collegeMatch) {
          for (const clg of allColleges) {
            const strippedName = clg.name.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
            // Only match if at least 3 chars to avoid random single letter matches
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
        } else if (email.startsWith('institute')) {
          role = 'institute';
          fullName = 'College Rep';
        } else {
          return res.status(401).json({ message: 'Invalid email or password. Not found in college directory.' });
        }
      }

      user = new User({ email, password, role, fullName, collegeId });
      await user.save();

    } else {
      if (password !== user.password) {
         return res.status(401).json({ message: 'Invalid email or password' });
      }
      // Retroactively link college if missing for existing institutes
      if (user.role === 'institute' && !user.collegeId) {
        const localPart = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
        const domain = email.split('@')[1];
        const domainPrefix = domain ? domain.split('.')[0].toLowerCase().replace(/[^a-z0-9]/g, '') : '';
        
        const College = require('../models/College');
        const allColleges = await College.find();
        
        let collegeMatch = null;
        for (const clg of allColleges) {
          const strippedName = clg.name.replace(/\s+/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
          if (strippedName === localPart || strippedName === domainPrefix || 
             (localPart.length >= 3 && (strippedName.includes(localPart) || localPart.includes(strippedName))) ||
             (domainPrefix.length >= 3 && (strippedName.includes(domainPrefix) || domainPrefix.includes(strippedName)))) {
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

    const token = 'mock_jwt_token_' + user._id;
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password, role, targetStream } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    user = new User({
      fullName,
      email,
      password,
      role: role || 'student',
      targetStream: targetStream || 'Engineering'
    });
    
    await user.save();
    const token = 'mock_jwt_token_' + user._id;
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
