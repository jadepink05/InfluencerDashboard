require('dotenv').config();
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const User = require('../models/User');
const Influencer = require('../models/Influencer');
const Campaign = require('../models/Campaign');
const PerformanceMetric = require('../models/PerformanceMetric');

const users = [
  { name: 'Aarav Mehta', email: 'aarav@example.com', role: 'Marketing Analyst' },
  { name: 'Diya Sharma', email: 'diya@example.com', role: 'Campaign Manager' },
  { name: 'Kabir Rao', email: 'kabir@example.com', role: 'Brand Manager' },
  { name: 'Nisha Kapoor', email: 'nisha@example.com', role: 'Marketing Analyst' },
  { name: 'Rohan Iyer', email: 'rohan@example.com', role: 'Reporting Lead' }
];

const influencers = [
  ['Prajakta Koli', 'YouTube', 'Lifestyle', 7100000, 'India', 'prajakta@example.com'],
  ['Komal Pandey', 'Instagram', 'Fashion', 1900000, 'India', 'komal@example.com'],
  ['Ankush Bahuguna', 'Instagram', 'Beauty', 1100000, 'India', 'ankush@example.com'],
  ['Ranveer Allahbadia', 'YouTube', 'Podcast', 5600000, 'India', 'ranveer@example.com'],
  ['Masoom Minawala', 'Instagram', 'Fashion', 1300000, 'India', 'masoom@example.com'],
  ['Kusha Kapila', 'Instagram', 'Comedy', 3400000, 'India', 'kusha@example.com'],
  ['Mumbiker Nikhil', 'YouTube', 'Travel', 4000000, 'India', 'nikhil@example.com'],
  ['Sejal Kumar', 'YouTube', 'Lifestyle', 1500000, 'India', 'sejal@example.com'],
  ['Dolly Singh', 'Instagram', 'Comedy', 1700000, 'India', 'dolly@example.com'],
  ['BeerBiceps Shorts', 'TikTok', 'Fitness', 850000, 'India', 'shorts@example.com'],
  ['Rhea Kohli', 'LinkedIn', 'Career', 210000, 'India', 'rhea@example.com'],
  ['Neil Fernandes', 'X', 'Tech', 330000, 'India', 'neil@example.com'],
  ['Aisha Malik', 'Instagram', 'Beauty', 640000, 'UAE', 'aisha@example.com'],
  ['Daniel Lee', 'YouTube', 'Tech', 980000, 'Singapore', 'daniel@example.com'],
  ['Maya Chen', 'TikTok', 'Food', 760000, 'Singapore', 'maya@example.com'],
  ['Sara Johnson', 'Instagram', 'Fitness', 890000, 'USA', 'sara@example.com'],
  ['Liam Brown', 'YouTube', 'Gaming', 2300000, 'UK', 'liam@example.com'],
  ['Emma Wilson', 'Instagram', 'Travel', 540000, 'Australia', 'emma@example.com'],
  ['Arjun Menon', 'LinkedIn', 'Business', 180000, 'India', 'arjun@example.com'],
  ['Tara Singh', 'Instagram', 'Food', 450000, 'India', 'tara@example.com']
].map(([name, platform, category, followers, country, email]) => ({
  name,
  platform,
  category,
  followers,
  country,
  email
}));

const campaigns = [
  ['Summer Beauty Launch', 450000, '2026-05-01', '2026-06-15', 'Active', [0, 1, 2]],
  ['Monsoon Fashion Edit', 320000, '2026-06-01', '2026-07-05', 'Active', [1, 4, 17]],
  ['Tech Upgrade Week', 510000, '2026-03-10', '2026-04-01', 'Completed', [11, 13]],
  ['Fit India Challenge', 280000, '2026-07-01', '2026-08-01', 'Planned', [15, 9]],
  ['Creator Career Sprint', 190000, '2026-04-15', '2026-05-15', 'Completed', [10, 18]],
  ['Food Fest Online', 250000, '2026-06-20', '2026-07-20', 'Planned', [14, 19]],
  ['Travel Smart Campaign', 360000, '2026-02-01', '2026-03-01', 'Completed', [6, 17]],
  ['Podcast Growth Push', 410000, '2026-05-20', '2026-06-25', 'Active', [3, 11]],
  ['Comedy Reels Burst', 220000, '2026-04-05', '2026-04-30', 'Completed', [5, 8]],
  ['Lifestyle Discovery', 300000, '2026-06-10', '2026-07-10', 'Active', [0, 7, 12]]
];

const run = async () => {
  await connectDB();
  await Promise.all([User.deleteMany(), Influencer.deleteMany(), Campaign.deleteMany(), PerformanceMetric.deleteMany()]);

  const password = await bcrypt.hash('Password123!', 12);
  await User.insertMany(users.map((user) => ({ ...user, password })));
  const createdInfluencers = await Influencer.insertMany(influencers);

  const createdCampaigns = await Campaign.insertMany(
    campaigns.map(([campaignName, budget, startDate, endDate, status, indexes]) => ({
      campaignName,
      budget,
      startDate,
      endDate,
      status,
      influencers: indexes.map((index) => createdInfluencers[index]._id)
    }))
  );

  const metricRows = [];
  for (let i = 0; i < 50; i += 1) {
    const campaign = createdCampaigns[i % createdCampaigns.length];
    const influencerId = campaign.influencers[i % campaign.influencers.length];
    metricRows.push({
      influencer: influencerId,
      campaign: campaign._id,
      likes: 3500 + i * 210,
      comments: 180 + i * 17,
      shares: 90 + i * 11,
      reach: 45000 + i * 3200,
      impressions: 60000 + i * 4100
    });
  }

  await PerformanceMetric.insertMany(metricRows);
  console.log('Seed complete: 5 users, 20 influencers, 10 campaigns, 50 performance metric records.');
  process.exit(0);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
