function SearchForm() {
  return(
    <form className="search-form">
      <label className="search-form__wrapper">
        <input
          type="text"
          placeholder="Фильм"
          className="search-form__input"/>
        <button className="search-form__submit-btn">
          Найти
        </button>
      </label>
      <label className="search-form__wrapper search-form__wrapper_short-film">
        <p className="search-form__short-film-text">
          Короткометражки
        </p>
        <input
          type="checkbox"
          name="short-film-toggle"
          id="short-film-toggle"
          className="search-form__checkbox"/>
        <label
          className="search-form__checkbox-label"
          htmlFor="short-film-toggle"/>
      </label>
    </form>
  )
}

export default SearchForm;
