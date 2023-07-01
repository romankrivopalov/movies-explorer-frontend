import { Link } from 'react-router-dom';
import Header from '../Header/Header.js';
import useFormValidation from '../../hooks/useFormValidator.js';
import { inputErrorNameList } from '../../utils/constants.js';

function AuthForm({ setting, handleSubmit, requestError }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    currentInputName,
  } = useFormValidation();


  const handleSubmitForm = (e) => {
    e.preventDefault();

    handleSubmit(values);
  };

  return (
    <section className="auth-form">
      <Header
        theme={{ default: true }}/>
      <h2
        className="auth-form__title">
        {setting.title}
      </h2>
      <form
        id="auth-form"
        className="auth-form__form"
        onSubmit={handleSubmitForm}>
        { setting.type === "register"
          &&
          <div
            className="auth-form__input-row">
            <label
              className="auth-form__input-label">
              Имя
            </label>
            <input
              type="text"
              name="name"
              className={`auth-form__input ${errors.name ? "auth-form__input_error" : ""}`}
              minLength={2}
              maxLength={30}
              onChange={handleChange}
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
            name="email"
            className={`auth-form__input ${errors.email ? "auth-form__input_error" : ""}`}
            onChange={handleChange}
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
            name="password"
            className={`auth-form__input ${errors.password ? "auth-form__input_error" : ""}`}
            minLength={8}
            onChange={handleChange}
            required />
          <span className="auth-form__span-error">
            {errors[currentInputName]
              ? inputErrorNameList[currentInputName]
              : ""
              ? requestError
              : requestError
            }
          </span>
        </div>


      </form>

      <div className="auth-form__wrapper">
        <button
          type="submit"
          form="auth-form"
          className="auth-form__submit-btn"
          disabled={!isValid ? true : false}>
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
  );
};

export default AuthForm;
