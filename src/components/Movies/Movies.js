import { useEffect, useState } from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js'
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js'
import findMovies from '../../utils/findMovies.js';
import selectShortMovies from '../../utils/selectShortMovies.js';

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
    const savedSearch = localStorage.getItem('searchQuery');

    if (savedSearch) {
      setSavedSearchQueryInLS(savedSearch);
      onToggleShortMovie(JSON.parse(localStorage.getItem('toggleShortMovie')));

      const savedMoviesInStorage = JSON.parse(localStorage.getItem('movies'));

      savedMoviesInStorage.forEach(movie => {
        const savedMovie = saveMovies.find(
          savedMovie => savedMovie.movieId === movie.id || savedMovie.id === movie.id
        );
        savedMovie ? movie.isLiked = true : movie.isLiked = false;
      });

      setMovies(savedMoviesInStorage);
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
      .then(async moviesList => {
        await setMovies(findMovies(moviesList, searchQuery))

        localStorage.setItem('searchQuery', searchQuery);
        localStorage.setItem('toggleShortMovie', toggleShortMovie);
        localStorage.setItem('movies', JSON.stringify(movies));
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

  const renderListMovies = () => {
    return toggleShortMovie ? selectShortMovies(movies) : movies
  }

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
        moviesList={renderListMovies()}
        savedMovieBtn={false}
        handleActionBtn={handleMovieBtnClick}
      />
      <Footer/>
    </div>
  );
};

export default Movies;
