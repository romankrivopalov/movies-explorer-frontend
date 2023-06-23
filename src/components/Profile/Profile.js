import Header from '../Header/Header';
import mainApi from '../../utils/MainApi';

function Profile({ currentUser, setCurrentUser, navigate }) {
  const { name, email } = currentUser;

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(1);
  }

  const handleChange = () => {
    console.log(2);
  }

  const handleLogout = () => {
    mainApi.getLogoutUser();
    localStorage.clear('userId');
    setCurrentUser({
      name: '',
      email: '',
      loggeIn: false,
    });
    navigate("/signin", {replace: true});
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
