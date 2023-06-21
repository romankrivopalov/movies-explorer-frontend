import { useContext, useEffect, useState } from 'react';
import Header from '../Header/Header.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList.js';
import Footer from '../Footer/Footer.js'
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import moviesApi from '../../utils/MoviesApi.js';
import findMovies from '../../utils/findMovies.js';

function Movies() {
  const { loggeIn } = useContext(CurrentUserContext),
        [ cards, setCards ] = useState([]);

  function handleSubmit(searchQuery) {
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
        onSubmit={handleSubmit}/>
      <MoviesCardList
        cardList={cards}
        typeCardBtn={{save: true}}
      />
      <Footer/>
    </div>
  )
}

export default Movies;
