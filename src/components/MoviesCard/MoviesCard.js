import { saveCardList } from '../../utils/constants';
import { durationTitles } from '../../utils/constants.js';
import { moviesApiSetting } from '../../utils/constants';
import getEndLine from '../../utils/getEndLine.js';

function MoviesCard({ movie, handleActionBtn, typeCardBtn }) {
  const {
    duration,
    image,
    trailer,
    nameRU,
    movieId
  } = movie
  const isSavedMovieCard = saveCardList.some(i => i.movieId === movieId);

  const getDuration = (duration, durationTitles) => {
    return getEndLine(duration, durationTitles);
  }

  const handleAction = () => {
    handleActionBtn(movie)
  }

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">
          {nameRU}
        </h2>
        <p className="card__duration">
          {getDuration(duration, durationTitles)}
        </p>
      </div>
      <img
        src={`${moviesApiSetting.baseUrl}${image.url}`}
        alt={nameRU}
        className="card__img"
        />
      <button
        onClick={handleAction}
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
