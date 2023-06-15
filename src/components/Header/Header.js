import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';

function Header({ loggeIn, isOpenBurger, isToggleBurger }) {
  return (
    <header className="header container">
      <Link to="/" className="header__logo"/>
      { loggeIn
        ? <div>
            <div className={`header__overlay ${isOpenBurger ? 'header__overlay_active' : ''}`}/>
            <button
              className="header__burger"
              onClick={isToggleBurger}>
              <div
                className={`header__burger-inner ${isOpenBurger ? 'header__burger-inner_active' : ''}`}/>
            </button>
            <Navigation
              isOpenBurger={isOpenBurger}/>
          </div>
        : <div className="header__entrance">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__button">
              Войти
            </Link>
          </div>
      }
    </header>
  )
}

export default Header;
