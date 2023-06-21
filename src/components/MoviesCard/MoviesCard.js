import { saveCardList } from '../../utils/constants';
import { durationTitles } from '../../utils/constants.js';
import { moviesApiSetting } from '../../utils/constants';
import getEndLine from '../../utils/getEndLine.js';

function MoviesCard({ movieId, duration, image, name, typeCardBtn }) {
  const isSavedMovieCard = saveCardList.some(i => i.movieId === movieId);

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
        src={`${moviesApiSetting.baseUrl}${image.url}`}
        alt={name}
        className="card__img"
        />
      <button
        className={`card__btn ${
          !typeCardBtn.save
            ? 'card__btn_type_delete'
            : isSavedMovieCard
            ? 'card__btn_saved'
            : ''
        }`}>
        {!typeCardBtn.save || isSavedMovieCard
          ? ''
          : 'Сохранить'}
      </button>
    </li>
  )
}

export default MoviesCard;
