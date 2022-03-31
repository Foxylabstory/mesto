function enableValidation() {
    cardForm.addEventListener("input", handleFormInput);
    profileForm.addEventListener("input", handleFormInput);
}

function handleFormInput(evt) {
    const form = evt.currentTarget;
    const input = evt.target;
    setSpanError(input);
    setSubmitButtonStatement(form);
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