import { moviesApiSetting } from './constants.js'

class MoviesApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _checkStatusRequest(res) {
    if(res.ok) {
      return res.json()
    }

    return Promise.reject(res.status)
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers
    })
    .then(res => this._checkStatusRequest(res));
  };
}

const moviesApi = new MoviesApi(moviesApiSetting);

export default moviesApi;
