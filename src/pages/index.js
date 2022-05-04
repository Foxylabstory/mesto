//спасибо за ревью

import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../utils/initialCards.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {formConfiguration, popupProfile, 
  profileEditButton, profileForm, popupCard, cardForm,
  cardAddButton, popupImage, formValidators} from '../utils/constants.js';

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

//заполнение popupImgage и навешивание слушателя, для дальнейшей передачи в конструктор Card
const popupImageClass = new PopupWithImage(popupImage);
popupImageClass.setEventListeners();
function handleCardClick(name, link) {
  popupImageClass.open(name, link);
}

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
}, '.elements');

//обходит массив с начальными карточками и заполняет их в DOM
cardsList.renderItems();

//создание экземпляра класса UserInfo содержащий объект с данными о пользователе
const userInfo = new UserInfo({name:'.profile__name', description:'.profile__description'});

//создание экземпляра класса Popup для попапа профайла
const popupProfileClass = new PopupWithForm((data) => {
  userInfo.setUserInfo({data});
}, popupProfile);

//обрабатывает событие по нажатию на кнопку сохранить для попапа профайла
popupProfileClass.setEventListeners();

//создание экземпляров класса Popup для попапа добавления карточки
const popupCardClass = new PopupWithForm((data) => {
  const newCard = {};
  newCard.name = data.popupInputCard;
  newCard.link = data.popupInputLink;
  cardsList.prependItem(createCard(newCard));
}, popupCard);

//обрабатывает событие по нажатию на кнопку сохранить для попапа добавления карточки
popupCardClass.setEventListeners();

//слушатели на открытие попапа редактирования профиля
profileEditButton.addEventListener("click", function () {
  const {popupInputName, popupInputDescription} = userInfo.getUserInfo()
  popupProfileClass.setInputValues({popupInputName, popupInputDescription});
  formValidators[profileForm.getAttribute('name')].resetValidation();
  popupProfileClass.open();
});

//слушатели на открытие попапа добавления карточки
cardAddButton.addEventListener("click", function () {
  formValidators[cardForm.getAttribute('name')].resetValidation();
  popupCardClass.open();
});
/*popups.forEach((popup) => {
  const popupClass = new Popup(popup);
  popupClass.setEventListeners();  
})*/