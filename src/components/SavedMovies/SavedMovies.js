import { useContext, useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import { saveCardList } from '../../utils/constants';

function SavedMovies() {
  const { loggeIn } = useContext(CurrentUserContext);
  const [ saveCards, setSaveCards ] = useState([]);

  useEffect(() => {
    if (loggeIn) {
      setSaveCards(saveCardList);
    }
  }, [loggeIn])

  return (
    <div className="layout">
      <Header
        theme={{ default: false }}/>
      <SearchForm/>
      <MoviesCardList
        cardList={saveCards}
        typeCardBtn={{save: false}}
      />
      <Footer/>
    </div>
  )
}

export default SavedMovies;
