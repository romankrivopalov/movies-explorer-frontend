import { useContext } from 'react';
import { CurrentUserContext } from '../../context/CurrentUserContext.js';
import { Link } from 'react-router-dom';
import Header from "../Header/Header";

function Profile() {
  const { name, email } = useContext(CurrentUserContext);
  return (
    <div className="layout layout_full-heigth">
      <Header/>

      <section className="profile">
        <h2 className="profile__title">
          {`Привет, ${name}!`}
        </h2>
        <form className='profile__form'>
          <label className='profile__input-container'>
            <span className='profile__input-label'>
              Имя
            </span>
            <input
              type='text'
              name='profile-input-name'
              id='profile-input-name'
              className='profile__input'
              placeholder='Имя'
              value={name} // для редактирования нужен будет onChange
              minLength={2}
              maxLength={30}
              required={true}/>
          </label>
          <span className='profile__divider'/>
          <label className='profile__input-container'>
            <span className='profile__input-label'>
              E-mail
            </span>
            <input
              type='email'
              name='profile-input-name'
              id='profile-input-name'
              className='profile__input'
              placeholder='Имя'
              value={email}
              required={true}/>
          </label>
        </form>
        <div className='profile__wrapper'>
          <button className='profile__btn-submit'>
            Редактировать
          </button>
          <button className='profile__btn-exit'>
            Выйти из аккаунта
          </button>
        </div>
      </section>

    </div>
  )
}

export default Profile;
