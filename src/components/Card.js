class Card {
  constructor(data, template, handleCardClick, popupConfirmClass, userId) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes.length;
    this._owner = data.owner._id;
    this._idCard = data._id;
    this._userId = userId;
    this._template = template; //выбор разметки template, ну так, на будущее...
    this._handleCardClick = handleCardClick;// получаем функцию которая заполняет popupImage и навешивает слушатель
    this._popupConfirmClass = popupConfirmClass;//берем сразу весь экземпляр класса PopupWithConfirm
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
    this._elementImage = this._element.querySelector(".element__image");
    this._elementCaption = this._element.querySelector(".element__caption");
    this._elementDelete = this._element.querySelector(".element__delete");
    this._elementLike = this._element.querySelector(".element__like");
    this._elementLikes = this._element.querySelector(".element__like-quantity");

    //Устанавлниваем слушатели на полученный элемент
    this._setEventListeners();

    //устанавливаем данные
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementCaption.textContent = this._name;
    if (this._likes > 0) {
      this._elementLikes.textContent = this._likes;
    };
    if (this._owner !== this._userId) {
      this._elementDelete.remove();
    }

    // Вернём элемент наружу
    return this._element;
  }

  _handleLikeClick() {
    this._elementLike.classList.toggle("element__like_active");
  }
  handleDeleteCard() {
    this._element.remove();
  }
  _handleDeleteCard() {
    this._popupConfirmClass.open(this._idCard);
  }

  _setEventListeners() {
    this._elementLike.addEventListener("click", () => {
        this._handleLikeClick();
      });
      this._elementDelete.addEventListener("click", () => {
        this._handleDeleteCard();
      });
      this._elementImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
      });
  }
}

export {Card};