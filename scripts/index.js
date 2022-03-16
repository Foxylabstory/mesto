const elements = document.querySelector(".elements"); // находим секцию с карточками

const popupProfile = document.querySelector("#popup-profile"); // находим попап профайла
const formProfile = popupProfile.querySelector("#form-profile"); // находим форму в попапе профайла
const closeProfile = popupProfile.querySelector("#profile-closer"); // находим кнопку закрытия попапа профайла
const authorName = document.querySelector(".profile__name"); // находим имя профиля на странице
const authorDescription = document.querySelector(".profile__description"); // находим описание профиля на странице
const profileEditButton = document.querySelector(".profile__edit-button"); // находим кнопку открытия редактирования профиля
const popupProfileAuthorName = popupProfile.querySelector("#name-profile"); // находим инпут для ввода имени профиля
const popupProfileAuthorDescription = popupProfile.querySelector("#description-profile"); // находим инпут для ввода описания профиля

const popupCard = document.querySelector("#popup-card"); // находим попап добавления новой карточки
const formCard = popupCard.querySelector("#form-card"); // находим форму попапа добавления новой карточки
const cardAddButton = document.querySelector("#profile-add-button"); // находим на странице кнопку добавления новой карточки
const closeCard = popupCard.querySelector("#card-closer"); // находим кнопку закрытия попапа добавления новой карточки
const popupCardHeader = popupCard.querySelector("#name-card"); // находим инпут ввода заголовка попапа добавления новой карточки
const popupCardLink = popupCard.querySelector("#link-card"); // находим инпут ввода ссылки попапа добавления новой карточки

const popupImage = document.querySelector("#popup-image");
const closeImage = popupImage.querySelector("#image-closer");
const figure = popupImage.querySelector(".popup__figure-img");
const figureCaption = popupImage.querySelector(".popup__figure-caption");

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
//создает карточку
function createCard(initialMassiveObject) {
  const elementCard = document
    .querySelector("#element-template")
    .content.firstElementChild.cloneNode(true);
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

//добавляет класс .popup_opened
function openPopup(somePopup) {
  somePopup.classList.add("popup_opened");
}

//убирает класс .popup_opened
function closePopup(somePopup) {
  somePopup.classList.remove("popup_opened");
}

//обрабатывает событие по нажатию на кнопку сохранить
function formProfileSubmitHandler(evt) {
  evt.preventDefault(); //сборс стандартной отправки
  authorName.textContent = popupProfileAuthorName.value;
  authorDescription.textContent = popupProfileAuthorDescription.value;
  closePopup(popupProfile);
}

//обрабатывает событие по нажатию на кнопку сохранить
function formCardSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = popupCardHeader.value;
  newCard.link = popupCardLink.value;
  const createdNewCard = createCard(newCard);
  renderCard(createdNewCard, elements);
  popupCardHeader.value = "";
  popupCardLink.value = "";
  closePopup(popupCard);
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
  /* в реализации ниже был смысл, что бы проверять место нажатия на карточку, без блока if/else попап открывается и при нажатии на сердечко, 
  и при нажатии на корзинку, а так попап открывается только по нажатию на картинку, хотелось большей красоты
  if (evt.target.classList.contains("element__image")) {
    openPopup(popupImage);
  } else if (evt.target.classList.contains("element__caption-group")) {
    openPopup(popupImage);
  } else if (evt.target.classList.contains("element__caption")) {
    openPopup(popupImage);
  } else if (evt.target.classList.contains("element__ordering")) {
    openPopup(popupImage);
  }*/
}
/*Я пожалуй оставлю зарисовочку в коде. Спасибо.
document.body.addEventListener("click", (evt) => {
  const element = evt.target.closest(".element");
  if (evt.target.classList.contains("element__delete")) {
    removeElement(element);
  } else if (evt.target.classList.contains("element__like")) {
    setLikeElement(element);
  } else if (evt.target.classList.contains("element__image")) {
    viewElement(element);
  } else if (evt.target.classList.contains("element__caption-group")) {
    viewElement(element);
  } else if (evt.target.classList.contains("element__caption")) {
    viewElement(element);
  } else if (evt.target.classList.contains("element")) {
    viewElement(element);
  }
});
*/
//функция по установке слушателей для элементов карточки
function setElementListeners(element) {
  element.querySelector(".element__delete").addEventListener("click", removeElement);
  element.querySelector(".element__like").addEventListener("click", setLikeElement);
  element.querySelector(".element__image").addEventListener("click", viewElement);
  //element.querySelector(".element__caption-group").addEventListener("click", viewElement);
  //element.querySelector(".element__caption").addEventListener("click", viewElement);
  //element.querySelector(".element__ordering").addEventListener("click", viewElement);
}
//сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
function closeByOverlayClick(evt) {
  const closestPopup = evt.target.closest(".popup");
  if (evt.target === evt.currentTarget) {
    closePopup(closestPopup);
  }
}

//слушатели на открытие
profileEditButton.addEventListener("click", function () {
  popupProfileAuthorName.value = authorName.textContent;
  popupProfileAuthorDescription.value = authorDescription.textContent;
  openPopup(popupProfile);
});
cardAddButton.addEventListener("click", function () {
  openPopup(popupCard);
});

//слушатели на закрытие
closeProfile.addEventListener("click", function () {
  closePopup(popupProfile);
});
closeCard.addEventListener("click", function () {
  closePopup(popupCard);
});
closeImage.addEventListener("click", function () {
  closePopup(popupImage);
});

//слушатели-обработчики сабмитов
formProfile.addEventListener("submit", formProfileSubmitHandler);
formCard.addEventListener("submit", formCardSubmitHandler);

//слушатель по всему попапу, что бы закрывать попап при клике в любом месте, кроме попапа-контейнера
popupProfile.addEventListener('mousedown', closeByOverlayClick);
popupCard.addEventListener('mousedown', closeByOverlayClick);
popupImage.addEventListener('mousedown', closeByOverlayClick);

// заполняем секцию elements
initialCards.forEach(function (card) {
  const createdCard = createCard(card);
  renderCard(createdCard, elements);
});
