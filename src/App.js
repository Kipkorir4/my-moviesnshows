import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import FavoritesPage from './components/FavoritesPage';
import WatchListPage from './components/WatchList';
import AppName from './components/AppName';

function App() {
  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  const addToFavorites = (movie) => {
    if (!favorites.find((favMovie) => favMovie.id === movie.id)) {
      setFavorites(prevFavorites => [...prevFavorites, movie]);
    } else {
      alert('Movie is already in your favorites.');
    }
  };

  const addToWatchlist = (movie) => {
    if (!watchlist.find((watchMovie) => watchMovie.id === movie.id)) {
      setWatchlist(prevWatchlist => [...prevWatchlist, movie]);
    } else {
      alert('Movie is already in your watchlist.');
    }
  };

  return (
    <Router>
      <div className="App">
        <AppName />
        <Routes>
          <Route path="/" element={<Home addToFavorites={addToFavorites} addToWatchlist={addToWatchlist} />} />
          <Route path="/favorites" element={<FavoritesPage favorites={favorites} />} />
          <Route path="/watchlist" element={<WatchListPage watchlist={watchlist} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
