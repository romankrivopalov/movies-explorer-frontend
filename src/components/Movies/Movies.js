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
        typeConteiner = getTypeCardList(windowDimensions),
        [ savedSearchQueryInLS, setSavedSearchQueryInLS ] = useState('');

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [windowDimensions]);

  useEffect(() => {
    const savedSearch = sessionStorage.getItem('searchQuery');

    if (savedSearch) {
      setSavedSearchQueryInLS(savedSearch);
      onToggleShortMovie(JSON.parse(sessionStorage.getItem('toggleShortMovie')));

      const savedMoviesInStorage = JSON.parse(sessionStorage.getItem('movies'));

      savedMoviesInStorage.forEach(movie => {
        const savedMovie = saveMovies.find(
          savedMovie => savedMovie.movieId === movie.id || savedMovie.id === movie.id
        );
        savedMovie ? movie.isLiked = true : movie.isLiked = false;
      });

      if (savedMoviesInStorage.length > typeConteiner.loadCards) {
        setMovies(savedMoviesInStorage.slice(0, typeConteiner.loadCards));

        setLoadList(savedMoviesInStorage);
      } else {
        setMovies(savedMoviesInStorage);
      }
    }
  }, [setMovies, typeConteiner.loadCards]);

  useEffect(() => {
    if (searchQuery) {
      moviesApi.getMovies()
        .then(allMoviesArr => {
          console.log(22)
          return findMovies(allMoviesArr, searchQuery);
        })
        .then(findMoviesList => {
          findMoviesList.forEach(movie => {
            const savedMovie = saveMovies.find(savedMovie => savedMovie.movieId === movie.id);
            savedMovie ? movie.isLiked = true : movie.isLiked = false;
          });

          if (findMoviesList.length > typeConteiner.loadCards) {
            setMovies(findMoviesList.slice(0, typeConteiner.loadCards));

            setLoadList(findMoviesList);
          } else {
            setMovies(findMoviesList);
          }

          sessionStorage.setItem('searchQuery', searchQuery);
          sessionStorage.setItem('toggleShortMovie', toggleShortMovie);
          sessionStorage.setItem('movies', JSON.stringify(findMoviesList));
        })
    }
  }, [searchQuery, typeConteiner.loadCards])

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
    console.log(2)
    // const loadedMovies = moviesList.slice(loadList.length, loadList.length + typeConteiner.moreCards);

    // setLoadList([...filterList, ...loadedMovies]);
    // setFilterList([...filterList, ...loadedMovies]);
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
