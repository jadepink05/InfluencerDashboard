const Campaign = require('../models/Campaign');
const PerformanceMetric = require('../models/PerformanceMetric');

const getCampaigns = async (req, res) => {
  const campaigns = await Campaign.find().populate('influencers').sort({ createdAt: -1 });
  res.json(campaigns);
};

const createCampaign = async (req, res) => {
  const campaign = await Campaign.create(req.body);
  const populated = await campaign.populate('influencers');
  res.status(201).json(populated);
};

const updateCampaign = async (req, res) => {
  const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  }).populate('influencers');

  if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
  return res.json(campaign);
};

const deleteCampaign = async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

  await PerformanceMetric.deleteMany({ campaign: campaign._id });
  await campaign.deleteOne();
  return res.json({ message: 'Campaign deleted successfully' });
};

module.exports = { getCampaigns, createCampaign, updateCampaign, deleteCampaign };
