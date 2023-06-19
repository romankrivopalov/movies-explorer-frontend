import { durationTitles } from '../../utils/constants.js';
import getEndLine from '../../utils/getEndLine.js';

function MoviesCard({ duration, image, name, typeCardBtn }) {
  function getDuration(duration, durationTitles) {
    return getEndLine(duration, durationTitles);
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
        className={`card__btn ${typeCardBtn.save ? '' : 'card__btn_type_delete'}`}>
        {typeCardBtn.save ? 'Сохранить' : ''}
      </button>
    </li>
  )
}

export default MoviesCard;