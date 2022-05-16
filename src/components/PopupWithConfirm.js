import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(handleSubmitForm, popupSelector) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector(".popup__form");
    this._handleSubmitForm = handleSubmitForm;
  }
  open(idCard) {
    super.open();
    this._idCard = idCard;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(this._idCard);//нужен ли мне теперь здесь ID?
      this._handleSubmitForm(this._idCard);
      this.close();
    });
  }
} 