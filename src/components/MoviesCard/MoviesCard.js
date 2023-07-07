import { DURATION_TITLES } from '../../utils/constants.js';
import { MOVIES_API_SETTING } from '../../utils/constants';
import getEndLine from '../../utils/getEndLine.js';

function MoviesCard({ movie, handleActionBtn, savedMovieBtn }) {
  const {
          duration,
          image,
          trailerLink,
          nameRU,
          isLiked
        } = movie,
        btnClassName = `card__btn ${
          !savedMovieBtn
            ? 'card__btn_type_delete'
            : isLiked
              ? 'card__btn_type_saved'
              : 'card__btn_type_save'
        }`

  const getDuration = (duration, durationTitles) => {
    return getEndLine(duration, durationTitles);
  }

  const handleAction = () => {
    handleActionBtn(movie);
  }

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__title">
          {nameRU}
        </h2>
        <p className="card__duration">
          {getDuration(duration, DURATION_TITLES)}
        </p>
      </div>
      <a
        className='card__link'
        href={trailerLink}
        target="_blank"
        rel="noreferrer">
        <img
          src={image.url
            ? `${MOVIES_API_SETTING.baseUrl}${image.url}`
            : image
          }
          alt={nameRU}
          className="card__img"
          />
      </a>
      <button
        onClick={handleAction}
        className={btnClassName}>
        {!savedMovieBtn ? "" : isLiked ? "" : "Сохранить"}
      </button>
    </li>
  )
}

export default MoviesCard;
