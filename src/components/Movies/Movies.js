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
    moviesApi.getMovies()
      .then(arrMovies => {
        setCards(findMovies(arrMovies, searchQuery));
        localStorage.setItem('searchQuery', searchQuery);
        localStorage.setItem('toggleShortMovie', toggleShortMovie);
      });
  };

  const handleMovieBtnClick = (movieData) => {
    const isSavedMovieCard = saveCards.find(i => i.movieId === movieData.id);

    if (isSavedMovieCard) {
      handleDeleteSaveMovie(isSavedMovieCard);
    } else {
      mainApi.postNewSavedMovie(movieData);
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
        typeCardBtn={{save: true}}
        handleActionBtn={handleMovieBtnClick}
      />
      <Footer/>
    </div>
  );
};

export default Movies;
