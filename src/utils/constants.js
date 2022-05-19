const formConfiguration = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_type_disable",
};

const popupProfile = document.querySelector("#popup-profile"); // находим попап профайла
const profileEditButton = document.querySelector(".profile__edit-button"); // находим кнопку открытия редактирования профиля
const profileForm = document.forms.popupFormProfile; // находим форму в попапе профайла

const popupCard = document.querySelector("#popup-card"); // находим попап добавления новой карточки
const cardForm = document.forms.popupFormCard; // находим форму попапа добавления новой карточки
const cardAddButton = document.querySelector("#profile-add-button"); // находим на странице кнопку добавления новой карточки

const popupImage = document.querySelector("#popup-image");

const popupConfirm = document.querySelector("#popup-confirm");

const popupAvatar = document.querySelector("#popup-avatar");
const avatarChangeButton = document.querySelector(".profile__avatar");
const avatarForm = document.forms.popupFormAvatar;

const formValidators = {};

export {
  formConfiguration,
  popupProfile,
  profileEditButton,
  profileForm,
  popupAvatar,
  avatarChangeButton,
  avatarForm,
  popupCard,
  cardForm,
  cardAddButton,
  popupImage,
  popupConfirm,
  formValidators,
};
