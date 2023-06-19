import SectionTitle from '../SectionTitle/SectionTitle.js';

function Techno() {
  return (
    <section
      id="techno"
      className="techno">
      <div className="techno__container">
        <SectionTitle title="Технологии"/>
        <h3 className="techno__title">
          7 технологий
        </h3>
        <p className="techno__text">
          На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
        </p>
        <ul className="techno__list">
          <li className="techno__item">
            HTML
          </li>
          <li className="techno__item">
            CSS
          </li>
          <li className="techno__item">
            JS
          </li>
          <li className="techno__item">
            React
          </li>
          <li className="techno__item">
            Git
          </li>
          <li className="techno__item">
            Express.js
          </li>
          <li className="techno__item">
            mongoDB
          </li>
        </ul>
      </div>
    </section>
  )
}

export default Techno;
