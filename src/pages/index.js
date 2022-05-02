import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../utils/initialCards.js';
import Section from '../components/Section.js';
import Popup from '../components/Popup.js';

import {formConfiguration, cardElements, popups, popupProfile, authorName, authorDescription, 
  profileEditButton, profileForm, profileAuthorName, profileAuthorDescription, popupCard, cardForm,
  popupInputCardHeader, popupInputCardLink, cardAddButton, popupImage, popupImageFigure,
  popupImageFigureCaption, formValidators} from '../utils/constants.js';

import '../pages/index.css';
import PopupWithImage from '../components/PopupWithImage.js';



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

//создание экземпляров класса Popup для каждого попапа
const popupProfileClass = new Popup(popupProfile);
const popupCardClass = new Popup(popupCard);


/*function insertAppendCard(cardElement) {
  cardElements.append(cardElement);
}*/

function insertPrependCard(cardElement) {
  cardElements.prepend(cardElement);
}

//добавляет класс .popup_opened
/*function openPopup(somePopup) {
  document.addEventListener("keydown", closeByPressEsc);
  somePopup.classList.add("popup_opened");
}*/

//убирает класс .popup_opened
/*function closePopup(somePopup) {
  document.removeEventListener("keydown", closeByPressEsc);
  somePopup.classList.remove("popup_opened");
}*/

//обрабатывает событие по нажатию на кнопку сохранить
function setProfileFormViaSubmit(evt) {
  evt.preventDefault();
  authorName.textContent = profileAuthorName.value;
  authorDescription.textContent = profileAuthorDescription.value;
  popupProfileClass.close();
  //closePopup(popupProfile);
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
  //closePopup(popupCard);
}

/*function closeByPressEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
}*/

//слушатели на открытие
profileEditButton.addEventListener("click", function () {
  profileAuthorName.value = authorName.textContent;
  profileAuthorDescription.value = authorDescription.textContent;
  formValidators[profileForm.getAttribute('name')].resetValidation();
  popupProfileClass.open();
  //openPopup(popupProfile);
});

cardAddButton.addEventListener("click", function () {
  formValidators[cardForm.getAttribute('name')].resetValidation();
  popupCardClass.open();
  //openPopup(popupCard);
});

//заполнение popupImgage и навешивание слушателя, для дальнейшей передачи в конструктор Card
function handleCardClick(name, link) {
  const popupImageClass = new PopupWithImage(name, link, popupImage);
  //popupImageFigure.src = link;
  //popupImageFigure.alt = name;
  //popupImageFigureCaption.textContent = name;
  popupImageClass.open();
  //openPopup(popupImage);
}

popups.forEach((popup) => {
  const popupClass = new Popup(popup);
  popupClass.setEventListeners();
  /*
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__form-closer')) {
          closePopup(popup);
        }
    })
  */
})

//слушатели-обработчики сабмитов
profileForm.addEventListener("submit", setProfileFormViaSubmit);
cardForm.addEventListener("submit", setCardFormViaSubmit);

//обходит массив с начальными карточками и заполняет их в DOM
/*initialCards.forEach((item) => {
  insertAppendCard(createCard(item));
});*/
cardsList.renderItems();

//включаем валидацию форм
enableValidation(formConfiguration);