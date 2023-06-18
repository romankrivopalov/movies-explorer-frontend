import { durationTitles } from '../../utils/constants.js';

function MoviesCard({ duration, image, name }) {
  function getDuration(duration, durationTitles) {
    return `${duration} ${
      durationTitles[
        duration % 10 === 1 && duration % 100 !== 11
        ? 0
        : duration % 10 >= 2 && duration % 10 <= 4 && (duration % 100 < 10 || duration % 100 >= 20)
        ? 1
        : 2
      ]
    }`
  }

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">
          {name}
        </h2>
        <p className="card__duration">
          {getDuration(duration, durationTitles)}
        </p>
      </div>
      <img
        src={image}
        alt={name}
        className="card__img"
        />
      <button
        className='card__btn'>
        Сохранить
      </button>
    </li>
  )
}

export default MoviesCard;
