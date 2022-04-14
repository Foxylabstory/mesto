const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

class Card {
  constructor(data, template) {
    this._link = data.link;
    this._name = data.name;
    this._template = template; //выбор разметки template, ну так, на будущее...
  }

  //получаем разметку из template
  _getTemplate() {
    const elementCard = document
      .querySelector(this._template)
      .content.firstElementChild.cloneNode(true);
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
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _handleDeleteCard() {
    this._element.remove();
  }

  _handleOpenImage() {
    const _figure = document.querySelector(".popup__figure-img");
    const _figureCaption = document.querySelector(".popup__figure-caption");
    _figure.src = this._element.querySelector(".element__image").src;
    _figure.alt = this._element.querySelector(".element__caption").textContent;
    _figureCaption.textContent =
      this._element.querySelector(".element__caption").textContent;
    document.querySelector("#popup-image").classList.add("popup_opened");
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });
    this._element
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
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
/*
  //создает карточку
  function createCard(initialMassiveObject) {
    const elementCard = document.querySelector("#element-template").content.firstElementChild.cloneNode(true);
    const elementCardImage = elementCard.querySelector(".element__image");
    const elementCardCaption = elementCard.querySelector(".element__caption");
    elementCardImage.src = initialMassiveObject.link;
    elementCardImage.alt = initialMassiveObject.name;
    elementCardCaption.textContent = initialMassiveObject.name;
    setElementListeners(elementCard);
    return elementCard;
  }
  
  //добавляет карточку в начало
  function renderCard(card, container) {
    container.prepend(card);
  }

  function removeElement(evt) {
  const element = evt.currentTarget.closest(".element");
  element.remove();
}

function setLikeElement(evt) {
  const element = evt.currentTarget.closest(".element");
  const like = element.querySelector(".element__like");
  like.classList.toggle("element__like_active");
}

function viewElement(evt) {
  const element = evt.currentTarget.closest(".element");
  const elementImg = element.querySelector(".element__image");
  const elementCaption = element.querySelector(".element__caption");
  figure.src = elementImg.src;
  figure.alt = elementCaption.textContent;
  figureCaption.textContent = elementCaption.textContent;
  openPopup(popupImage);
}

//функция по установке слушателей для элементов карточки
function setElementListeners(element) {
  element
    .querySelector(".element__delete")
    .addEventListener("click", removeElement);
  element
    .querySelector(".element__like")
    .addEventListener("click", setLikeElement);
  element.querySelector(".element__image").addEventListener("click", viewElement);
}

  // заполняем секцию elements
  initialCards.forEach(function (card) {
    const createdCard = createCard(card);
    renderCard(createdCard, elements);
  });
  
  */
