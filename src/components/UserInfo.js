export default class UserInfo {
  constructor({ name, description, avatar }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    const userInfoData = {
      popupInputName: this._name.textContent,
      popupInputDescription: this._description.textContent,
    };
    return userInfoData;
  }

  setUserInfo({ data }) {
    this._name.textContent = data.popupInputName;
    this._description.textContent = data.popupInputDescription;
  }

  setUserInfoFromApi({ data }) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
  }
}
