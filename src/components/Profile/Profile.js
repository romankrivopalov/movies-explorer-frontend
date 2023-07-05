import { useContext, useEffect } from 'react';
import Header from '../Header/Header';
import mainApi from '../../utils/MainApi';
import useFormValidation from '../../hooks/useFormValidator.js';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import { inputErrorNameList } from '../../utils/constants.js';

function Profile({ setCurrentUser, navigate }) {
  const { name, email } = useContext(CurrentUserContext);
  const {
    values,
    setValues,
    errors,
    isValid,
    handleChange,
  } = useFormValidation();

  useEffect(() => {
    if (name && email) {
      setValues({
        name: name,
        email: email,
      });
    }
  }, [name, email, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();

    mainApi.setUserInfo({ name: values['name'], email: values['email'], })
      .then(data => setCurrentUser({ ...data, loggeIn: true }))
  }

  const handleLogout = () => {
    mainApi.getLogoutUser();

    localStorage.clear('userId');
    sessionStorage.clear('movies');
    sessionStorage.clear('searchQuery');
    sessionStorage.clear('toggleShortMovie');

    setCurrentUser({
      name: '',
      email: '',
      loggeIn: false,
    });
    navigate("/", {replace: true});
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
            <span
              className={`profile__input-label ${
                errors.name ? 'profile__input-label_error' : ''}`
              }>
              {errors.name ? inputErrorNameList.name : 'Имя'}
            </span>
            <input
              type="text"
              name="name"
              id="profile-input-name"
              value={values?.name || ''}
              onChange={handleChange}
              minLength={2}
              maxLength={30}
              className={`profile__input ${
                errors.name ? 'profile__input_error' : ''
              }`}
            />
          </label>
          <span className="profile__divider"/>
          <label className="profile__input-container">
            <span
              className={`profile__input-label ${
                errors.email ? 'profile__input-label_error' : ''
              }`}>
              {errors.email ? inputErrorNameList.email : 'E-mail'}
            </span>
            <input
              type="email"
              name="email"
              id="profile-input-email"
              value={values?.email || ''}
              onChange={handleChange}
              className={`profile__input ${
                errors.email ? 'profile__input_error' : ''
              }`}
            />
          </label>
        </form>

        <div className="profile__wrapper">
          <button
            type="submit"
            form="profile__form"
            className="profile__btn-submit"
            disabled={!isValid ? true : false}>
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
