import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm.js';
import findMovies from '../../utils/findMovies.js';
import getFilterMovie from '../../utils/getFilterMovie.js';
import selectShortMovies from '../../utils/selectShortMovies';

function SavedMovies({
  isLoad,
  setIsLoad,
  saveMovies,
  handleDeleteSaveMovie,
  toggleShortSavedMovie,
  onToggleShortSavedMovie,
  error,
  setError,
}) {
  const [ filterList, setFilterList ] = useState([]),
        [ searchQuery, setSearchQuery ] = useState(null);

  useEffect(() => {
    setIsLoad(true);

    setFilterList(getFilterMovie(saveMovies, false, toggleShortSavedMovie, setError));

    setIsLoad(false);
  }, [saveMovies]);

  useEffect(() => {
    setIsLoad(true);

    if (searchQuery) {
      const findSearchMovies = findMovies(saveMovies, searchQuery);

      setFilterList(toggleShortSavedMovie
        ? selectShortMovies(findSearchMovies)
        : findSearchMovies);
    } else {
      setFilterList(getFilterMovie(saveMovies, false, toggleShortSavedMovie, setError));
    }

    setIsLoad(false);
  }, [searchQuery, toggleShortSavedMovie]);

  return (
    <div className="layout layout_full-heigth-4row">
      <Header
        theme={{ default: false }}/>
      <SearchForm
        isLoad={isLoad}
        onSubmit={setSearchQuery}
        toggleShortMovie={toggleShortSavedMovie}
        onToggleShortMovie={onToggleShortSavedMovie}
      />
      <MoviesCardList
        isLoad={isLoad}
        moviesList={filterList}
        error={error}
        savedMovieBtn={true}
        handleActionBtn={handleDeleteSaveMovie}
      />
      <Footer/>
    </div>
  );
};

export default SavedMovies;
