import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';
import Footer from './Footer';
import '../styles/Home.css';
import '../styles/MovieCard.css';
import '../styles/Footer.css';

function Home({ addToFavorites, addToWatchlist }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

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

  const getSortedMovies = () => {
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

  const handleTrendingClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=7fd0c523004b838c4bc24cb05e0732df');
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

  const handleTopRatedClick = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=7fd0c523004b838c4bc24cb05e0732df');
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

  return (
    <>
      <div>
        <Navbar 
          onTrendingClick={handleTrendingClick} 
          onTopRatedClick={handleTopRatedClick} 
        />
        <SearchBar onSearch={handleSearch} />
        <main className="main">
          {isLoading && <p>Loading movies and/or TV Shows...</p>}
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
                  <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    onAddToFavorites={addToFavorites} 
                    onAddToWatchlist={addToWatchlist} 
                  />
                ))}
              </div>
            </>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Home;
