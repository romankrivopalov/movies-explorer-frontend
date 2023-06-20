import { mainApiSetting } from './constants.js'

class MainApi {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  };

  _checkStatusRequest(res) {
    if(res.ok) {
      return res.json()
    }

    return Promise.reject(res.status)
  };

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._checkStatusRequest(res));
  };

  setUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      })
    })
    .then(res => this._checkStatusRequest(res));
  };

  getAllSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers
    })
    .then(res => this._checkStatusRequest(res));
  };

  postNewSavedMovie(movieData) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movieData)
    })
    .then(res => this._checkStatusRequest(res));
  };

  deleteSavedMovie(movieId) {
    return fetch(`${this._baseUrl}/cards/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(err => this._checkStatusRequest(err));
  };
}

const mainApi = new MainApi(mainApiSetting);

export default mainApi;
