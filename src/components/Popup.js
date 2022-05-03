export default class Popup {
    constructor(popupSelector) {
      this._popupSelector = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
      document.addEventListener("keydown", this._handleEscClose);
      this._popupSelector.classList.add("popup_opened");
    }

    close () {
      document.removeEventListener("keydown", this._handleEscClose);
      this._popupSelector.classList.remove("popup_opened");
    }

    _handleEscClose(event) {
      if (event.key === "Escape") {
        //const popup = document.querySelector(".popup_opened");
        //document.removeEventListener("keydown", this._handleEscClose);
        //popup.classList.remove("popup_opened");
        this.close();
      }
    }

    setEventListeners() {
        this._popupSelector.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__form-closer')) {
                this.close();
            }
        })
    }
}