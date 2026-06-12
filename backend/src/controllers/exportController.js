const fs = require('fs');
const path = require('path');
const PerformanceMetric = require('../models/PerformanceMetric');
const { calculateRate } = require('./analyticsController');

const csvValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const exportCsv = async (req, res) => {
  const metrics = await PerformanceMetric.find().populate('influencer').populate('campaign');
  const headers = [
    'Influencer Name',
    'Platform',
    'Campaign Name',
    'Followers',
    'Likes',
    'Comments',
    'Shares',
    'Reach',
    'Impressions',
    'Engagement Rate'
  ];

  const rows = metrics.map((metric) => [
    metric.influencer?.name,
    metric.influencer?.platform,
    metric.campaign?.campaignName,
    metric.influencer?.followers,
    metric.likes,
    metric.comments,
    metric.shares,
    metric.reach,
    metric.impressions,
    calculateRate(metric)
  ]);

  const csv = [headers, ...rows].map((row) => row.map(csvValue).join(',')).join('\n');
  const exportDir = path.join(__dirname, '../../powerbi');
  const exportPath = path.join(exportDir, 'influencer_export.csv');

  fs.mkdirSync(exportDir, { recursive: true });
  fs.writeFileSync(exportPath, csv);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename="influencer_export.csv"');
  return res.send(csv);
};

module.exports = { exportCsv };
