//const cardForm = document.forms.popupFormCard; // находим форму попапа добавления новой карточки

function enableValidation() {
    //profileForm.addEventListener("submit", handlerProfileFormSubmit);
    cardForm.addEventListener("input", handleCardFormInput);
    
    profileForm.addEventListener("input", handleCardFormInput);
}

function handleCardFormInput(evt) {
    const form = evt.currentTarget;
    const input = evt.target;

    //setCustomError(input);
    setSpanError(input);
    setSubmitButtonStatement(form);
}

function setCustomError(input) {
    const validity = input.validity;
    input.setCustomValidity('');
    if (!validity) {
        input.setCustomValidity('There is problem');
    };
}

function setSpanError(input) {
    const span = document.querySelector(`#${input.id}-error`);
    span.textContent = input.validationMessage;
}

function setSubmitButtonStatement(form) {
    const button = form.querySelector('.popup__button');
    const isValid = form.checkValidity();
    if (!isValid) {
        button.classList.add('popup__button_type_disable');
        button.setAttribute('disabled', 'true');
    } else {
        button.classList.remove('popup__button_type_disable');
        button.removeAttribute('disabled');
    }
}

enableValidation();


/*function showInputError(element) {
    element.classList.add('popup__input_type_error');
}

function hideInputError(element) {
    element.classList.remove('popup__input_type_error');
}

function isValid() {
    if (!popupInputCardLink.validity.valid) {
        showInputError(popupInputCardLink);
    } else {
        hideInputError(popupInputCardLink);
    };
};

popupInputCardLink.addEventListener('input', isValid);
*/