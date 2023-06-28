import { useState, useEffect } from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import getWindowDimensions from "../../utils/getWindowDimensions.js";
import getTypeCardList from "../../utils/getTypeCardList.js";

function MoviesCardList({ moviesList, savedMovieBtn, handleActionBtn }) {
  const [ windowDimensions, setWindowDimensions ] = useState(getWindowDimensions()),
        [ loadList, setLoadList ] = useState([]),
        [ filterList, setFilterList ] = useState([]),
        typeConteiner = getTypeCardList(windowDimensions);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!savedMovieBtn) {
      setLoadList(moviesList.slice(0, typeConteiner.loadCards));
      setFilterList(loadList);
    } else {
      setFilterList(moviesList);
    }
  }, [moviesList, setFilterList, savedMovieBtn, windowDimensions])

  const handleButtonClick = () => {
    const loadedMovies = moviesList.slice(loadList.length, loadList.length + typeConteiner.moreCards);

    setLoadList([...filterList, ...loadedMovies]);
    setFilterList([...filterList, ...loadedMovies]);
  }

  return(
    <section className="movies-card">
      <ul className="movies-card__list">
        {filterList.map(movie => (
          <MoviesCard
            key={movie.id || movie.movieId}
            movie={movie}
            handleActionBtn={handleActionBtn}
            savedMovieBtn={savedMovieBtn}
          />
        ))}
      </ul>
      {!savedMovieBtn && moviesList.length > loadList.length &&
        <button
          className="movies-card__more-btn"
          onClick={handleButtonClick}>
          Ещё
        </button>
      }
    </section>
  );
};

export default MoviesCardList;
