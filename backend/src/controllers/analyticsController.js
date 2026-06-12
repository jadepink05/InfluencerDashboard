const Campaign = require('../models/Campaign');
const Influencer = require('../models/Influencer');
const PerformanceMetric = require('../models/PerformanceMetric');

const calculateRate = (metric) => {
  const followers = metric.influencer && metric.influencer.followers ? metric.influencer.followers : 0;
  if (!followers) return 0;
  return Number((((metric.likes + metric.comments + metric.shares) / followers) * 100).toFixed(2));
};

const getAnalytics = async (req, res) => {
  const [influencers, campaigns, metrics] = await Promise.all([
    Influencer.find(),
    Campaign.find().populate('influencers'),
    PerformanceMetric.find().populate('influencer').populate('campaign')
  ]);

  const activeCampaigns = campaigns.filter((campaign) => campaign.status === 'Active').length;
  const totalReach = metrics.reduce((sum, metric) => sum + metric.reach, 0);
  const averageEngagement =
    metrics.length === 0
      ? 0
      : Number((metrics.reduce((sum, metric) => sum + calculateRate(metric), 0) / metrics.length).toFixed(2));

  const topInfluencers = influencers
    .map((influencer) => {
      const related = metrics.filter((metric) => String(metric.influencer?._id) === String(influencer._id));
      const avg =
        related.length === 0
          ? 0
          : related.reduce((sum, metric) => sum + calculateRate(metric), 0) / related.length;
      return { name: influencer.name, platform: influencer.platform, engagementRate: Number(avg.toFixed(2)) };
    })
    .sort((a, b) => b.engagementRate - a.engagementRate)
    .slice(0, 6);

  const platformDistribution = Object.values(
    influencers.reduce((acc, influencer) => {
      acc[influencer.platform] = acc[influencer.platform] || { name: influencer.platform, value: 0 };
      acc[influencer.platform].value += 1;
      return acc;
    }, {})
  );

  const campaignReach = campaigns.map((campaign) => ({
    name: campaign.campaignName,
    reach: metrics
      .filter((metric) => String(metric.campaign?._id) === String(campaign._id))
      .reduce((sum, metric) => sum + metric.reach, 0)
  }));

  const engagementTrends = metrics
    .slice()
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .slice(-12)
    .map((metric, index) => ({
      name: `Record ${index + 1}`,
      engagementRate: calculateRate(metric)
    }));

  res.json({
    kpis: {
      totalInfluencers: influencers.length,
      activeCampaigns,
      averageEngagement,
      totalReach
    },
    recentCampaigns: campaigns.slice(0, 5),
    topInfluencers,
    platformDistribution,
    campaignReach,
    engagementTrends
  });
};

module.exports = { getAnalytics, calculateRate };
