export default class Popup {
    constructor(popupSelector) {
      this._popup = popupSelector;
      this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
      document.addEventListener("keydown", this._handleEscClose);
      this._popup.classList.add("popup_opened");
    }

    close () {
      document.removeEventListener("keydown", this._handleEscClose);
      this._popup.classList.remove("popup_opened");
    }

    _handleEscClose(event) {
      if (event.key === "Escape") {
        this.close();
      }
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
        this._popup.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains('popup_opened')) {
                this.close();
            }
            if (evt.target.classList.contains('popup__form-closer')) {
                this.close();
            }
        })
    }
}