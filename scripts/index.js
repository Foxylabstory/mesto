const elements = document.querySelector(".elements"); // находим секцию с карточками
const popupProfile = document.querySelector('#popup-profile');
const formProfile = popupProfile.querySelector('#form-profile');
const closeProfile = popupProfile.querySelector('#profile-closer');
const authorName = document.querySelector('.profile__name');
const authorDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupProfileAuthorName = popupProfile.querySelector("#name-profile");
const popupProfileAuthorDescription = popupProfile.querySelector('#description-profile');

const popupCard = document.querySelector('#popup-card');

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

//add cards function
function addCards(input) {//описываем функцию добавления карточек
  for (let i = 0; i < input.length; i++) { //перебор массива объектов, затем //мягко, не затрагивая DOM, вставляем новые блоки в секцию elements, вставка происходит всегда после начала
    elements.insertAdjacentHTML('afterBegin', `
    <div class="element">
      <img class="element__image" src="${input[i].link}" alt="${input[i].name}"/>
      <div class="element__caption-group">
        <h2 class="element__caption">${input[i].name}</h2>
        <button class="element__like" type="button"></button>
      </div>
    </div>`);//${input[i].link} указывается массив, его индекс, .данные по ключу
  };
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
  authorName.textContent = popupProfileAuthorName.value; //обратное действие, в текстовое значение объекта записываем тестовое содержимое песевдомассива input
  authorDescription.textContent = popupProfileAuthorDescription.value;
  closePopup(popupProfile); //удаляет класс .popup_opened
};

// заполняем секцию elements
addCards(initialCards);

// слушатель по кнопке редактировать профиль, для того что бы открывать попап пофиля
profileEditButton.addEventListener("click", function () {
  popupProfileAuthorName.value = authorName.textContent;
  popupProfileAuthorDescription.value = authorDescription.textContent;
  openPopup(popupProfile); //добавляет класс .popup_opened
});

//должно сохранять имя пользователя и описание пользователя в разделе профиль
formProfile.addEventListener("submit", formProfileSubmitHandler);

//слушатель по кнопке закрыть попап пофиля, что бы собственно попап закрывать
//closeProfile.addEventListener("click", closePopup(popupProfile));
closeProfile.addEventListener('click', function () {
  closePopup(popupProfile);
});

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