let elements = document.querySelector(".elements"); // находим секцию с карточками
let popup = document.querySelector(".popup"); //находим попап
let formElement = popup.querySelector(".popup__form"); // находим всю форму, пригодится для кнопки Submit
let openPopup = document.querySelector(".profile__edit-button"); //находим кнопку открытия редактирования профиля
let closePopup = popup.querySelector(".popup__form-closer"); //находим кнопку закрытия редактирования профиля
//let submitButton = popup.querySelector(".popup__button"); //находим кнопку СОХРАНИТЬ
let authorName = document.querySelector(".profile__name"); //находим элемент имени пользователя
let authorDescription = document.querySelector(".profile__description"); //находим элемент описания пользователя пользователя
//let personal = popup.querySelectorAll(".popup__input"); //находим элемент формы описывающий пользователя - бесполезная переменная
let popupAuthorName = popup.querySelector("#popup-name"); //находим input c именем пользователя
let popupAuthorDescription = popup.querySelector("#popup-description"); //находим input c описанием пользователя

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


//функции

//добавляет класс .popup_opened
function openedPopup() {
  popup.classList.add("popup_opened");
}

//убирает класс .popup_opened
function closedPopup() {
  popup.classList.remove("popup_opened");
}

//решение предложенное платформой
function formSubmitHandler(evt) {
  evt.preventDefault(); //сборс стандартной отправки
  authorName.textContent = popupAuthorName.value; //обратное действие, в текстовое значение объекта записываем тестовое содержимое песевдомассива input
  authorDescription.textContent = popupAuthorDescription.value;
  closedPopup(); //удаляет класс .popup_opened
}

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

//слушатели

// слушатель по кнопке редактировать профиль, для того что бы открывать попап
openPopup.addEventListener("click", function () {
  popupAuthorName.value = authorName.textContent;
  popupAuthorDescription.value = authorDescription.textContent;
  openedPopup(); //добавляет класс .popup_opened
});

//слушатель по кнопке закрыть попап, что бы собственно попап закрывать
closePopup.addEventListener("click", closedPopup);

//слушатель по всему попапу, что бы закрывать попап при клике в любом месте, кроме контейнера
popup.addEventListener(
  "click",
  function (event) {
    if (event.target === event.currentTarget) {
      //сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
      closedPopup();
    } /*else {
      openedPopup();
    }*/
  },
  true
);
//должно сохранять имя пользователя и описание пользователя в разделе профиль
formElement.addEventListener("submit", formSubmitHandler);

// заполняем секцию elements
addCards(initialCards);