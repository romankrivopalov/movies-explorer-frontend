import Footer from '../Footer/Footer';
import Header from '../Header/Header.js';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm.js';

function SavedMovies({
  saveMovies,
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
        moviesList={saveMovies}
        savedMovieBtn={true}
        handleActionBtn={handleDeleteSaveMovie}
      />
      <Footer/>
    </div>
  );
};

export default SavedMovies;
