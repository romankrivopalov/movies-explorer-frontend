function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">
        Портфолио
      </h2>
      <ul className="portfolio__list">
        <li>
          <a
            href="https://github.com/romankrivopalov/how-to-learn"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link">
            Статичный сайт
          </a>
        </li>
        <li>
          <a
            href="https://github.com/romankrivopalov/russian-travel"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link">
            Адаптивный сайт
          </a>
        </li>
        <li>
          <a
            href="https://github.com/romankrivopalov/react-mesto-api-full-gha"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio__link">
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
