import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import getWindowDimensions from "../../utils/getWindowDimensions.js";

function MoviesCardList({ moviesList, savedMovieBtn, handleActionBtn }) {
  const [ windowDimensions, setWindowDimensions ] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
