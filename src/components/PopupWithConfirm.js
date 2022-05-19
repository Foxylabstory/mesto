import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(handleSubmitForm, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
  }
  open(element) {
    super.open();
    this._element = element;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._element._idCard).then(() => {
        this._element.handleDeleteCard();
      }).catch((err) => {
        alert(`Ошибка ${err}`);
      });
      this.close();
    });
  }
} 