const obj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  errorSpanClass: "popup__input-error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_type_disable",
};

function setSubmitButtonStatement(form) {
  const button = form.querySelector(".popup__button");
  const isValid = form.checkValidity();
  if (!isValid) {
    button.classList.add("popup__button_type_disable");
    button.setAttribute("disabled", "true");
  } else {
    button.classList.remove("popup__button_type_disable");
    button.removeAttribute("disabled");
  }
}

function setRemoveSpanError(input) {
  const span = document.querySelector(`#${input.id}-error`);
  span.textContent = input.validationMessage;
}

function isValid(form, input) {
  //**проверка валидности */
  if (input.validity.valid) {
    //**скрыть ошибку */
    setRemoveSpanError(input);
    //**валидация кнопки */
    setSubmitButtonStatement(form);
  } else {
    //**показать ошибку */
    setRemoveSpanError(input);
    //**валидация кнопки */
    setSubmitButtonStatement(form);
  }
}

function setInputListeners(form, inputSelector) {
  //**наложение обработчиков*/
  const inputs = Array.from(form.querySelectorAll(inputSelector));
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      isValid(form, input);
    });
  });
}

function enableValidation({ formSelector, inputSelector, ...rest }) {
  // *запуск валидации */
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((form) => {
    setInputListeners(form, inputSelector);
  });
}

enableValidation(obj);