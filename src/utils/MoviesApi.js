import { moviesApiSetting } from './constants.js'

class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkStatusRequest(res) {
    if(res.ok) {
      return res.json();
    }

    return Promise.reject(res.status)
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      headers: this._headers
    })
    .then(res => this._checkStatusRequest(res));
  };
}

const moviesApi = new MoviesApi(moviesApiSetting);

export default moviesApi;
