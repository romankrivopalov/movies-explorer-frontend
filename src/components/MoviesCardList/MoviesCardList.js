import MoviesCard from "../MoviesCard/MoviesCard.js"

function MoviesCardList({ cardList, typeCardBtn }) {

  return(
    <section className="movies-card">
      <ul className="movies-card__list">
        {cardList.map(card => (
          <MoviesCard
            key={card.movieId}
            duration={card.duration}
            image={card.image}
            name={card.nameRU}
            typeCardBtn={typeCardBtn}
          />
        ))}
      </ul>
    </section>
  )
}

export default MoviesCardList
