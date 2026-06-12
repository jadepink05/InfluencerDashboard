const mongoose = require('mongoose');

const influencerSchema = new mongoose.Schema(
  {
    // Name helps campaign teams identify the creator.
    name: { type: String, required: true, trim: true },
    // Platform is used for filtering and platform distribution charts.
    platform: { type: String, required: true, enum: ['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'X'] },
    // Category helps teams find creators for a campaign niche.
    category: { type: String, required: true, trim: true },
    // Followers are needed to calculate engagement rate.
    followers: { type: Number, required: true, min: 0 },
    // Country supports regional planning.
    country: { type: String, required: true, trim: true },
    // Email is used by the marketing team for outreach.
    email: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Influencer', influencerSchema);
