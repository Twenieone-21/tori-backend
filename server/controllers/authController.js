const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this';
const JWT_EXPIRES_IN = '7d';

const signToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, storeName } = req.body;

    // Strict validation
    if (!name || !/[a-zA-Z]/.test(name) || name.length < 2) {
      return res.status(400).json({ message: 'Name must contain at least 2 characters and one letter' });
    }
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address' });
    }
    
    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
    if (storeName && !/[a-zA-Z]/.test(storeName)) {
      return res.status(400).json({ message: 'Store name must contain at least one letter' });
    }

    // Check if email exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // ... rest of your register logic (hash password, save user, etc.)

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};