import { useState } from 'react';
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
        } = movie,
        [ stateBtnSaved, setStateBtnSaved ] = useState(false);

  const getDuration = (duration, durationTitles) => {
    return getEndLine(duration, durationTitles);
  }

  const handleAction = () => {
    handleActionBtn(movie); // если сохранен удалить и наоборот, проверка

    if (typeCardBtn.save) setStateBtnSaved(!stateBtnSaved);
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
      { typeCardBtn.save
        ?
          <button
            onClick={handleAction}
            className={`card__btn ${stateBtnSaved ? "card__btn_type_saved" : "card__btn_type_save"}`}>
            {!stateBtnSaved ? "Сохранить" : ""}
          </button>
        :
        <button
          onClick={handleAction}
          className={"card__btn card__btn_type_delete"}/>
      }

    </li>
  )
}

export default MoviesCard;
