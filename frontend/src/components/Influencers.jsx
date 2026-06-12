import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const emptyForm = {
  name: '',
  platform: 'Instagram',
  category: '',
  followers: '',
  country: '',
  email: ''
};

const Influencers = () => {
  const [influencers, setInfluencers] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [filters, setFilters] = useState({ search: '', platform: '', category: '' });

  const loadInfluencers = async () => {
    const { data } = await api.get('/influencers', { params: filters });
    setInfluencers(data);
  };

  useEffect(() => {
    loadInfluencers();
  }, [filters.platform, filters.category]);

  const categories = useMemo(
    () => [...new Set(influencers.map((item) => item.category).filter(Boolean))],
    [influencers]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = { ...form, followers: Number(form.followers) };
    if (editingId) {
      await api.put(`/influencers/${editingId}`, payload);
    } else {
      await api.post('/influencers', payload);
    }
    setForm(emptyForm);
    setEditingId(null);
    loadInfluencers();
  };

  const editInfluencer = (influencer) => {
    setEditingId(influencer._id);
    setForm({
      name: influencer.name,
      platform: influencer.platform,
      category: influencer.category,
      followers: influencer.followers,
      country: influencer.country,
      email: influencer.email
    });
  };

  const deleteInfluencer = async (id) => {
    if (window.confirm('Delete this influencer?')) {
      await api.delete(`/influencers/${id}`);
      loadInfluencers();
    }
  };

  const search = (event) => {
    event.preventDefault();
    loadInfluencers();
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">Creator database</p>
          <h1>Influencer Management</h1>
        </div>
      </div>
      <form className="toolbar" onSubmit={search}>
        <input placeholder="Search influencers" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select value={filters.platform} onChange={(e) => setFilters({ ...filters, platform: e.target.value })}>
          <option value="">All Platforms</option>
          {['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'X'].map((platform) => <option key={platform}>{platform}</option>)}
        </select>
        <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
        <button className="secondary-button" type="submit">Search</button>
      </form>
      <div className="two-column wide-left">
        <section className="panel">
          <h2>{editingId ? 'Edit Influencer' : 'Add Influencer'}</h2>
          <form className="stacked-form" onSubmit={handleSubmit}>
            <input required placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select value={form.platform} onChange={(e) => setForm({ ...form, platform: e.target.value })}>
              {['Instagram', 'YouTube', 'TikTok', 'LinkedIn', 'X'].map((platform) => <option key={platform}>{platform}</option>)}
            </select>
            <input required placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input required type="number" placeholder="Followers" value={form.followers} onChange={(e) => setForm({ ...form, followers: e.target.value })} />
            <input required placeholder="Country" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
            <input required placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            <button className="primary-button" type="submit">{editingId ? 'Update Influencer' : 'Add Influencer'}</button>
          </form>
        </section>
        <section className="panel">
          <h2>Influencers</h2>
          <div className="table-wrap">
            <table>
              <thead>
                <tr><th>Name</th><th>Platform</th><th>Category</th><th>Followers</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {influencers.map((influencer) => (
                  <tr key={influencer._id}>
                    <td>{influencer.name}</td>
                    <td>{influencer.platform}</td>
                    <td>{influencer.category}</td>
                    <td>{Number(influencer.followers).toLocaleString()}</td>
                    <td>
                      <button onClick={() => editInfluencer(influencer)}>Edit</button>
                      <button className="danger" onClick={() => deleteInfluencer(influencer._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Influencers;
