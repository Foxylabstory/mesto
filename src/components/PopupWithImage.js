import Popup from "./Popup";
import { popupImageFigure, popupImageFigureCaption} from '../utils/constants.js';

export default class PopupWithImage extends Popup {
    constructor(name, link, somePopup){
      super(somePopup);
      this._name = name;
      this._link = link;
    }

    open() {
      popupImageFigure.src = this._link;
      popupImageFigure.alt = this._name;
      popupImageFigureCaption.textContent = this._name;
      super.open();
    }
}