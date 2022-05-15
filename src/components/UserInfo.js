export default class UserInfo {
  constructor({name, description, avatar, id}, api) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatar = document.querySelector(avatar);
    this._api = api;
    this.userId = id;
  }

  getUserInfo() {
    const userInfoData = {
      popupInputName: this._name.textContent,
      popupInputDescription: this._description.textContent,
    };
    return userInfoData;
  }

  setUserInfoToApi({ data }) {
    this._api
      .setUserInfoToApi({ name: data.popupInputName, about: data.popupInputDescription })
      .then((data) => {
        this.setUserInfoFromApi({ data })
      }).catch((err) => console.log(err));
    //this._name.textContent = data.popupInputName;
    //this._description.textContent = data.popupInputDescription;
  }

  setUserInfoFromApi({ data }) {
    this._name.textContent = data.name;
    this._description.textContent = data.about;
    this._avatar.style.backgroundImage = `url(${data.avatar})`;
    this.userId = data._id;
  }
}
