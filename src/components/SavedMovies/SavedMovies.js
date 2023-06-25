import { useContext, useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import mainApi from '../../utils/MainApi.js'

function SavedMovies({ toggleShortMovie, onToggleShortMovie }) {
  const { loggeIn } = useContext(CurrentUserContext);
  const [ saveCards, setSaveCards ] = useState([]);

  useEffect(() => {
    if (loggeIn) {
      mainApi.getAllSavedMovies()
        .then(res => setSaveCards(res));
    }
  }, [loggeIn])

  const handleSubmit = (searchQuery) => {
    console.log(2)
  }

  return (
    <div className="layout">
      <Header
        theme={{ default: false }}/>
      <SearchForm
        onSubmit={handleSubmit}
        toggleShortMovie={toggleShortMovie}
        onToggleShortMovie={onToggleShortMovie}
      />
      <MoviesCardList
        cardList={saveCards}
        typeCardBtn={{save: false}}
      />
      <Footer/>
    </div>
  )
}

export default SavedMovies;
