import React, { useState } from 'react';

function MovieCard({ movie, onAddToFavorites, onAddToWatchlist }) {
  let releaseYear;
  if (movie.media_type === 'tv') {
    releaseYear = movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 'Not Specified';
  } else {
    releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Not Specified';
  }

  const title = movie.title ? movie.title : (movie.name ? movie.name : 'Name Not Specified');
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'No Ratings';

  const [showFavoritesPopup, setShowFavoritesPopup] = useState(false);
  const [showWatchlistPopup, setShowWatchlistPopup] = useState(false);

  const handleAddToFavorites = () => {
    onAddToFavorites(movie);
    setShowFavoritesPopup(true);
    setTimeout(() => {
      setShowFavoritesPopup(false);
    }, 2000);
  };

  const handleAddToWatchlist = () => {
    onAddToWatchlist(movie);
    setShowWatchlistPopup(true);
    setTimeout(() => {
      setShowWatchlistPopup(false);
    }, 2000);
  };

  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <img className="poster" src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={title} onError={(e) => e.target.src = 'placeholder.jpg'} />
      ) : (
        <div className="no-poster">No Poster Available</div>
      )}
      <div className='btn-cont'>
        <button className="add-to-favorites" title="Add to Favorites" onClick={handleAddToFavorites}><span role="img" aria-label="Favorite">&#x1F5A4;</span></button>
        <button id='wat-btn' className="add-to-favorites" title="Add to Watchlist" onClick={handleAddToWatchlist}><span role="img" aria-label="Watchlist">&#128356;</span></button>
      </div>

      <h2 className='mv-name'>{title}</h2>
      <div className="movie-info">
        <span className="release-year">Year: {releaseYear}</span>
        <span className="rating">Ratings: {rating}</span>
      </div>
      {movie.overview && <p>{movie.overview}</p>}
      {!movie.overview && <p>No overview available for this movie.</p>}
      {showFavoritesPopup && <div className="popup">Added to your Favorites!</div>}
      {showWatchlistPopup && <div className="popup">Added to your Watchlist!</div>}
    </div>
  );
}

export default MovieCard;
