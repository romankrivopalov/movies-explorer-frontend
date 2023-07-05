import { useEffect } from 'react';
import useFormValidation from '../../hooks/useFormValidator.js';

function SearchForm({ onSubmit, savedSearch, toggleShortMovie, onToggleShortMovie }) {
  const {
          values,
          setValues,
          handleChange,
        } = useFormValidation();

  useEffect(() => {
    const name = 'search-movies'

    setValues({ [name]: savedSearch });
  }, [setValues, savedSearch]);

  useEffect(() => {
    onToggleShortMovie(toggleShortMovie);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(values['search-movies']);
  };

  const handleChecked = () => {
    onToggleShortMovie(!toggleShortMovie);
  };

  return(
    <form
      className="search-form"
      onSubmit={handleSubmit}>
      <label className="search-form__wrapper">
        <input
          type="text"
          name="search-movies"
          placeholder="Фильм"
          className="search-form__input"
          onChange={handleChange}
          value={values["search-movies"] || ""}
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
          checked={!!toggleShortMovie}
          onChange={handleChecked}/>
        <label
          className="search-form__checkbox-label"
          htmlFor="short-film-toggle"/>
      </label>
    </form>
  );
};

export default SearchForm;
