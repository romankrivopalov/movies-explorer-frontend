import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList({ isLoad, moviesList, loadList, error, handleBtnMore, handleActionBtn }) {

  return(
    <section className="movies-card">
      { isLoad && !moviesList
        ?
          <span className="movies-card__loader"/>
        : error
        ?
          <p className="movies-card__error">{error}</p>
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

      {(!isLoad && !!loadList && moviesList.length < loadList.length) &&
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
