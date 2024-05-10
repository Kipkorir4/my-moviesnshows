import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onTrendingClick, onTopRatedClick }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li onClick={onTrendingClick}>Trending</li>
        <li onClick={onTopRatedClick}>Top Rated</li>
        <li className='fav-wa'><Link to="/favorites">Favorites</Link></li>
        <li className='fav-wa'><Link to="/watchlist">Watchlist</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
