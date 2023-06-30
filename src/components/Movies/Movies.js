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

function Movies({
  isLoad,
  setIsLoad,
  movies,
  setMovies,
  saveMovies,
  setSaveMovies,
  handleDeleteSaveMovie,
  toggleShortMovie,
  onToggleShortMovie
}) {
  const [ windowDimensions, setWindowDimensions ] = useState(getWindowDimensions()),
        [ searchQuery, setSearchQuery ] = useState(null),
        [ loadList, setLoadList ] = useState([]),
        typeContainer = getTypeCardList(windowDimensions),
        [ savedSearchQueryInLS, setSavedSearchQueryInLS ] = useState(null);

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

  useEffect(() => {
    setSavedSearchQueryInLS(sessionStorage.getItem('searchQuery'));
  }, []);

  useEffect(() => {
    if (savedSearchQueryInLS) {
      onToggleShortMovie(JSON.parse(sessionStorage.getItem('toggleShortMovie')));
    }
  }, [savedSearchQueryInLS]);

  useEffect(() => {
    setIsLoad(false);

    if (savedSearchQueryInLS) {
      setSavedSearchQueryInLS(savedSearchQueryInLS);

      const savedMoviesInStorage = JSON.parse(sessionStorage.getItem('movies'));

      savedMoviesInStorage.forEach(movie => {
        const savedMovie = saveMovies.find(
          savedMovie => savedMovie.movieId === movie.id || savedMovie.id === movie.id
        );
        savedMovie ? movie.isLiked = true : movie.isLiked = false;
      });

      setLoadList(toggleShortMovie
        ? selectShortMovies(savedMoviesInStorage)
        : savedMoviesInStorage);
      setMovies(getFilterMovie(savedMoviesInStorage, typeContainer, toggleShortMovie));
    }

    setIsLoad(true);
  }, [setMovies, typeContainer.loadCards, saveMovies, toggleShortMovie, savedSearchQueryInLS, setLoadList]);

  useEffect(() => {
    setIsLoad(false);

    if (searchQuery) {
      moviesApi.getMovies()
        .then(allMoviesArr => {
          return findMovies(allMoviesArr, searchQuery);
        })
        .then(findMoviesList => {
          findMoviesList.forEach(movie => {
            const savedMovie = saveMovies.find(savedMovie => savedMovie.movieId === movie.id);
            savedMovie ? movie.isLiked = true : movie.isLiked = false;
          });

          setLoadList(toggleShortMovie
            ? selectShortMovies(findMoviesList)
            : findMoviesList);
          setMovies(getFilterMovie(findMoviesList, typeContainer, toggleShortMovie));

          sessionStorage.setItem('searchQuery', searchQuery);
          sessionStorage.setItem('toggleShortMovie', toggleShortMovie);
          sessionStorage.setItem('movies', JSON.stringify(findMoviesList));
        })
        .finally(() => setIsLoad(true))
    }
  }, [searchQuery, typeContainer.loadCards, saveMovies, toggleShortMovie, setLoadList])

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

  return(
    <div className="layout">
      <Header
        theme={{ default: false }}/>
      <SearchForm
        onSubmit={setSearchQuery}
        savedSearch={savedSearchQueryInLS}
        toggleShortMovie={toggleShortMovie}
        onToggleShortMovie={onToggleShortMovie}/>
      <MoviesCardList
        isLoad={isLoad}
        moviesList={movies}
        setMoviesList={setMovies}
        loadList={loadList}
        handleBtnMore={handleBtnMore}
        handleActionBtn={handleMovieBtnClick}
      />
      <Footer/>
    </div>
  );
};

export default Movies;
