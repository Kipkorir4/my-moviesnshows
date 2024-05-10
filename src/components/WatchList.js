import React from 'react';
import MovieCard from './MovieCard';

function WatchListPage({ watchlist }) {
  return (
    <div>
      <h1 className="h1-fav">Your Watchlist</h1>
      {watchlist && watchlist.length > 0 ? (
        <div className="favorites-page">
          {watchlist.map((item) => (
            <MovieCard key={item.id} movie={item} />
          ))}
        </div>
      ) : (
        <p className="p-fav">Seems like you haven't added any Movie or TV Show to your Watchlist yet.</p>
      )}
    </div>
  );
}

export default WatchListPage;
