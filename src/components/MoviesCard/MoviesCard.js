import { durationTitles } from '../../utils/constants.js';
import { moviesApiSetting } from '../../utils/constants';
import getEndLine from '../../utils/getEndLine.js';

function MoviesCard({ movie, handleActionBtn, savedMovieBtn }) {
  const {
          duration,
          image,
          trailer,
          nameRU,
          isLiked
        } = movie,
        btnClassName = `card__btn ${
          savedMovieBtn
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
          {getDuration(duration, durationTitles)}
        </p>
      </div>
      <img
        src={image.url
          ? `${moviesApiSetting.baseUrl}${image.url}`
          : image
        }
        alt={nameRU}
        className="card__img"
        />
      <button
        onClick={handleAction}
        className={btnClassName}>
        {savedMovieBtn ? "" : isLiked ? "" : "Сохранить"}
      </button>
    </li>
  )
}

export default MoviesCard;
