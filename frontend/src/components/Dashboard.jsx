import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    api.get('/analytics').then((res) => setAnalytics(res.data));
  }, []);

  const kpis = analytics?.kpis || {};

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Welcome {user.name || 'User'}</p>
          <h1>Dashboard</h1>
        </div>
      </div>
      <div className="kpi-grid">
        <div className="kpi-card"><span>Total Influencers</span><strong>{kpis.totalInfluencers || 0}</strong></div>
        <div className="kpi-card"><span>Active Campaigns</span><strong>{kpis.activeCampaigns || 0}</strong></div>
        <div className="kpi-card"><span>Average Engagement Rate</span><strong>{kpis.averageEngagement || 0}%</strong></div>
        <div className="kpi-card"><span>Total Reach</span><strong>{(kpis.totalReach || 0).toLocaleString()}</strong></div>
      </div>
      <div className="two-column">
        <section className="panel">
          <h2>Recent Campaigns</h2>
          {(analytics?.recentCampaigns || []).map((campaign) => (
            <div className="list-row" key={campaign._id}>
              <span>{campaign.campaignName}</span><strong>{campaign.status}</strong>
            </div>
          ))}
        </section>
        <section className="panel">
          <h2>Top Influencers</h2>
          {(analytics?.topInfluencers || []).slice(0, 5).map((influencer) => (
            <div className="list-row" key={influencer.name}>
              <span>{influencer.name}</span><strong>{influencer.engagementRate}%</strong>
            </div>
          ))}
        </section>
      </div>
      <div className="quick-grid">
        <Link to="/influencers" className="quick-card">Manage Influencers</Link>
        <Link to="/campaigns" className="quick-card">Manage Campaigns</Link>
        <Link to="/analytics" className="quick-card">View Analytics</Link>
      </div>
    </section>
  );
};

export default Dashboard;
