import MoviesCard from "../MoviesCard/MoviesCard.js"

function MoviesCardList({ cardList }) {

  return(
    <section className="movies-card">
      <ul className="movies-card__list">
        {cardList.map(card => (
          <MoviesCard
            key={card.movieId}
            duration={card.duration}
            image={card.image}
            name={card.nameRU}
          />
        ))}
      </ul>
    </section>
  )
}

export default MoviesCardList
