export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _isOk(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Произошла ошибка`);
  };//.catch((err) => console.log(`Something going wrong ${err}`)););

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me/`, {
      method: 'GET',
      headers: this._headers
    }).then(this._isOk);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers
    }).then(this._isOk);
  }

  // другие методы работы с API
}