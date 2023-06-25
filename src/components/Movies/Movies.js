import { useState } from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js'
import moviesApi from '../../utils/MoviesApi.js';
import mainApi from '../../utils/MainApi.js'
import findMovies from '../../utils/findMovies.js';

function Movies({ toggleShortMovie, onToggleShortMovie }) {
  const [ cards, setCards ] = useState([]);

  const handleSearch = (searchQuery) => {
    moviesApi.getMovies()
      .then(arrMovies => {
        setCards(findMovies(arrMovies, searchQuery))
      })
  }

  const handleSaveMovie = (movieData) => {
    console.log(movieData)
    mainApi.postNewSavedMovie(movieData);
  }

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
        handleActionBtn={handleSaveMovie}
      />
      <Footer/>
    </div>
  )
}

export default Movies;
