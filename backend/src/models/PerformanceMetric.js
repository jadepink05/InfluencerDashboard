const mongoose = require('mongoose');

const performanceMetricSchema = new mongoose.Schema(
  {
    // Each metric belongs to one influencer.
    influencer: { type: mongoose.Schema.Types.ObjectId, ref: 'Influencer', required: true },
    // Each metric also belongs to one campaign.
    campaign: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
    likes: { type: Number, default: 0, min: 0 },
    comments: { type: Number, default: 0, min: 0 },
    shares: { type: Number, default: 0, min: 0 },
    reach: { type: Number, default: 0, min: 0 },
    impressions: { type: Number, default: 0, min: 0 }
  },
  { timestamps: true }
);

performanceMetricSchema.virtual('engagementRate').get(function getEngagementRate() {
  const followers = this.influencer && this.influencer.followers ? this.influencer.followers : 0;
  if (!followers) return 0;
  return Number((((this.likes + this.comments + this.shares) / followers) * 100).toFixed(2));
});

performanceMetricSchema.set('toJSON', { virtuals: true });
performanceMetricSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('PerformanceMetric', performanceMetricSchema);
