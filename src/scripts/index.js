import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCards.js';

import '../pages/index.css';

const formConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_type_disable",
};

const cardElements = document.querySelector(".elements");

const popups = document.querySelectorAll('.popup');

const popupProfile = document.querySelector("#popup-profile"); // находим попап профайла
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

const popupImage = document.querySelector("#popup-image");
const popupImageFigure = popupImage.querySelector('.popup__figure-img');
const popupImageFigureCaption = popupImage.querySelector('.popup__figure-caption');

const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute('name');
    // вот тут в объект записываем под именем формы
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

//создает экземпляр карточки, заполняет его и добавляет в DOM
function createCard(item) {
  const card = new Card(item, "#element-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function insertPrependCard(cardElement) {
  cardElements.prepend(cardElement);
}

function insertAppendCard(cardElement) {
  cardElements.append(cardElement);
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
  insertPrependCard(createCard(newCard));
  cardForm.reset();
  closePopup(popupCard);
}

function closeByPressEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}

//слушатели на открытие
profileEditButton.addEventListener("click", function () {
  profileAuthorName.value = authorName.textContent;
  profileAuthorDescription.value = authorDescription.textContent;
  formValidators[profileForm.getAttribute('name')].resetValidation();
  openPopup(popupProfile);
});

cardAddButton.addEventListener("click", function () {
  formValidators[cardForm.getAttribute('name')].resetValidation();
  openPopup(popupCard);
});

//заполнение popupImgage и навешивание слушателя, для дальнейшей передачи в конструктор Card
function handleCardClick(name, link) {
  popupImageFigure.src = link;
  popupImageFigure.alt = name;
  popupImageFigureCaption.textContent = name;
  openPopup(popupImage);
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__form-closer')) {
          closePopup(popup);
        }
    })
})

//слушатели-обработчики сабмитов
profileForm.addEventListener("submit", setProfileFormViaSubmit);
cardForm.addEventListener("submit", setCardFormViaSubmit);

//обходит массив с начальными карточками и заполняет их в DOM
initialCards.forEach((item) => {
  insertAppendCard(createCard(item));
});

//включаем валидацию форм
enableValidation(formConfiguration);

//Спасибо за ревью, очень интересно и познавательно.