import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../utils/initialCards.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {formConfiguration, cardElements, popups, popupProfile, authorName, authorDescription, 
  profileEditButton, profileForm, profileAuthorName, profileAuthorDescription, popupCard, cardForm,
  popupInputCardHeader, popupInputCardLink, cardAddButton, popupImage, popupImageFigure,
  popupImageFigureCaption, formValidators} from '../utils/constants.js';

import '../pages/index.css';

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
//включаем валидацию форм
enableValidation(formConfiguration);

//создает экземпляр карточки, заполняет его
function createCard(item) {
  const card = new Card(item, "#element-template", handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//берет созданный экземпляр карточки и добавляет в секцию
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
},
'.elements'
);
//обходит массив с начальными карточками и заполняет их в DOM
cardsList.renderItems();

//сщздание экземпляра класса UserInfo содержащий объект с данными о пользователе
const userInfo = new UserInfo({name:'.profile__name', description:'.profile__description'});

//создание экземпляров класса Popup для попапа профайла
const popupProfileClass = new PopupWithForm((data) => {
  userInfo.setUserInfo({data});
}, popupProfile);

//обрабатывает событие по нажатию на кнопку сохранить для попапа профайла
popupProfileClass.setEventListeners();

//создание экземпляров класса Popup для попапа добавления карточки
//const popupCardClass = new PopupWithForm((data) => {}, popupCard);
const popupCardClass = new Popup(popupCard);

//обрабатывает событие по нажатию на кнопку сохранить для попапа добавления карточки
popupCardClass.setEventListeners();

function insertPrependCard(cardElement) {
  cardElements.prepend(cardElement);
}

//обрабатывает событие по нажатию на кнопку сохранить
function setCardFormViaSubmit(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = popupInputCardHeader.value;
  newCard.link = popupInputCardLink.value;
  insertPrependCard(createCard(newCard));
  cardForm.reset();
  popupCardClass.close();
}

//слушатели на открытие попапа редактирования профиля/done
profileEditButton.addEventListener("click", function () {
  profileAuthorName.value = userInfo.getUserInfo().name;
  profileAuthorDescription.value = userInfo.getUserInfo().description;
  formValidators[profileForm.getAttribute('name')].resetValidation();
  popupProfileClass.open();
});

//слушатели на открытие попапа добавления карточки
cardAddButton.addEventListener("click", function () {
  formValidators[cardForm.getAttribute('name')].resetValidation();
  popupCardClass.open();
});

//заполнение popupImgage и навешивание слушателя, для дальнейшей передачи в конструктор Card
function handleCardClick(name, link) {
  const popupImageClass = new PopupWithImage(name, link, popupImage);
  //popupImageFigure.src = link;
  //popupImageFigure.alt = name;
  //popupImageFigureCaption.textContent = name;
  popupImageClass.open();
  popupImageClass.setEventListeners();
  //openPopup(popupImage);
}
/*
popups.forEach((popup) => {
  const popupClass = new Popup(popup);
  popupClass.setEventListeners();
  
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__form-closer')) {
          closePopup(popup);
        }
    })
  
})*/

//слушатели-обработчики сабмитов
//cardForm.addEventListener("submit", setCardFormViaSubmit);

