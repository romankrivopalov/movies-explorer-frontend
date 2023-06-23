import { mainApiSetting } from './constants.js'

class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  };

  _checkStatusRequest(res) {
    if(res.ok) {
      return res.json()
    }

    return Promise.reject(res.status)
  };

  getRegistrationUser({ name, email, password }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      })
    })
    .then(res => this._checkStatusRequest(res))
  }

  getAuthorizationUser({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
    .then(res => this._checkStatusRequest(res))
  }

  // getLogoutUser() {
  //   return fetch(`${this._baseUrl}/signout`, {
  //     method: 'GET',
  //     credentials: 'include',
  //   })
  //   .then(res => this._checkStatusRequest(res))
  // }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
    .then(res => this._checkStatusRequest(res));
  };

  setUserInfo({ name, email }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
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
