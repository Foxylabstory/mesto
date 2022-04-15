import {initialCards} from './initialCards.js';
import {openPopup} from './index.js'

class Card {
  constructor(data, template) {
    this._link = data.link;
    this._name = data.name;
    this._template = template; //выбор разметки template, ну так, на будущее...
  }

  //получаем разметку из template
  _getTemplate() {
    const elementCard = document.querySelector(this._template).content.firstElementChild.cloneNode(true);
    return elementCard;
  }

  //устанавливаем в полученную разметку данные
  _generateCard() {
    //записываем разметку в приватное поле
    this._element = this._getTemplate();
    //Устанавлниваем слушатели на полученный элемент
    this._setEventListeners();

    //устанавливаем данные
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;
    this._element.querySelector(".element__caption").textContent = this._name;

    // Вернём элемент наружу
    return this._element;
  }

  _handleLikeClick() {
    this._element.querySelector(".element__like").classList.toggle("element__like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleOpenImage() {
    const _figure = document.querySelector(".popup__figure-img");
    const _figureCaption = document.querySelector(".popup__figure-caption");
    _figure.src = this._element.querySelector(".element__image").src;
    _figure.alt = this._element.querySelector(".element__caption").textContent;
    _figureCaption.textContent = this._element.querySelector(".element__caption").textContent;
    openPopup(document.querySelector("#popup-image"));
  }

  _setEventListeners() {
    this._element.querySelector(".element__like").addEventListener("click", () => {
        this._handleLikeClick();
      });
    this._element.querySelector(".element__delete").addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element.querySelector(".element__image").addEventListener("click", () => {
        this._handleOpenImage();
      });
  }
}

function createAndAddCard(item, template) {
  // Создадим экземпляр карточки
  const card = new Card(item, template);
  // Заполняем карточку и возвращаем наружу
  const cardElement = card._generateCard();
  // Добавляем в DOM
  document.querySelector(".elements").prepend(cardElement);
}

initialCards.forEach((item) => {
  createAndAddCard(item, "#element-template");
});

export {createAndAddCard};