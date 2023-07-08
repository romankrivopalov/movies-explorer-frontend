import { useEffect, useState } from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js'
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js'
import findMovies from '../../utils/findMovies.js';
import selectShortMovies from '../../utils/selectShortMovies.js';
import getWindowDimensions from '../../utils/getWindowDimensions.js';
import getTypeCardList from '../../utils/getTypeCardList.js';
import getFilterMovie from '../../utils/getFilterMovie.js';
import { ERROR_MESSAGE } from '../../utils/constants.js';
import { STORAGE_DATA_NAME } from '../../utils/constants.js';

function Movies({
  currentUser,
  isLoad,
  setIsLoad,
  movies,
  setMovies,
  saveMovies,
  setSaveMovies,
  handleDeleteSaveMovie,
  toggleShortMovie,
  onToggleShortMovie,
  error,
  setError,
}) {
  const [ windowDimensions, setWindowDimensions ] = useState(getWindowDimensions()),
        [ searchQuery, setSearchQuery ] = useState(null),
        [ loadList, setLoadList ] = useState([]),
        typeContainer = getTypeCardList(windowDimensions),
        [ savedMoviesInLS, setSavedMoviesInLS ] = useState(null);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

  useEffect(() => {
    setSearchQuery(sessionStorage.getItem(STORAGE_DATA_NAME.searchQuery));
    onToggleShortMovie(JSON.parse(sessionStorage.getItem(STORAGE_DATA_NAME.toggleShortMovie)));
    setSavedMoviesInLS(JSON.parse(localStorage.getItem(STORAGE_DATA_NAME.movies)));
  }, []);

  useEffect(() => {
    setIsLoad(true);

    if (searchQuery) {
      const findMoviesList = findMovies(savedMoviesInLS, searchQuery);

      findMoviesList.forEach(movie => {
        const savedMovie = saveMovies.find(
          savedMovie => savedMovie.movieId === movie.id || savedMovie.id === movie.id
        );
        savedMovie ? movie.isLiked = true : movie.isLiked = false;
      });

      setLoadList(toggleShortMovie
        ? selectShortMovies(findMoviesList)
        : findMoviesList);
      setMovies(getFilterMovie(findMoviesList, typeContainer, toggleShortMovie, setError));
    }

    setIsLoad(false);
  }, [currentUser, searchQuery, typeContainer.loadCards, toggleShortMovie, saveMovies]);

  const handleMovieBtnClick = (movieData) => {
    const movieId = movieData.id || movieData.movieId;

    if (movieData.isLiked) {
      movieData.isLiked = false;

      handleDeleteSaveMovie(movieData);

      const findMovie = savedMoviesInLS.find(movie => movie.id === movieId)
      setMovies(movies => movies.map(movie => movie.movieId === movieId ? findMovie : movie));
    } else {
      mainApi.postNewSavedMovie(movieData)
        .then(savedMovie => {
          savedMovie.isLiked = true;
          setMovies(movies => movies.map(movie => movie.id === savedMovie.movieId ? savedMovie : movie));
          setSaveMovies([...saveMovies, savedMovie]);
        })
        .catch(err => console.log(err))
    }
  };

  const handleBtnMore = () => {
    const loadedMovies = loadList.slice(movies.length, movies.length + typeContainer.moreCards);

    setMovies([...movies, ...loadedMovies]);
  }

  const handleSubmit = (search) => {
    setIsLoad(true);

    if (!savedMoviesInLS) {
      moviesApi.getMovies()
        .then(allMoviesArr => {
          sessionStorage.setItem(STORAGE_DATA_NAME.searchQuery, search);
          setSearchQuery(search)

          sessionStorage.setItem(STORAGE_DATA_NAME.toggleShortMovie, toggleShortMovie);

          localStorage.setItem(STORAGE_DATA_NAME.movies, JSON.stringify(allMoviesArr));
          setSavedMoviesInLS(allMoviesArr);
        })
        .catch(() => setError(ERROR_MESSAGE.tryAgainLater))
        .finally(() => setIsLoad(false))
    } else {
      sessionStorage.setItem(STORAGE_DATA_NAME.searchQuery, search);
      setSearchQuery(search)

      sessionStorage.setItem(STORAGE_DATA_NAME.toggleShortMovie, toggleShortMovie);

      setIsLoad(false);
    }
  }

  return(
    <div className="layout layout_full-heigth-4row">
      <Header
        theme={{ default: false }}/>
      <SearchForm
        isLoad={isLoad}
        onSubmit={handleSubmit}
        savedSearch={searchQuery}
        toggleShortMovie={toggleShortMovie}
        onToggleShortMovie={onToggleShortMovie}/>
      <MoviesCardList
        isLoad={isLoad}
        moviesList={movies}
        loadList={loadList}
        error={error}
        handleBtnMore={handleBtnMore}
        handleActionBtn={handleMovieBtnClick}
      />
      <Footer/>
    </div>
  );
};

export default Movies;
