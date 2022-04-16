class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
  }

  //установка состояния кнопки
  _setSubmitButtonStatement() {
    this._isValidForm = this._form.checkValidity();
    this._button = this._form.querySelector(this._data.submitButtonSelector)
    if (!this._isValidForm) {
      this._button.classList.add(this._data.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._data.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  //установка текста ошибки
  _setRemoveSpanError(inputElement) {
    this._span = this._form.querySelector(`#${inputElement.id}-error`);
    this._span.textContent = inputElement.validationMessage;
  }
  
  //проверка валидности
  _isValid(inputElement) {
    if (inputElement.validity.valid) {
      //скрыть ошибку
      this._setRemoveSpanError(inputElement);
      //валидация кнопки
      this._setSubmitButtonStatement();
      inputElement.classList.remove(this._data.inputErrorClass);
    } else {
      //показать ошибку
      this._setRemoveSpanError(inputElement);
      //валидация кнопки
      this._setSubmitButtonStatement();
      inputElement.classList.add(this._data.inputErrorClass);
    }
  }
  
  //запуск валидации
  enableValidation() {
    this._inputLists = Array.from(this._form.querySelectorAll(this._data.inputSelector));
    //еще нужно проверить и установить состояние кнопки при вызове
    this._setSubmitButtonStatement();
    //на каждый инпут устанавливаю проверку формы
    this._inputLists.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
      });
    });
  }
}

export {FormValidator}