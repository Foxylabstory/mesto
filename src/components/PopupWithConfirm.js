import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(handleSubmitForm, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      //this._handleSubmitForm();
      this.close();
    });
  }
} 