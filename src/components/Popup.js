export default class Popup {
    constructor(somePopup) {
      this._somePopup = somePopup;
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
      document.addEventListener("keydown", this._handleEscClose);
      this._somePopup.classList.add("popup_opened");
    }

    close () {
      document.removeEventListener("keydown", this._handleEscClose);
      this._somePopup.classList.remove("popup_opened");
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
        this._somePopup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__form-closer')) {
                this.close();
            }
        })
    }
}