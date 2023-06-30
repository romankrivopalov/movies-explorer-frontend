import Footer from '../Footer/Footer';
import Header from '../Header/Header.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm.js';

function SavedMovies({
  isLoad,
  setIsLoad,
  saveMovies,
  setSaveMovies,
  handleDeleteSaveMovie,
  toggleShortMovie,
  onToggleShortMovie
}) {

  const handleSubmit = (searchQuery) => {
    console.log(2)
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
        isLoad={isLoad}
        moviesList={saveMovies}
        setMoviesList={setSaveMovies}
        savedMovieBtn={true}
        handleActionBtn={handleDeleteSaveMovie}
      />
      <Footer/>
    </div>
  );
};

export default SavedMovies;
