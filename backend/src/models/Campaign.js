const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema(
  {
    // Campaign name appears in reports and dashboard tables.
    campaignName: { type: String, required: true, trim: true },
    // Budget helps compare planned spend against campaign reach.
    budget: { type: Number, required: true, min: 0 },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    // Status supports simple campaign tracking.
    status: { type: String, enum: ['Planned', 'Active', 'Completed'], default: 'Planned' },
    // A campaign can work with many influencers.
    influencers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Influencer' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Campaign', campaignSchema);
