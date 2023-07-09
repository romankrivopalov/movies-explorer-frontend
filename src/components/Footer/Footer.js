function Footer() {
  const getYear = () => {
    return new Date().getFullYear();
  }

  return (
    <footer className="footer">
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.
      </h2>
      <div className="footer__wrapper">
        <ul className="footer__list">
          <li>
            <a
              href="https://practicum.yandex.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link">
              Яндекс.Практикум
            </a>
          </li>
          <li>
            <a
              href="https://github.com/romankrivopalov"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__link">
              Github
            </a>
          </li>
        </ul>
        <p className="footer__age">&copy;{getYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
