import { useEffect, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import api from '../services/api';

const colors = ['#2563eb', '#1f7a5c', '#f59e0b', '#dc2626', '#7c3aed'];

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const csvUrl = `${import.meta.env.BASE_URL}powerbi/influencer_export.csv`;

  useEffect(() => {
    api.get('/analytics').then((res) => setAnalytics(res.data));
  }, []);

  const downloadCsv = async () => {
    try {
      const response = await api.get('/export', { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'influencer_export.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      window.location.href = csvUrl;
    }
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Performance reporting</p>
          <h1>Analytics</h1>
        </div>
        <button className="primary-button" onClick={downloadCsv}>Export CSV</button>
      </div>
      <div className="chart-grid">
        <section className="panel">
          <h2>Top Influencers by Engagement</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analytics?.topInfluencers || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="engagementRate" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="panel">
          <h2>Platform Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={analytics?.platformDistribution || []} dataKey="value" nameKey="name" outerRadius={95} label>
                {(analytics?.platformDistribution || []).map((entry, index) => (
                  <Cell key={entry.name} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </section>
        <section className="panel">
          <h2>Campaign Reach</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={analytics?.campaignReach || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reach" fill="#1f7a5c" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </section>
        <section className="panel">
          <h2>Engagement Trends</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={analytics?.engagementTrends || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="engagementRate" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </section>
      </div>
    </section>
  );
};

export default Analytics;
