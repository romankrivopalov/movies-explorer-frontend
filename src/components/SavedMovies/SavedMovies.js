import { useContext, useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import mainApi from '../../utils/MainApi.js'

function SavedMovies({
  saveCards,
  setSaveCards,
  handleDeleteSaveMovie,
  toggleShortMovie,
  onToggleShortMovie
}) {
  const { loggeIn } = useContext(CurrentUserContext);

  useEffect(() => {
    if (loggeIn) {
      mainApi.getAllSavedMovies()
        .then(res => setSaveCards(res));
    }
  }, [loggeIn, setSaveCards]);

  const handleSubmit = (searchQuery) => {
    console.log(2) // результат поиска
  };

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
        savedCardBtn={true}
        handleActionBtn={handleDeleteSaveMovie}
      />
      <Footer/>
    </div>
  );
};

export default SavedMovies;
