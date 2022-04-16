class Card {
  constructor(data, template, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._template = template; //выбор разметки template, ну так, на будущее...
    this._handleCardClick = handleCardClick;// получаем функцию которая заполняет popupImage и навешивает слушатель
  }

  //получаем разметку из template
  _getTemplate() {
    const elementCard = document.querySelector(this._template).content.firstElementChild.cloneNode(true);
    return elementCard;
  }

  //устанавливаем в полученную разметку данные
  generateCard() {
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

  _setEventListeners() {
    this._element.querySelector(".element__like").addEventListener("click", () => {
        this._handleLikeClick();
      });
    this._element.querySelector(".element__delete").addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element.querySelector(".element__image").addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
      });
  }
}

export {Card};