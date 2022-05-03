export default class UserInfo {
  constructor({ name, description }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
  }

  getUserInfo() {
    const userInfoData = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return userInfoData;
  }

  setUserInfo({ data }) {
    this._name.textContent = data.popupInputName;
    this._description.textContent = data.popupInputDescription;
  }
}
