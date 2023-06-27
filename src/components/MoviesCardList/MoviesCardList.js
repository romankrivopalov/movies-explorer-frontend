import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList({ moviesList, savedMovieBtn, handleActionBtn }) {

  return(
    <section className="movies-card">
      <ul className="movies-card__list">
        {moviesList.map(movie => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            handleActionBtn={handleActionBtn}
            savedMovieBtn={savedMovieBtn}
          />
        ))}
      </ul>
      {moviesList.length > 2 &&
        <button className="movies-card__more-btn">
          Ещё
        </button>}
    </section>
  );
};

export default MoviesCardList;
