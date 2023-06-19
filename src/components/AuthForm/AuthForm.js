import { Link } from 'react-router-dom';
import Header from '../Header/Header.js';

function AuthForm({ setting }) {
  return (
    <section className="auth-form">
      <Header
        theme={{ default: true }}/>
      <h2
        className="auth-form__title">
        {setting.title}
      </h2>
      <form
        className="auth-form__form">
        { setting.type === 'register'
          &&
          <div
            className="auth-form__input-row">
            <label
              className="auth-form__input-label">
              Имя
            </label>
            <input
              type="text"
              className="auth-form__input"
              required />
          </div>
        }

        <div
          className="auth-form__input-row">
          <label
            className="auth-form__input-label">
            E-mail
          </label>
          <input
            type="email"
            className="auth-form__input"
            required />
        </div>

        <div
          className="auth-form__input-row">
          <label
            className="auth-form__input-label">
            Пароль
          </label>
          <input
            type="password"
            className="auth-form__input"
            required />
        </div>
      </form>

      <div className="auth-form__wrapper">
        <button
          type="submit"
          className="auth-form__submit-btn">
          {setting.btnSubmitText}
        </button>
        <div className="auth-form__transition">
          <p className="auth-form__transition-text">
            {setting.transitionText}
          </p>
          <Link
            to={setting.transitionPath}
            className="auth-form__transition-link">
            {setting.transitionLinkText}
          </Link>
        </div>
      </div>
    </section>
  )
}

export default AuthForm;
