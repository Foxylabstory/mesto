const formConfiguration = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    inputErrorClass: "popup__input_type_error",
    errorSpanClass: "popup__input-error",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_type_disable",
  };
  
  //const cardElements = document.querySelector(".elements");
  
  //const popups = document.querySelectorAll('.popup');
  
  const popupProfile = document.querySelector("#popup-profile"); // находим попап профайла
  //const authorName = document.querySelector(".profile__name"); // находим имя профиля на странице
  //const authorDescription = document.querySelector(".profile__description"); // находим описание профиля на странице
  const profileEditButton = document.querySelector(".profile__edit-button"); // находим кнопку открытия редактирования профиля
  const profileForm = document.forms.popupFormProfile; // находим форму в попапе профайла
  const profileAuthorName = profileForm.elements.popupInputName; // находим инпут для ввода имени профиля
  const profileAuthorDescription = profileForm.elements.popupInputDescription; // находим инпут для ввода описания профиля
  
  const popupCard = document.querySelector("#popup-card"); // находим попап добавления новой карточки
  const cardForm = document.forms.popupFormCard; // находим форму попапа добавления новой карточки
  //const popupInputCardHeader = cardForm.elements.popupInputCard;
  //const popupInputCardLink = cardForm.elements.popupInputLink;
  const cardAddButton = document.querySelector("#profile-add-button"); // находим на странице кнопку добавления новой карточки
  
  const popupImage = document.querySelector("#popup-image");
  const popupImageFigure = popupImage.querySelector('.popup__figure-img');
  const popupImageFigureCaption = popupImage.querySelector('.popup__figure-caption');
  
  const formValidators = {}

  export {formConfiguration, popupProfile, 
    profileEditButton, profileForm, profileAuthorName, profileAuthorDescription, popupCard, cardForm,
    cardAddButton, popupImage, popupImageFigure,
    popupImageFigureCaption, formValidators}