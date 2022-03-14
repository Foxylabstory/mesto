const elements = document.querySelector(".elements"); // находим секцию с карточками

const popupProfile = document.querySelector('#popup-profile');// находим попап профайла
const formProfile = popupProfile.querySelector('#form-profile');// находим форму в попапе профайла
const closeProfile = popupProfile.querySelector('#profile-closer');// находим кнопку закрытия попапа профайла
const authorName = document.querySelector('.profile__name');// находим имя профиля на странице
const authorDescription = document.querySelector(".profile__description");// находим описание профиля на странице
const profileEditButton = document.querySelector(".profile__edit-button");// находим кнопку открытия редактирования профиля
const popupProfileAuthorName = popupProfile.querySelector("#name-profile");// находим инпут для ввода имени профиля
const popupProfileAuthorDescription = popupProfile.querySelector('#description-profile');// находим инпут для ввода описания профиля

const popupCard = document.querySelector('#popup-card');// находим попап добавления новой карточки
const formCard = popupCard.querySelector('#form-card');// находим форму попапа добавления новой карточки
const cardAddButton = document.querySelector('#profile-add-button');// находим на странице кнопку добавления новой карточки
const closeCard = popupCard.querySelector('#card-closer');// находим кнопку закрытия попапа добавления новой карточки
const popupCardHeader = popupCard.querySelector('#name-card');// находим инпут ввода заголовка попапа добавления новой карточки
const popupCardLink = popupCard.querySelector('#link-card');// находим инпут ввода ссылки попапа добавления новой карточки

const likeButton = elements.querySelectorAll('.element__like');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function renderElement(initialMassiveObject) {
  const elementTemplate = document.querySelector('#element-template').content.firstElementChild.cloneNode(true);
  elementTemplate.querySelector('.element__image').src = initialMassiveObject.link;
  elementTemplate.querySelector('.element__image').alt = initialMassiveObject.name;
  elementTemplate.querySelector('.element__caption').textContent = initialMassiveObject.name;
  elements.prepend(elementTemplate);

  elementActionListeners(elementTemplate);
};

//добавляет класс .popup_opened
function openPopup(somePopup) {
  somePopup.classList.add("popup_opened");
};

//убирает класс .popup_opened
function closePopup(somePopup) {
  somePopup.classList.remove("popup_opened");
};

function formProfileSubmitHandler(evt) {
  evt.preventDefault(); //сборс стандартной отправки
  authorName.textContent = popupProfileAuthorName.value;
  authorDescription.textContent = popupProfileAuthorDescription.value;
  closePopup(popupProfile);
};

function formCardSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {};
  newCard.name = popupCardHeader.value;
  newCard.link = popupCardLink.value;
  renderElement(newCard);
  popupCardHeader.value = '';
  popupCardLink.value = '';
  closePopup(popupCard);

  /*const elementTemplate = document.querySelector('#element-template').content.firstElementChild.cloneNode(true);
  elementTemplate.querySelector('.element__image').src = popupCardLink.value;
  elementTemplate.querySelector('.element__image').alt = popupCardHeader.value;
  elementTemplate.querySelector('.element__caption').textContent = popupCardHeader.value;
  elementTemplate.querySelector('.element__like').addEventListener('click', function (evt) {
    console.log('тык');    
  });
  elements.prepend(elementTemplate);
  popupCardHeader.value = '';
  popupCardLink.value = '';
  closePopup(popupCard);*/
}

function elementActionListeners(elementTemplate) {
  elementTemplate.querySelector('.element__delete').addEventListener('click', removeElement);
  elementTemplate.querySelector('.element__like').addEventListener('click', setLikeElement);
  //elementTemplate.querySelector('.element').addEventListener('click', console.log('тык'));
}

function removeElement(evt) {
  const element = evt.currentTarget.closest('.element');
  element.remove();
};

function setLikeElement(evt) {
  const element = evt.currentTarget.closest('.element__like');
  element.classList.toggle('element__like_active');
}

/*function viewElement(evt) {
  const element = evt.currentTarget.closest('.element');
  console.log(element);
};*/

// заполняем секцию elements
initialCards.map(renderElement);

// слушатель по кнопкам открыть попап
profileEditButton.addEventListener("click", function () {
  popupProfileAuthorName.value = authorName.textContent;
  popupProfileAuthorDescription.value = authorDescription.textContent;
  openPopup(popupProfile);
});
cardAddButton.addEventListener('click', () => openPopup(popupCard));

//слушатели-обработчики сабмитов
formProfile.addEventListener("submit", formProfileSubmitHandler);
formCard.addEventListener('submit', formCardSubmitHandler);

//слушатель по кнопке закрыть попап пофиля, что бы собственно попап закрывать
closeProfile.addEventListener('click', () => closePopup(popupProfile));
closeCard.addEventListener('click', () => closePopup(popupCard));

/*
//слушатель по всему попапу, что бы закрывать попап при клике в любом месте, кроме контейнера
popup.addEventListener(
  "click",
  function (event) {
    if (event.target === event.currentTarget) {
      //сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
      closedPopup();
    } 
  },
  true
);
*/