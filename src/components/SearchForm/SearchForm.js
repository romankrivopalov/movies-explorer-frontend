import { useEffect, useState } from 'react';

function SearchForm({ onSubmit, savedSearch, toggleShortMovie, onToggleShortMovie }) {
  const [ searchQuery, setSearchQuery ] = useState(savedSearch),
        [ toggleState, setToggleState ] = useState(savedSearch);

  useEffect(() => {
    setSearchQuery(savedSearch);;
  }, []);

  useEffect(() => {
    setToggleState(toggleShortMovie);
  }, [toggleShortMovie]);

  const handleChange = ({ target }) => {
    const { value } = target

    setSearchQuery(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(searchQuery);
  };

  const handleChecked = () => {
    onToggleShortMovie(!toggleState);
  };

  return(
    <form
      className="search-form"
      onSubmit={handleSubmit}>
      <label className="search-form__wrapper">
        <input
          type="text"
          placeholder="Фильм"
          className="search-form__input"
          onChange={handleChange}
          value={searchQuery}
          required />
        <button
          type="submit"
          className="search-form__submit-btn">
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
          className="search-form__checkbox"
          checked={toggleState}
          onChange={handleChecked}/>
        <label
          className="search-form__checkbox-label"
          htmlFor="short-film-toggle"/>
      </label>
    </form>
  );
};

export default SearchForm;
