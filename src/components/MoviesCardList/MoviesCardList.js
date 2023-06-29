import { useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";

// на рендер пробросить moviesList
function MoviesCardList({ moviesList, setMoviesList, loadList, handleBtnMore, handleActionBtn }) {

  useEffect(() => {
    setMoviesList(moviesList);

  }, [setMoviesList])

  return(
    <section className="movies-card">
      {
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
