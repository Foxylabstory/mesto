const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_type_disable",
};

function setSubmitButtonStatement(form, button, {inactiveButtonClass, ...rest}) {
  const isValid = form.checkValidity();
  if (!isValid) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
  }
}

function setRemoveSpanError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

function isValid(form, input, button, rest) {
  //**проверка валидности */
  if (input.validity.valid) {
    //**скрыть ошибку */
    setRemoveSpanError(input);
    //**валидация кнопки */
    setSubmitButtonStatement(form, button, rest);
  } else {
    //**показать ошибку */
    setRemoveSpanError(input);
    //**валидация кнопки */
    setSubmitButtonStatement(form, button, rest);
  }
}

function setInputListeners(form, inputSelector, {submitButtonSelector, ...rest}) {
  //**наложение обработчиков*/
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  const button = form.querySelector(submitButtonSelector);
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input, button, rest);
    });
  });
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
  // *запуск валидации */
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    setInputListeners(form, inputSelector, rest);
  });
}

enableValidation(obj);