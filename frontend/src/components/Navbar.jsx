import { Link, NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">InfluencerIQ</Link>
      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        {token && <NavLink to="/dashboard">Dashboard</NavLink>}
        {token && <NavLink to="/influencers">Influencers</NavLink>}
        {token && <NavLink to="/campaigns">Campaigns</NavLink>}
        {token && <NavLink to="/analytics">Analytics</NavLink>}
        {!token && <NavLink to="/login">Login</NavLink>}
        {!token && <NavLink to="/register">Register</NavLink>}
        {token && <button className="link-button" onClick={logout}>Logout</button>}
      </div>
    </nav>
  );
};

export default Navbar;
