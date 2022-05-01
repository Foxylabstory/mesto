class FormValidator {
  constructor(data, form) {
    this._data = data;
    this._form = form;
    this._button = this._form.querySelector(this._data.submitButtonSelector);
    this._inputLists = Array.from(this._form.querySelectorAll(this._data.inputSelector));
  }

  //установка состояния кнопки
  _setSubmitButtonStatement() {
    this._isValidForm = this._form.checkValidity();
    
    if (!this._isValidForm) {
      this._button.classList.add(this._data.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._data.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  //установка текста ошибки
  _setSpanError(inputElement) {
    this._span = this._form.querySelector(`#${inputElement.id}-error`);
    this._span.textContent = inputElement.validationMessage;
  }

  //удаление текста ошибки
  _removeSpanError(inputElement) {
    this._span = this._form.querySelector(`#${inputElement.id}-error`);
    this._span.textContent = '';
  }

  _removeInputErrorClass(inputElement) {
    inputElement.classList.remove(this._data.inputErrorClass);
  }
  
  //проверка валидности
  _isValid(inputElement) {
    if (inputElement.validity.valid) {
      //скрыть ошибку
      this._setSpanError(inputElement);
      //валидация кнопки
      this._setSubmitButtonStatement();
      this._removeInputErrorClass(inputElement);
    } else {
      //показать ошибку
      this._setSpanError(inputElement);
      //валидация кнопки
      this._setSubmitButtonStatement();
      inputElement.classList.add(this._data.inputErrorClass);
    }
  }
  
  //публичный метод для сброса ошибок
  resetValidation() {
    this._setSubmitButtonStatement();
    this._inputLists.forEach((inputElement) => {
      this._removeSpanError(inputElement);
      this._removeInputErrorClass(inputElement);
    });
  }
  
  //запуск валидации
  enableValidation() {
    
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