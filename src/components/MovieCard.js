import React from 'react';

function MovieCard({ movie, onAddToFavorites }) {
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'Not Specified';
  const movieTitle = movie.title ? movie.title : "'Movie name not specified'";

  const handleAddToFavorites = () => {
    onAddToFavorites(movie);
  };

  return (
    <div className="movie-card">
      {movie.poster_path ? (
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movieTitle} />
      ) : (
        <div className="black-background"></div>
      )}
      <button id="add-to-favorites" title="Add to Favorites" onClick={handleAddToFavorites}><span className="emoji">&#x1F5A4;</span></button>
      <h2 id='movie-title'>{movieTitle}</h2>
      <div className="movie-info">
        <span className="release-year">Release Year: {releaseYear}</span>
        {movie.vote_average && (
          <span className="rating">
            <i id="m-ratings"></i> Ratings: {movie.vote_average ? movie.vote_average : "No Ratings"}
          </span>
        )}
      </div>
      <p>{movie.overview}</p>
    </div>
  );
}

export default MovieCard;