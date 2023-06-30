import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList({ isLoad, moviesList, setMoviesList, loadList, handleBtnMore, handleActionBtn }) {

  return(
    <section className="movies-card">
      { !isLoad
        ?
          <span className="movies-card__loader"/>
        :
          <ul className="movies-card__list">
            {moviesList.map(movie => (
              <MoviesCard
                key={movie.id || movie.movieId}
                movie={movie}
                handleActionBtn={handleActionBtn}
                savedMovieBtn={!!loadList}
              />
            ))}
          </ul>
      }

      {(!!loadList && moviesList.length < loadList.length) &&
        <button
          className="movies-card__more-btn"
          onClick={handleBtnMore}>
          Ещё
        </button>
      }
    </section>
  );
};

export default MoviesCardList;
