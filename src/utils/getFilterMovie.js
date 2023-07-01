import selectShortMovies from './selectShortMovies.js';
import { errorMessage } from '../utils/constants.js';

const getFilterMovie = (movieArr, typeContainer, toggle, setError) => {
  let movieNewArr,
      shorMovietNewArr = selectShortMovies(movieArr);

  if (!movieArr.length) {
    setError(errorMessage.notFound);

    return movieNewArr = [];
  };

  if (!typeContainer) {
    if (toggle) {
      movieNewArr = shorMovietNewArr;
      setError(null);
    } else if (!toggle) {
      movieNewArr = movieArr;
      setError(null);
    } else {
      setError(errorMessage.notFound);

      return movieNewArr;
    }
  };

  if (!toggle && movieArr.length > typeContainer.loadCards) {
    movieNewArr = movieArr.slice(0, typeContainer.loadCards);
    setError(null);
  } else if (!toggle && movieArr.length < typeContainer.loadCards) {
    movieNewArr = movieArr;
    setError(null);
  } else if (toggle) {
    if (!shorMovietNewArr.length) {
      setError(errorMessage.notFound);

      return movieNewArr = [];
    } else if (toggle && shorMovietNewArr.length > typeContainer.loadCards) {
      movieNewArr = shorMovietNewArr.slice(0, typeContainer.loadCards);
      setError(null);
    } else if (toggle && shorMovietNewArr.length < typeContainer.loadCards) {
      movieNewArr = shorMovietNewArr;
      setError(null);
    }
  };

  return movieNewArr;
}

export default getFilterMovie;
