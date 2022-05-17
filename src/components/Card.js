class Card {
  constructor(data, template, handleCardClick, popupConfirmClass, userId, api) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._owner = data.owner._id;
    this._idCard = data._id;
    this._userId = userId;
    this._template = template; //выбор разметки template, ну так, на будущее...
    this._handleCardClick = handleCardClick;// получаем функцию которая заполняет popupImage и навешивает слушатель
    this._popupConfirmClass = popupConfirmClass;//берем сразу весь экземпляр класса PopupWithConfirm
    this._api = api;
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
    /*if (this._likesLength > 0) {
      this._elementLikes.textContent = this._likesLength;
    };*/
    this._setLikeNumbers (this._likesLength);
    if (this._owner !== this._userId) {
      this._elementDelete.remove();
    }
    this._setLikeClasslist(this._likes);
    // Вернём элемент наружу
    return this._element;
  }

  _setLikeNumbers (likesLength) {
    if (likesLength === 0) {
      this._elementLikes.textContent = '';
    } else {
      this._elementLikes.textContent = likesLength;
    }; 
  }

  _isLiked(likes) {
    likes.some(user => user._id === this._userId)
  }

  _setLikeClasslist(likes) {
    if (likes.some(user => user._id === this._userId)) {
      this._elementLike.classList.add("element__like_active");
    } else {
      this._elementLike.classList.remove("element__like_active");
    }
  }

  _handleLikeClick() {
    if (this._likes.some(user => user._id === this._userId)) {
      this._api.deleteLike(this._idCard).then((data) => {
        //this._elementLikes.textContent = data.likes.length;
        this._setLikeNumbers (data.likes.length);
        this._likes = data.likes;
        this._setLikeClasslist(data.likes);
      }).catch((err) => alert(`Ошибка при снятии лайка. ${err}`));
    } else {
      this._api.putLike(this._idCard).then((data) => {
        //this._elementLikes.textContent = data.likes.length;
        this._setLikeNumbers (data.likes.length);
        this._likes = data.likes;
        this._setLikeClasslist(data.likes);
      }).catch((err) => alert(`Ошибка при установке лайка. ${err}`));
    }
  }

  handleDeleteCard() {
    this._element.remove();
  }
  _handleDeleteCard() {
    this._popupConfirmClass.open(this);
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