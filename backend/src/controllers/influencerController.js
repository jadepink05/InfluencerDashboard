const Influencer = require('../models/Influencer');
const Campaign = require('../models/Campaign');
const PerformanceMetric = require('../models/PerformanceMetric');

const getInfluencers = async (req, res) => {
  const { search, platform, category } = req.query;
  const query = {};

  if (search) query.name = { $regex: search, $options: 'i' };
  if (platform) query.platform = platform;
  if (category) query.category = category;

  const influencers = await Influencer.find(query).sort({ createdAt: -1 });
  res.json(influencers);
};

const createInfluencer = async (req, res) => {
  const influencer = await Influencer.create(req.body);
  res.status(201).json(influencer);
};

const updateInfluencer = async (req, res) => {
  const influencer = await Influencer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!influencer) return res.status(404).json({ message: 'Influencer not found' });
  return res.json(influencer);
};

const deleteInfluencer = async (req, res) => {
  const influencer = await Influencer.findById(req.params.id);
  if (!influencer) return res.status(404).json({ message: 'Influencer not found' });

  await Campaign.updateMany({}, { $pull: { influencers: influencer._id } });
  await PerformanceMetric.deleteMany({ influencer: influencer._id });
  await influencer.deleteOne();

  return res.json({ message: 'Influencer deleted successfully' });
};

module.exports = { getInfluencers, createInfluencer, updateInfluencer, deleteInfluencer };
