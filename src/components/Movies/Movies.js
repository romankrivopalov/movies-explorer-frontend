import { useState } from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js'
import moviesApi from '../../utils/MoviesApi.js';
import findMovies from '../../utils/findMovies.js';

function Movies({ toggleShortMovie, onToggleShortMovie }) {
  const [ cards, setCards ] = useState([]);

  const handleSubmit = (searchQuery) => {
    moviesApi.getMovies()
      .then(arrMovies => {
        setCards(findMovies(arrMovies, searchQuery))
      })
  }

  return(
    <div className="layout">
      <Header
        theme={{ default: false }}/>
      <SearchForm
        onSubmit={handleSubmit}
        toggleShortMovie={toggleShortMovie}
        onToggleShortMovie={onToggleShortMovie}/>
      <MoviesCardList
        cardList={cards}
        typeCardBtn={{save: true}}
      />
      <Footer/>
    </div>
  )
}

export default Movies;
