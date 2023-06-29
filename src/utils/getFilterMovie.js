import selectShortMovies from './selectShortMovies.js';

const getFilterMovie = (movieArr, typeContainer, toggle) => {
  let movieNewArr,
      shorMovietNewArr = selectShortMovies(movieArr);

  if (!toggle && movieArr.length > typeContainer.loadCards) {
    movieNewArr = movieArr.slice(0, typeContainer.loadCards);
  } else if (!toggle && movieArr.length < typeContainer.loadCards) {
    movieNewArr = movieArr;
  } else if (toggle && shorMovietNewArr.length > typeContainer.loadCards) {
    movieNewArr = selectShortMovies(movieArr.slice(0, typeContainer.loadCards));
  } else if (toggle && shorMovietNewArr.length < typeContainer.loadCards) {
    movieNewArr = selectShortMovies(movieArr);
  }

  return movieNewArr;
}

export default getFilterMovie;
