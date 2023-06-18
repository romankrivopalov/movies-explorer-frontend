function MoviesCardList({ cardList }) {

  return(
    <section className="movies-card">
      <ul>
        {cardList.map(item => console.log(item))}
      </ul>
    </section>
  )
}

export default MoviesCardList
