import React from 'react';

function FavoritesPage({ favorites }) {
  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      {favorites && favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite) => (
            <li key={favorite.id}>{favorite.title}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
}

export default FavoritesPage;
