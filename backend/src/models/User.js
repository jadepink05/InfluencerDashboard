const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Name is shown in the dashboard header after login.
    name: { type: String, required: true, trim: true },
    // Email is used as the unique login identity.
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    // Password stores only the bcrypt hash, never the plain password.
    password: { type: String, required: true },
    // Role keeps the app flexible while still simple for a student project.
    role: { type: String, default: 'Marketing Analyst' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
