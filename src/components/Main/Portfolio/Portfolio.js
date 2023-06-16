function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">
        Портфолио
      </h2>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href='https://github.com/romankrivopalov'
            target='_blank'
            rel="noopener noreferrer"
            className="portfolio__link">
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href='https://github.com/romankrivopalov'
            target='_blank'
            rel="noopener noreferrer"
            className="portfolio__link">
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href='https://github.com/romankrivopalov'
            target='_blank'
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
