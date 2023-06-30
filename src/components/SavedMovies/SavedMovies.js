import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm.js';
import findMovies from '../../utils/findMovies';
import selectShortMovies from '../../utils/selectShortMovies';

function SavedMovies({
  isLoad,
  setIsLoad,
  saveMovies,
  setSaveMovies,
  handleDeleteSaveMovie,
  toggleShortMovie,
  onToggleShortMovie
}) {
  const [ filterList, setFilterList ] = useState([]),
        [ searchQuery, setSearchQuery ] = useState(null);

  useEffect(() => {
    setIsLoad(false);

    setFilterList(toggleShortMovie
      ? selectShortMovies(saveMovies)
      : saveMovies);

    setIsLoad(true);
  }, [saveMovies, toggleShortMovie]);

  useEffect(() => {
    setIsLoad(false);

    const findSearchMovies = findMovies(saveMovies, searchQuery);

    if (searchQuery) {
      setFilterList(toggleShortMovie
        ? selectShortMovies(findSearchMovies)
        : findSearchMovies);
    }

    setIsLoad(true);
  }, [searchQuery]);

  return (
    <div className="layout">
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
        setMoviesList={setSaveMovies}
        savedMovieBtn={true}
        handleActionBtn={handleDeleteSaveMovie}
      />
      <Footer/>
    </div>
  );
};

export default SavedMovies;
