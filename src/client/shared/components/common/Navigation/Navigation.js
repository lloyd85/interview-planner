import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav className="nav-main">
    <ul className="nav-list">
      <li className="nav-list-item"><Link to="/">Home</Link></li>
      <li className="nav-list-item"><Link to="/interviews">Interviews</Link></li>
      <li className="nav-list-item"><Link to="/profile">Profile</Link></li>
    </ul>
  </nav>
);

export default Navigation;
