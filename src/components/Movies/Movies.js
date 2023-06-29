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

function Movies({
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
        [ findMovie, setFindMovie ] = useState([]),
        typeConteiner = getTypeCardList(windowDimensions),
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
    if (savedSearchQueryInLS) {
      setSavedSearchQueryInLS(savedSearchQueryInLS);

      const savedMoviesInStorage = JSON.parse(sessionStorage.getItem('movies'));

      savedMoviesInStorage.forEach(movie => {
        const savedMovie = saveMovies.find(
          savedMovie => savedMovie.movieId === movie.id || savedMovie.id === movie.id
        );
        savedMovie ? movie.isLiked = true : movie.isLiked = false;
      });

      setLoadList(savedMoviesInStorage);
      const shortMovieLoadList = selectShortMovies(savedMoviesInStorage);

      if (!toggleShortMovie && savedMoviesInStorage.length > typeConteiner.loadCards) {
        setMovies(savedMoviesInStorage.slice(0, typeConteiner.loadCards));
      } else if (!toggleShortMovie && savedMoviesInStorage.length < typeConteiner.loadCards) {
        setMovies(savedMoviesInStorage.slice(0, typeConteiner.loadCards));
      } else if (toggleShortMovie && shortMovieLoadList.length > typeConteiner.loadCards) {
        setMovies(selectShortMovies(savedMoviesInStorage.slice(0, typeConteiner.loadCards)));
      } else if (toggleShortMovie && shortMovieLoadList.length < typeConteiner.loadCards) {
        setMovies(selectShortMovies(savedMoviesInStorage));
      }
    }
  }, [setMovies, typeConteiner.loadCards, saveMovies, toggleShortMovie, savedSearchQueryInLS]);

  useEffect(() => {
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

          setFindMovie(findMoviesList);

          setLoadList(findMoviesList);
          const shortMovieLoadList = selectShortMovies(findMoviesList);

          if (!toggleShortMovie && findMoviesList.length > typeConteiner.loadCards) {
            setMovies(findMoviesList.slice(0, typeConteiner.loadCards));
          } else if (!toggleShortMovie && findMoviesList.length < typeConteiner.loadCards) {
            setMovies(findMoviesList.slice(0, typeConteiner.loadCards));
          } else if (toggleShortMovie && shortMovieLoadList.length > typeConteiner.loadCards) {
            setMovies(selectShortMovies(findMoviesList.slice(0, typeConteiner.loadCards)));
          } else if (toggleShortMovie && shortMovieLoadList.length < typeConteiner.loadCards) {
            setMovies(selectShortMovies(findMoviesList));
          }

          sessionStorage.setItem('searchQuery', searchQuery);
          sessionStorage.setItem('toggleShortMovie', toggleShortMovie);
          sessionStorage.setItem('movies', JSON.stringify(findMoviesList));
        })
    }
  }, [searchQuery, typeConteiner.loadCards, saveMovies, toggleShortMovie])

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
    const loadedMovies = loadList.slice(movies.length, movies.length + typeConteiner.moreCards);

    setMovies([...movies, ...loadedMovies]);
  }

  const renderListMovies = () => {
    return toggleShortMovie ? selectShortMovies(movies) : movies
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
        moviesList={renderListMovies()}
        setMoviesList={setMovies}
        handleBtnMore={handleBtnMore}
        savedMovieBtn={false}
        handleActionBtn={handleMovieBtnClick}
      />
      <Footer/>
    </div>
  );
};

export default Movies;
