import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(handleSubmitForm, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._submitButton = this._popupForm.querySelector('.popup__button');
    this._temporaryButtonContent = '';
    this._handleSubmitForm = handleSubmitForm;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  loadingMessage(isLoading) {
    if(isLoading) {
      this._temporaryButtonContent = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._temporaryButtonContent;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      this.loadingMessage(true);
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
