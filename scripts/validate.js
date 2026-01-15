function showInputError(input, errorMessage, config) {
  console.log("Error en:", input.name, errorMessage);

  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
  input.classList.add(config.inputErrorClass);
}

function hideInputError(input, config) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
  input.classList.remove(config.inputErrorClass);
}

function checkInputValidity(input, config) {
  if (input.validity.valid) {
    hideInputError(input, config);
  } else {
    showInputError(input, input.validationMessage, config);
  }
}

function isFormValid(inputList) {
  return inputList.some((input) => !input.validity.valid);
}

function toggleButtonState(inputList, buttonElement, config) {
  if (isFormValid(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function setEventListeners(form, config) {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const buttonElement = form.querySelector(
    `${config.submitButtonSelector}[type="submit"]`
  );

  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((form) => {
    setEventListeners(form, config);
  });
}
