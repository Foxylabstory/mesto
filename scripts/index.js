const elements = document.querySelector(".elements"); // находим секцию с карточками

const popupProfile = document.querySelector("#popup-profile"); // находим попап профайла
const closeProfile = popupProfile.querySelector("#profile-closer"); // находим кнопку закрытия попапа профайла
const authorName = document.querySelector(".profile__name"); // находим имя профиля на странице
const authorDescription = document.querySelector(".profile__description"); // находим описание профиля на странице
const profileEditButton = document.querySelector(".profile__edit-button"); // находим кнопку открытия редактирования профиля
const profileForm = document.forms.popupFormProfile; // находим форму в попапе профайла
const profileAuthorName = profileForm.elements.popupInputName; // находим инпут для ввода имени профиля
const profileAuthorDescription = profileForm.elements.popupInputDescription; // находим инпут для ввода описания профиля
const submitButtonEditProfile = popupProfile.querySelector('.popup__button');

const popupCard = document.querySelector("#popup-card"); // находим попап добавления новой карточки
const cardForm = document.forms.popupFormCard; // находим форму попапа добавления новой карточки
const popupInputCardHeader = cardForm.elements.popupInputCard;
const popupInputCardLink = cardForm.elements.popupInputLink;
const cardAddButton = document.querySelector("#profile-add-button"); // находим на странице кнопку добавления новой карточки
const closeCard = popupCard.querySelector("#card-closer"); // находим кнопку закрытия попапа добавления новой карточки
const submitButtonAddCard = popupCard.querySelector('.popup__button');

const popupImage = document.querySelector("#popup-image");
const closeImage = popupImage.querySelector("#image-closer");
const figure = popupImage.querySelector(".popup__figure-img");
const figureCaption = popupImage.querySelector(".popup__figure-caption");

//Сброс ошибок в инпутах
function resetErrorInputStatement() {
  const inputsSpanErrorList = document.querySelectorAll('.popup__input-error');
  inputsSpanErrorList.forEach((item) => {
    item.textContent = '';
  });
}

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
  document.addEventListener("keydown", closeByPressEsc);
  
  somePopup.classList.add("popup_opened");
}

//убирает класс .popup_opened
function closePopup(somePopup) {
  document.removeEventListener("keydown", closeByPressEsc);
  somePopup.classList.remove("popup_opened");
}

//обрабатывает событие по нажатию на кнопку сохранить
function setProfileFormViaSubmit(evt) {
  evt.preventDefault(); //сборс стандартной отправки
  authorName.textContent = profileAuthorName.value;
  authorDescription.textContent = profileAuthorDescription.value;
  closePopup(popupProfile);
}

//обрабатывает событие по нажатию на кнопку сохранить
function setCardFormViaSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = popupInputCardHeader.value;
  newCard.link = popupInputCardLink.value;
  const createdNewCard = createCard(newCard);
  renderCard(createdNewCard, elements);
  cardForm.reset();
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
//сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
function closeByOverlayClick(evt) {
  const closestPopup = evt.target.closest(".popup");
  if (evt.target === closestPopup) {
    closePopup(closestPopup);
  }
}

function closeByPressEsc(evt) {
  if (evt.key === "Escape") {//&& document.querySelector(".popup_opened")
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

//слушатели на открытие
profileEditButton.addEventListener("click", function () {
  profileAuthorName.value = authorName.textContent;
  profileAuthorDescription.value = authorDescription.textContent;
  resetErrorInputStatement();
  setSubmitButtonStatement(profileForm, submitButtonEditProfile);// !! обращается к функции в файле validate.js
  openPopup(popupProfile);
});
cardAddButton.addEventListener("click", function () {
  setSubmitButtonStatement(cardForm, submitButtonAddCard);// !! обращается к функции в файле validate.js
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

//document.addEventListener("keydown", closeByPressEsc);

//слушатели-обработчики сабмитов
profileForm.addEventListener("submit", setProfileFormViaSubmit);
cardForm.addEventListener("submit", setCardFormViaSubmit);

//слушатель по всему попапу, что бы закрывать попап при клике в любом месте, кроме попапа-контейнера
document.addEventListener("mousedown", closeByOverlayClick);

// заполняем секцию elements
initialCards.forEach(function (card) {
  const createdCard = createCard(card);
  renderCard(createdCard, elements);
});
