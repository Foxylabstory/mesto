import {createAndAddCard} from './card.js';
import {FormValidator} from './validate.js';

const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_type_disable",
};

const popupProfile = document.querySelector("#popup-profile"); // находим попап профайла
const closeProfile = popupProfile.querySelector("#profile-closer"); // находим кнопку закрытия попапа профайла
const authorName = document.querySelector(".profile__name"); // находим имя профиля на странице
const authorDescription = document.querySelector(".profile__description"); // находим описание профиля на странице
const profileEditButton = document.querySelector(".profile__edit-button"); // находим кнопку открытия редактирования профиля
const profileForm = document.forms.popupFormProfile; // находим форму в попапе профайла
const profileAuthorName = profileForm.elements.popupInputName; // находим инпут для ввода имени профиля
const profileAuthorDescription = profileForm.elements.popupInputDescription; // находим инпут для ввода описания профиля

const popupCard = document.querySelector("#popup-card"); // находим попап добавления новой карточки
const cardForm = document.forms.popupFormCard; // находим форму попапа добавления новой карточки
const popupInputCardHeader = cardForm.elements.popupInputCard;
const popupInputCardLink = cardForm.elements.popupInputLink;
const cardAddButton = document.querySelector("#profile-add-button"); // находим на странице кнопку добавления новой карточки
const closeCard = popupCard.querySelector("#card-closer"); // находим кнопку закрытия попапа добавления новой карточки

const popupImage = document.querySelector("#popup-image");
const closeImage = popupImage.querySelector("#image-closer");

//создание экземпляров валидации
const profileFormValidation = new FormValidator(obj, profileForm);
const cardFormValidation = new FormValidator(obj, cardForm);

//Сброс ошибок в инпутах
function resetErrorInputStatement() {
  const inputsSpanErrorList = document.querySelectorAll('.popup__input-error');
  inputsSpanErrorList.forEach((item) => {
    item.textContent = '';
  });
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
  evt.preventDefault();
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
  createAndAddCard(newCard, "#element-template");//вызывает публичную функцию из файла card.js, как параметр передается вновь созданный объект и вид разметки template, если разметку заменить, будет другая форма карточки
  cardForm.reset();
  closePopup(popupCard);
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
  profileFormValidation.enableValidation();
  openPopup(popupProfile);
});

cardAddButton.addEventListener("click", function () {
  cardFormValidation.enableValidation();
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
profileForm.addEventListener("submit", setProfileFormViaSubmit);
cardForm.addEventListener("submit", setCardFormViaSubmit);

//слушатель по всему попапу, что бы закрывать попап при клике в любом месте, кроме попапа-контейнера
document.addEventListener("mousedown", closeByOverlayClick);

export {openPopup}