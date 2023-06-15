import { Link } from 'react-router-dom';

function Main() {
  return (
    <div className="main">
      <section className="main__promo">
        <h1 className="main__title">Учебный проект студента факультета Веб-разработки.</h1>
        <ul className="main__list">
          <li>
            <Link
            to="/"
            className="main__link">
              О проекте
            </Link>
          </li>
          <li>
            <Link
            to="/"
            className="main__link">
              Технологии
            </Link>
          </li>
          <li>
            <Link
            to="/"
            className="main__link">
              Студент
            </Link>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Main;
