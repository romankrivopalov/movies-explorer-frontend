import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm.js';
import findMovies from '../../utils/findMovies.js';
import getFilterMovie from '../../utils/getFilterMovie.js';

function SavedMovies({
  isLoad,
  setIsLoad,
  saveMovies,
  setSaveMovies,
  handleDeleteSaveMovie,
  toggleShortMovie,
  onToggleShortMovie,
  error,
  setError,
}) {
  const [ filterList, setFilterList ] = useState([]),
        [ searchQuery, setSearchQuery ] = useState(null);

  useEffect(() => {
    setIsLoad(false);

    setFilterList(getFilterMovie(saveMovies, false, toggleShortMovie, setError));

    setIsLoad(true);
  }, [saveMovies, toggleShortMovie]);

  useEffect(() => {
    setIsLoad(false);

    if (searchQuery) {
      const findSearchMovies = findMovies(saveMovies, searchQuery);

      setFilterList(getFilterMovie(findSearchMovies, false, toggleShortMovie, setError));
    } else {
      setFilterList(getFilterMovie(saveMovies, false, toggleShortMovie, setError));
    }

    setIsLoad(true);
  }, [searchQuery]);

  return (
    <div className="layout layout_full-heigth-4row">
      <Header
        theme={{ default: false }}/>
      <SearchForm
        onSubmit={setSearchQuery}
        toggleShortMovie={toggleShortMovie}
        onToggleShortMovie={onToggleShortMovie}
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
