import { useEffect, useState } from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js'
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js'
import findMovies from '../../utils/findMovies.js';

function Movies({
  movies,
  setMovies,
  saveMovies,
  setSaveMovies,
  handleDeleteSaveMovie,
  toggleShortMovie,
  onToggleShortMovie
}) {
  const [ savedSearchQueryInLS, setSavedSearchQueryInLS ] = useState('');

  useEffect(() => {
    const savedSearch = localStorage.getItem('searchQuery'),
          savedToggle = JSON.parse(localStorage.getItem('toggleShortMovie'));

    if (savedSearch) {
      setSavedSearchQueryInLS(savedSearch);
      const savedMoviesInStorage = JSON.parse(localStorage.getItem('movies'));

      savedMoviesInStorage.forEach(movie => {
        const savedMovie = saveMovies.find(
          savedMovie => savedMovie.movieId === movie.id || savedMovie.id === movie.id
        );
        savedMovie ? movie.isLiked = true : movie.isLiked = false;
      });

      if (savedToggle) {
        onToggleShortMovie(JSON.parse(savedToggle), savedMoviesInStorage);
      } else {
        setMovies(savedMoviesInStorage);
      }
    }
  }, [saveMovies]);

  const handleSearch = (searchQuery) => {
    moviesApi.getMovies()
      .then(allMoviesArr => {
        allMoviesArr.forEach(movie => {
          const savedMovie = saveMovies.find(savedMovie => savedMovie.movieId === movie.id);
          savedMovie ? movie.isLiked = true : movie.isLiked = false;
        });

        return allMoviesArr;
      })
      .then(moviesList => {
        const filterMovies = findMovies(moviesList, searchQuery);

        setMovies(filterMovies);
        localStorage.setItem('searchQuery', searchQuery);
        localStorage.setItem('toggleShortMovie', toggleShortMovie);
        localStorage.setItem('movies', JSON.stringify(filterMovies));
      })
  };

  const handleMovieBtnClick = (movieData) => {
    if (movieData.isLiked) {
      handleDeleteSaveMovie(movieData);
    } else {
      mainApi.postNewSavedMovie(movieData)
        .then(savedMovie => {
          savedMovie.isLiked = true;
          setMovies(movies => movies.map(movie => movie.id === savedMovie.movieId ? savedMovie : movie));
          setSaveMovies([...saveMovies, savedMovie]);
        });
    }
  };

  return(
    <div className="layout">
      <Header
        theme={{ default: false }}/>
      <SearchForm
        onSubmit={handleSearch}
        savedSearch={savedSearchQueryInLS}
        toggleShortMovie={toggleShortMovie}
        onToggleShortMovie={onToggleShortMovie}/>
      <MoviesCardList
        moviesList={movies}
        savedMovieBtn={false}
        handleActionBtn={handleMovieBtnClick}
      />
      <Footer/>
    </div>
  );
};

export default Movies;
