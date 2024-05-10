import React from 'react';
import MovieCard from './MovieCard';

function FavoritesPage({ favorites }) {
  return (
    <div>
      <h1 className="h1-fav">Your Favorite Movies and Shows</h1>
      {favorites && favorites.length > 0 ? (
        <div className="favorites-page">
          {favorites.map((favorite) => (
            <MovieCard key={favorite.id} movie={favorite} />
          ))}
        </div>
      ) : (
        <p className="p-fav">Seems like you haven't added any Movie or TV Show to your favorites yet.</p>
      )}
    </div>
  );
}

export default FavoritesPage;
