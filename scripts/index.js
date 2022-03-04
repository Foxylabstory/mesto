let elements = document.querySelector(".elements"); // находим секцию с карточками
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

// заполняем секцию elements
addCards(initialCards);//вызываем функцию


//далее все что касается попапа с профилем пользователя

let popupProfile = document.querySelector("#popup-profile"); //находим попап порфиля
let formElementProfile = popupProfile.querySelector("#form-profile"); // находим всю форму профайла, пригодится для кнопки Submit
let openPopupProfile = document.querySelector("#profile-edit-button"); //находим кнопку открытия редактирования профиля
let closePopupProfile = popupProfile.querySelector("#profile-closer"); //находим кнопку закрытия редактирования профиля
//let submitButton = popup.querySelector(".popup__button"); //находим кнопку СОХРАНИТЬ
let authorName = document.querySelector(".profile__name"); //находим элемент имени пользователя
let authorDescription = document.querySelector(".profile__description"); //находим элемент описания пользователя пользователя
//let personal = popup.querySelectorAll(".popup__input"); //находим элемент формы описывающий пользователя - бесполезная переменная
let popupAuthorName = popupProfile.querySelector("#name-profile"); //находим input c именем пользователя
let popupAuthorDescription = popupProfile.querySelector("#description-profile"); //находим input c описанием пользователя


//функции

//добавляет класс .popup_opened
function openedPopupProfile() {
  popupProfile.classList.add("popup_opened");
};

//убирает класс .popup_opened
function closedPopupProfile() {
  popupProfile.classList.remove("popup_opened");
};

//решение предложенное платформой
function formSubmitHandlerProfile(evt) {
  evt.preventDefault(); //сборс стандартной отправки
  authorName.textContent = popupAuthorName.value; //обратное действие, в текстовое значение объекта записываем тестовое содержимое песевдомассива input
  authorDescription.textContent = popupAuthorDescription.value;
  closedPopupProfile(); //удаляет класс .popup_opened
}

//слушатели
// слушатель по кнопке редактировать профиль, для того что бы открывать попап
openPopupProfile.addEventListener("click", function () {
  popupAuthorName.value = authorName.textContent;
  popupAuthorDescription.value = authorDescription.textContent;
  openedPopupProfile(); //добавляет класс .popup_opened
});

//слушатель по кнопке закрыть попап, что бы собственно попап закрывать
closePopupProfile.addEventListener("click", closedPopupProfile);

//слушатель по всему попапу, что бы закрывать попап при клике в любом месте, кроме контейнера
popupProfile.addEventListener("click",
  function (event) {
    if (event.target === event.currentTarget) {
      //сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
      closedPopupProfile();
    } /*else {
      openedPopup();
    }*/
  },
  true
);
//должно сохранять имя пользователя и описание пользователя в разделе профиль
formElementProfile.addEventListener("submit", formSubmitHandlerProfile);


//далее попап с добавлением карточки

let openPopupCard = document.querySelector("#profile-add-button"); //находим кнопку открытия попапа добавления карточки
let popupCard = document.querySelector("#popup-card"); //находим попап порфиля
let closePopupCard = popupCard.querySelector("#card-closer"); //находим кнопку закрытия попапа добавления карточки

//функция добавления класса попапу добавления карточки
function openedPopupCard() {
  popupCard.classList.add("popup_opened");
};

//функция изъятия класса у попапа добавления карточки
function closedPopupCard() {
  popupCard.classList.remove("popup_opened");
};

//слушатель кнопки добавления карточки
openPopupCard.addEventListener("click", openedPopupCard);

//слушатель по кнопке закрыть попап, что бы собственно попап закрывать
closePopupCard.addEventListener("click", closedPopupCard);

//слушатель по всему попапу, что бы закрывать попап при клике в любом месте, кроме контейнера
popupCard.addEventListener("click",
  function (event) {
    if (event.target === event.currentTarget) {
      //сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
      closedPopupCard();
    } /*else {
      openedPopup();
    }*/
  },
  true
);