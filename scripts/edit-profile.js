let popup = document.querySelector(".popup"); //находим попап
let formElement = popup.querySelector(".popup__form"); // находим всю форму, пригодится для кнопки Submit
let openPopup = document.querySelector(".profile__edit-button"); //находим кнопку открытия редактирования профиля
let closePopup = popup.querySelector(".popup__form-closer"); //находим кнопку закрытия редактирования профиля
let submitButton = popup.querySelector(".popup__button"); //находим кнопку СОХРАНИТЬ
let authorName = document.querySelector(".profile__name"); //находим элемент имени пользователя
let authorDescription = document.querySelector(".profile__description"); //находим элемент описания пользователя пользователя
let personal = popup.querySelectorAll(".popup__input"); //находим элемент формы описывающий пользователя - бесполезная переменная
let popupAuthorName = popup.querySelector("#popup-name"); //находим input c именем пользователя
let popupAuthorDescription = popup.querySelector("#popup-description"); //находим input c описанием пользователя

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
    } else {
      openedPopup();
    }
  },
  true
);
//должно сохранять имя пользователя и описание пользователя в разделе профиль
formElement.addEventListener("submit", formSubmitHandler);
