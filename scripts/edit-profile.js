let popup = document.querySelector(".popup"); //находим попап
let openPopup = document.querySelector(".profile__edit-button"); //находим кнопку открытия редактирования профиля
let closePopup = popup.querySelector(".popup__form-closer"); //находим кнопку закрытия редактирования профиля
let submitButton = popup.querySelector('.popup__button'); //находим кнопку СОХРАНИТЬ
let authorName = document.querySelector('.profile__name'); //находим элемент имени пользователя
let authorDescription = document.querySelector('.profile__description'); //находим элемент описания пользователя пользователя
let personal = popup.querySelectorAll('.popup__input'); //находим элемент формы описывающий пользователя - бесполезная переменная
let popupAuthorName = popup.querySelector('#popup-name');
let popupAuthorDescription = popup.querySelector('#popup-description');

//функции
function openedPopup() { //добавляет класс .popup_opened
  popup.classList.add("popup_opened"); 
};

function closedPopup() {  //убирает класс .popup_opened
  popup.classList.remove("popup_opened"); 
};

function formSubmitHandler (evt) {  //решение предложенное платформой
  evt.preventDefault(); //сборс стандартной отправки
  authorName.textContent = popupAuthorName.value; //обратное действие, в текстовое значение объекта записываем тестовое содержимое песевдомассива input
  authorDescription.textContent = popupAuthorDescription.value;
  closedPopup(); //удаляет класс .popup_opened
}


//слушатели
 
openPopup.addEventListener("click", function() { // слушатель по кнопке редактировать профиль, для того что бы открывать попап
  popupAuthorName.value = authorName.textContent;
  popupAuthorDescription.value = authorDescription.textContent;
  openedPopup(); //добавляет класс .popup_opened
  /*personal[0].value = authorName.textContent; //в псевдомассив элемента input заносим значение текста из элемента с классом .profile__name и .profile__description
  personal[1].value = authorDescription.textContent;*/
});

//слушатель по кнопке закрыть попап, что бы собственно попап закрывать
closePopup.addEventListener("click", closedPopup);

//слушатель по всему попапу, что бы закрывать попап при клике в любом месте, кроме контейнера
popup.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) { //сравнивает места нажатия кликов, если совпадает целевой клик с расположением обработчика, попап закрывается
    closedPopup();
  } else {
    openedPopup();
  }
}, true);

//что происходит по нажатию на кнопку Сохранить, мое решение
/*submitButton.addEventListener('click', function(){
  authorName.textContent = personal[0].value; //обратное действие, в текстовое значение объекта записываем тестовое содержимое песевдомассива input
  authorDescription.textContent = personal[1].value;
  popup.classList.remove("popup_opened");
});*/


submitButton.addEventListener('click', formSubmitHandler); //должно сохранять имя пользователя и описание пользователя в разделе профиль


/*
function openClosePopup() {
  popup.classList.toggle("popup_opened");
};

popup.addEventListener("click", function (event) {
  if (event.target === event.currentTarget) {
    openClosePopup();
  }
}, true);

openPopup.addEventListener("click", openClosePopup);
closePopup.addEventListener("click", openClosePopup);
*/