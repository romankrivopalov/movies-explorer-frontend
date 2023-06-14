import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation.js';

function Header({ loggeIn }) {
  return (
    <header className="header container">
      <Link to="/" className="header__logo"/>
      { loggeIn
        ? <div className="header__wrapper">
            <button className="header__burger"/>
            <Navigation/>
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
