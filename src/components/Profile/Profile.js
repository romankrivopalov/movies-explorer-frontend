import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

function Profile() {
  const { name, email } = useContext(CurrentUserContext);

  function handleSubmit(e) {
    e.preventDefault();

    console.log(1);
  }

  function handleChange() {
    console.log(2);
  }

  function handleLogout() {
    console.log(3);
  }

  return (
    <div className="layout layout_full-heigth">
      <Header
        theme={{ default: false }}/>

      <section className="profile">
        <h2 className="profile__title">
          {`Привет, ${name}!`}
        </h2>
        <form
          id="profile__form"
          className="profile__form"
          onSubmit={handleSubmit}>
          <label className="profile__input-container">
            <span className="profile__input-label">
              Имя
            </span>
            <input
              type="text"
              name="profile-input-name"
              id="profile-input-name"
              className="profile__input"
              placeholder="Имя"
              value={name}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              required={true}/>
          </label>
          <span className="profile__divider"/>
          <label className="profile__input-container">
            <span className="profile__input-label">
              E-mail
            </span>
            <input
              type="email"
              name="profile-input-name"
              id="profile-input-name"
              className="profile__input"
              placeholder="Имя"
              value={email}
              onChange={handleChange}
              required={true}/>
          </label>
        </form>
        <div className="profile__wrapper">
          <button
            type="submit"
            form="profile__form"
            className="profile__btn-submit">
            Редактировать
          </button>
          <button
            className="profile__btn-exit"
            onClick={handleLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </section>

    </div>
  )
}

export default Profile;
