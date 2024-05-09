import React, { useState, useEffect } from 'react';
import AppName from './AppName';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import '../styles/Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        let url = 'https://api.themoviedb.org/3/trending/all/day?api_key=7fd0c523004b838c4bc24cb05e0732df';
        if (searchTerm) {
          url = `https://api.themoviedb.org/3/search/multi?api_key=7fd0c523004b838c4bc24cb05e0732df&query=${searchTerm}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Sh*t, something ain\'t right ˙◠˙ ...apologies');
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const addToFavorites = (movie) => {
    // Check if the movie is already in favorites
    if (favorites.find((favMovie) => favMovie.id === movie.id)) {
      console.log('Movie is already in favorites.');
      return;
    }

    // Add the movie to favorites
    setFavorites([...favorites, movie]);
    console.log('Added to favorites:', movie);
  };

  const getSortedMovies = () => {
    console.log("Movies data:", movies);
    if (!sortType) return movies;
    return movies.filter((item) => {
      if (sortType === 'movie') {
        return item.media_type === 'movie' || !item.media_type;
      } else if (sortType === 'tv') {
        return item.media_type === 'tv';
      }
      return false;
    });
  };

  return (
    <div className="my-movies-and-shows">
      <nav className="navbar">
        <ul className="navbar-list">
          <li>Trending</li>
          <li>Top Rated</li>
        </ul>
      </nav>
      <AppName />
      <hr />
      <SearchBar onSearch={handleSearch} />
      <main className="main">
        {isLoading && <p>Loading movies...</p>}
        {error && <p>Error: {error}</p>}
        {!isLoading && !error && (
          <>
            <h2>Movies and TV Shows</h2>
            <div className="sort-buttons">
              <button
                id='movies'
                className={sortType === 'movie' ? 'active' : ''}
                onClick={() => handleSort('movie')}
              >
                Movies
              </button>
              <button
                id='shows'
                className={sortType === 'tv' ? 'active' : ''}
                onClick={() => handleSort('tv')}
              >
                TV Shows
              </button>
            </div>
            <div className="movie-card-container">
              {getSortedMovies().slice(0, 12).map((movie) => (
                <MovieCard key={movie.id} movie={movie} onAddToFavorites={addToFavorites} />
              ))}
            </div>
          </>
        )}
      </main>
      <footer className="footer">
        <p>Developed by Group 12</p>
        <p>Copyright &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default Home;
