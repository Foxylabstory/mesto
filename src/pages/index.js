//спасибо за ревью

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/initialCards.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

import {
  formConfiguration,
  popupProfile,
  profileEditButton,
  profileForm,
  popupCard,
  cardForm,
  cardAddButton,
  popupImage,
  formValidators,
} from "../utils/constants.js";

import "../pages/index.css";

//создание экземпляра API
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-41/",
  headers: {
    authorization: "05f5ca8c-a3fe-4352-832f-702af14f0f21",
    "Content-Type": "application/json",
  },
});

//установка инфо о пользователе при загрузке
const initialUserInfoFromApi = api.getUserInfo();
initialUserInfoFromApi.then((data) => {
  console.log(data);
  userInfo.setUserInfoFromApi({ data });
});

//получение начального списка карточек
const initialCardsFromApi = api.getInitialCards();
initialCardsFromApi.then((data) => {
  //берет созданный экземпляр карточки и добавляет в секцию
  const cardsList = new Section(
    {
      items: data,
      renderer: (item) => {
        cardsList.addItem(createCard(item));
      },
    },
    ".elements"
  );

  //обходит массив с начальными карточками и заполняет их в DOM
  cardsList.renderItems();
}).catch((err) => alert(err));

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    // получаем данные из атрибута `name` у формы
    const formName = formElement.getAttribute("name");
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
/*
//берет созданный экземпляр карточки и добавляет в секцию
const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardsList.addItem(createCard(item));
  }
}, '.elements');

//обходит массив с начальными карточками и заполняет их в DOM
cardsList.renderItems();
*/
//создание экземпляра класса UserInfo содержащий объект с данными о пользователе
const userInfo = new UserInfo({
  name: ".profile__name",
  description: ".profile__description",
  avatar: ".profile__avatar"
});

//создание экземпляра класса Popup для попапа профайла
const popupProfileClass = new PopupWithForm((data) => {
  userInfo.setUserInfo({ data });
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
  const { popupInputName, popupInputDescription } = userInfo.getUserInfo();
  popupProfileClass.setInputValues({ popupInputName, popupInputDescription });
  formValidators[profileForm.getAttribute("name")].resetValidation();
  popupProfileClass.open();
});

//слушатели на открытие попапа добавления карточки
cardAddButton.addEventListener("click", function () {
  formValidators[cardForm.getAttribute("name")].resetValidation();
  popupCardClass.open();
});
/*popups.forEach((popup) => {
  const popupClass = new Popup(popup);
  popupClass.setEventListeners();  
})*/
