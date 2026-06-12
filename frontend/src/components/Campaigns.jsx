import { useEffect, useState } from 'react';
import api from '../services/api';

const emptyForm = {
  campaignName: '',
  budget: '',
  startDate: '',
  endDate: '',
  status: 'Planned',
  influencers: []
};

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [influencers, setInfluencers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const loadData = async () => {
    const [campaignRes, influencerRes] = await Promise.all([
      api.get('/campaigns'),
      api.get('/influencers')
    ]);
    setCampaigns(campaignRes.data);
    setInfluencers(influencerRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const toggleInfluencer = (id) => {
    const selected = form.influencers.includes(id);
    setForm({
      ...form,
      influencers: selected ? form.influencers.filter((item) => item !== id) : [...form.influencers, id]
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...form, budget: Number(form.budget) };
    if (editingId) {
      await api.put(`/campaigns/${editingId}`, payload);
    } else {
      await api.post('/campaigns', payload);
    }
    setForm(emptyForm);
    setEditingId(null);
    loadData();
  };

  const editCampaign = (campaign) => {
    setEditingId(campaign._id);
    setForm({
      campaignName: campaign.campaignName,
      budget: campaign.budget,
      startDate: campaign.startDate?.slice(0, 10),
      endDate: campaign.endDate?.slice(0, 10),
      status: campaign.status,
      influencers: campaign.influencers.map((item) => item._id)
    });
  };

  const deleteCampaign = async (id) => {
    if (window.confirm('Delete this campaign?')) {
      await api.delete(`/campaigns/${id}`);
      loadData();
    }
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Campaign workspace</p>
          <h1>Campaign Management</h1>
        </div>
      </div>
      <div className="two-column wide-left">
        <section className="panel">
          <h2>{editingId ? 'Edit Campaign' : 'Create Campaign'}</h2>
          <form className="stacked-form" onSubmit={handleSubmit}>
            <input required placeholder="Campaign Name" value={form.campaignName} onChange={(e) => setForm({ ...form, campaignName: e.target.value })} />
            <input required type="number" placeholder="Budget" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
            <input required type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
            <input required type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              {['Planned', 'Active', 'Completed'].map((status) => <option key={status}>{status}</option>)}
            </select>
            <div className="check-list">
              {influencers.map((influencer) => (
                <label key={influencer._id}>
                  <input type="checkbox" checked={form.influencers.includes(influencer._id)} onChange={() => toggleInfluencer(influencer._id)} />
                  {influencer.name}
                </label>
              ))}
            </div>
            <button className="primary-button" type="submit">{editingId ? 'Update Campaign' : 'Create Campaign'}</button>
          </form>
        </section>
        <section className="panel">
          <h2>Campaigns</h2>
          <div className="campaign-list">
            {campaigns.map((campaign) => (
              <article className="campaign-card" key={campaign._id}>
                <div>
                  <h3>{campaign.campaignName}</h3>
                  <p>{campaign.status} | Budget Rs. {Number(campaign.budget).toLocaleString()}</p>
                  <p>{campaign.influencers.map((item) => item.name).join(', ') || 'No influencers assigned'}</p>
                </div>
                <div className="row-actions">
                  <button onClick={() => editCampaign(campaign)}>Edit</button>
                  <button className="danger" onClick={() => deleteCampaign(campaign._id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Campaigns;
