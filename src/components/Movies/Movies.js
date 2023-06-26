import { useState } from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js'
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js'
import findMovies from '../../utils/findMovies.js';

function Movies({
  saveCards,
  setSaveCards,
  handleDeleteSaveMovie,
  toggleShortMovie,
  onToggleShortMovie
}) {
  const [ cards, setCards ] = useState([]);

  const handleSearch = (searchQuery) => {
    Promise.all([moviesApi.getMovies(), mainApi.getAllSavedMovies()])
      .then(res => {
        const [ allMoviesArr, savedMoviesArr ] = res;

        const moviesList = allMoviesArr.map(movie => {
          const savedMovie = savedMoviesArr.find(savedMovie => savedMovie.movieId === movie.id);

          savedMovie ? movie.isLiked = true : movie.isLiked = false;

          return movie;
        });

        return moviesList;
      })
      .then(moviesList => {
        setCards(findMovies(moviesList, searchQuery));
        localStorage.setItem('searchQuery', searchQuery);
        localStorage.setItem('toggleShortMovie', toggleShortMovie);
      })
  };

  const handleMovieBtnClick = (movieData) => {
    if (movieData.isLiked) {
      const isSavedMovieCard = saveCards.find(i => i.movieId === movieData.id);

      handleDeleteSaveMovie(isSavedMovieCard);
    } else {
      mainApi.postNewSavedMovie(movieData)
        .then(() => {
          movieData.isLiked = true;
          setCards((state) => state.map((movie) => movie.id === movieData.id ? movieData : movie));
        });
    }
  };

  return(
    <div className="layout">
      <Header
        theme={{ default: false }}/>
      <SearchForm
        onSubmit={handleSearch}
        toggleShortMovie={toggleShortMovie}
        onToggleShortMovie={onToggleShortMovie}/>
      <MoviesCardList
        cardList={cards}
        savedCardBtn={false}
        handleActionBtn={handleMovieBtnClick}
      />
      <Footer/>
    </div>
  );
};

export default Movies;
