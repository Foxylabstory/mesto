import Popup from "./Popup";

export default class PopupWithImage extends Popup {
    constructor(popupSelector){
      super(popupSelector);
      this._popupImageFigure = this._popup.querySelector('.popup__figure-img');
      this._popupImageFigureCaption = this._popup.querySelector('.popup__figure-caption');
    }

    open(name, link) {
      this._popupImageFigure.src = link;
      this._popupImageFigure.alt = name;
      this._popupImageFigureCaption.textContent = name;
      super.open();
    }
}