const elements = document.querySelector(".elements"); // находим секцию с карточками

const popupProfile = document.querySelector('#popup-profile');// находим попап профайла
const formProfile = popupProfile.querySelector('#form-profile');// находим форму в попапе профайла
//const closeProfile = popupProfile.querySelector('#profile-closer');// находим кнопку закрытия попапа профайла
const authorName = document.querySelector('.profile__name');// находим имя профиля на странице
const authorDescription = document.querySelector(".profile__description");// находим описание профиля на странице
//const profileEditButton = document.querySelector(".profile__edit-button");// находим кнопку открытия редактирования профиля
const popupProfileAuthorName = popupProfile.querySelector("#name-profile");// находим инпут для ввода имени профиля
const popupProfileAuthorDescription = popupProfile.querySelector('#description-profile');// находим инпут для ввода описания профиля

const popupCard = document.querySelector('#popup-card');// находим попап добавления новой карточки
const formCard = popupCard.querySelector('#form-card');// находим форму попапа добавления новой карточки
//const cardAddButton = document.querySelector('#profile-add-button');// находим на странице кнопку добавления новой карточки
//const closeCard = popupCard.querySelector('#card-closer');// находим кнопку закрытия попапа добавления новой карточки
const popupCardHeader = popupCard.querySelector('#name-card');// находим инпут ввода заголовка попапа добавления новой карточки
const popupCardLink = popupCard.querySelector('#link-card');// находим инпут ввода ссылки попапа добавления новой карточки

const popupImage = document.querySelector('#popup-image');
//const closeImage = popupImage.querySelector('#image-closer');
const figure = popupImage.querySelector('.popup__figure-img');
const figureCaption = popupImage.querySelector('.popup__figure-caption');

//const likeButton = elements.querySelectorAll('.element__like');

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

  //elementActionListeners(elementTemplate);
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
}

document.body.addEventListener('click', (evt) => {
  
  const element = evt.target.closest(".element");
  if (evt.target.classList.contains("element__delete")) {
    removeElement(element);
  } else if (evt.target.classList.contains("element__like")) {
    setLikeElement(element);
  } else if (evt.target.classList.contains('element__image')) {
    viewElement(element);
  } else if (evt.target.classList.contains('element__caption-group')) {
    viewElement(element);
  } else if (evt.target.classList.contains('element__caption')) {
    viewElement(element);
  } else if (evt.target.classList.contains('element')) {
    viewElement(element);
  } else if (evt.target.classList.contains("profile__edit-button")) {
    popupProfileAuthorName.value = authorName.textContent;
    popupProfileAuthorDescription.value = authorDescription.textContent;
    openPopup(popupProfile);
  } else if (evt.target.classList.contains("profile__add-button")) {
    openPopup(popupCard);
  } else if (evt.target.classList.contains('popup__form-closer_profile')) {
    closePopup(popupProfile);
  } else if (evt.target.classList.contains('popup__form-closer_card')) {
    closePopup(popupCard);
  } else if (evt.target.classList.contains('popup__form-closer_img')) {
    closePopup(popupImage);
  }
});

//слушатель по всему попапу, что бы закрывать попап при клике в любом месте, кроме контейнера
popupProfile.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    //сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
    closePopup(popupProfile);
  } 
}, true);

popupCard.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    //сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
    closePopup(popupCard);
  } 
}, true);

popupImage.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    //сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
    closePopup(popupImage);
  } 
}, true);

function removeElement(element) {
  element.remove();
};

function setLikeElement(element) {
  const like = element.querySelector('.element__like');
  like.classList.toggle('element__like_active');
}

function viewElement(element) {
  console.log('тык');
  const elementImg = element.querySelector('.element__image');
  const elementCaption = element.querySelector('.element__caption');
  figure.src = elementImg.src
  figureCaption.textContent = elementCaption.textContent;
  openPopup(popupImage);
};

// заполняем секцию elements
initialCards.map(renderElement);

//слушатели-обработчики сабмитов
formProfile.addEventListener("submit", formProfileSubmitHandler);
formCard.addEventListener('submit', formCardSubmitHandler);