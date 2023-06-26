import MoviesCard from "../MoviesCard/MoviesCard.js";

function MoviesCardList({ cardList, typeCardBtn, handleActionBtn, handleDeleteSaveMovie }) {

  return(
    <section className="movies-card">
      <ul className="movies-card__list">
        {cardList.map(card => (
          <MoviesCard
            key={card.id || card.movieId}
            movie={card}
            handleActionBtn={handleActionBtn}
            typeCardBtn={typeCardBtn}
          />
        ))}
      </ul>
      {cardList.length > 2 &&
        <button className="movies-card__more-btn">
          Ещё
        </button>}
    </section>
  );
};

export default MoviesCardList;
