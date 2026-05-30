const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters'],
    validate: {
      validator: function(v) {
        // Block if it's ONLY numbers or symbols
        return /[a-zA-Z]/.test(v); // Must contain at least one letter
      },
      message: 'Name must contain at least one letter'
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'store_manager'], // Only allow these
    default: 'user'
  },
  storeName: {
    type: String,
    validate: {
      validator: function(v) {
        if (!v) return true; // Optional
        return /[a-zA-Z]/.test(v); // Must contain a letter if provided
      },
      message: 'Store name must contain at least one letter'
    }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);