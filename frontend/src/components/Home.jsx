import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

const chartData = [
  { name: 'Jan', reach: 120000, engagement: 3.8 },
  { name: 'Feb', reach: 180000, engagement: 4.2 },
  { name: 'Mar', reach: 240000, engagement: 4.6 },
  { name: 'Apr', reach: 310000, engagement: 5.1 }
];

const Home = () => (
  <div className="home">
    <section className="hero">
      <div>
        <p className="eyebrow">Marketing analytics workspace</p>
        <h1>Influencer Performance Analytics Platform</h1>
        <p>
          Manage influencers, plan campaigns, track performance, and export clean CSV data for Power BI reports.
        </p>
        <div className="hero-actions">
          <a className="primary-button" href="/register">Create Account</a>
          <a className="secondary-button" href="/login">Login</a>
          <a className="secondary-button" href="/powerbi/influencer_export.csv" download>Download CSV</a>
        </div>
      </div>
      <div className="hero-panel">
        <div className="mini-kpi"><span>Total Reach</span><strong>4.8M</strong></div>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="engagement" stroke="#1f7a5c" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>

    <section className="feature-grid">
      {['Influencer Management', 'Campaign Management', 'Analytics Dashboard', 'Power BI Reporting'].map((feature) => (
        <article className="feature-card" key={feature}>
          <h3>{feature}</h3>
          <p>Built around practical marketing-team work, not filler screens.</p>
        </article>
      ))}
    </section>

    <section className="kpi-grid">
      <div className="kpi-card"><span>Total Influencers Managed</span><strong>20</strong></div>
      <div className="kpi-card"><span>Active Campaigns</span><strong>4</strong></div>
      <div className="kpi-card"><span>Average Engagement Rate</span><strong>5.2%</strong></div>
      <div className="kpi-card"><span>Total Reach</span><strong>4.8M</strong></div>
    </section>

    <section className="chart-section">
      <h2>Sample Campaign Reach</h2>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="reach" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </section>
  </div>
);

export default Home;
