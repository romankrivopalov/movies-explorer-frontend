import { Link } from 'react-router-dom';

function Promo() {
  return (
    <section className="promo">
        <h1 className="promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <ul className="promo__list">
          <li>
            <Link
            to="/"
            className="promo__link">
              О проекте
            </Link>
          </li>
          <li>
            <Link
            to="/"
            className="promo__link">
              Технологии
            </Link>
          </li>
          <li>
            <Link
            to="/"
            className="promo__link">
              Студент
            </Link>
          </li>
        </ul>
      </section>
  )
}

export default Promo;
