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
import { errorMessage } from '../../utils/constants.js';

function Movies({
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
    setSearchQuery(sessionStorage.getItem('searchQuery'));
    onToggleShortMovie(JSON.parse(sessionStorage.getItem('toggleShortMovie')));
  }, []);

  useEffect(() => {
    setIsLoad(true);

    if (searchQuery) {
      const savedMoviesInStorage = JSON.parse(localStorage.getItem('movies'));

      const findMoviesList = findMovies(savedMoviesInStorage, searchQuery);

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
  }, [savedMoviesInLS, searchQuery, typeContainer.loadCards, toggleShortMovie, saveMovies]);

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

  const handleBtnMore = () => {
    const loadedMovies = loadList.slice(movies.length, movies.length + typeContainer.moreCards);

    setMovies([...movies, ...loadedMovies]);
  }

  const handleSubmit = (search) => {
    if (!savedMoviesInLS) {
      moviesApi.getMovies()
        .then(allMoviesArr => {
          sessionStorage.setItem('searchQuery', search);
          setSearchQuery(search)

          sessionStorage.setItem('toggleShortMovie', toggleShortMovie);

          localStorage.setItem('movies', JSON.stringify(allMoviesArr));
          setSavedMoviesInLS(allMoviesArr);
        })
        .catch(() => setError(errorMessage.tryAgainLater))
        .finally(() => setIsLoad(false))
    } else {
      sessionStorage.setItem('searchQuery', search);
      setSearchQuery(search)

      sessionStorage.setItem('toggleShortMovie', toggleShortMovie);
    }
  }

  return(
    <div className="layout layout_full-heigth-4row">
      <Header
        theme={{ default: false }}/>
      <SearchForm
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
