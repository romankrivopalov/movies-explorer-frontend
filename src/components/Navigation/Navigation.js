import { Link } from 'react-router-dom';

function Navigation() {
  return(
    <div className='navigation'>
      <Link to='/' className='navigation__link navigation__link_home'>
        Главная
      </Link>
      <ul className='navigation__list'>
        <li className='navigation__item'>
          <Link to='' className='navigation__link'>
            Фильмы
          </Link>
        </li>
        <li className='navigation__item'>
          <Link to='' className='navigation__link'>
            Сохраненные фильмы
          </Link>
        </li>
      </ul>
      <Link to="/profile" className="navigation__profile">
        Аккаунт
      </Link>
    </div>
  )
}

export default Navigation;
