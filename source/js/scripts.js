//Form-Notifications

var feedbackForm = document.querySelector(".feedback-form");
var formName = feedbackForm.querySelector("[name=user]");
var formSurname = feedbackForm.querySelector("[name=surname]");
var formEmail = feedbackForm.querySelector("[name=email]");
var formTel = feedbackForm.querySelector("[name=tel]");
var mistakePopup = document.querySelector(".modal-mistake");
var successPopup = document.querySelector(".modal-success");

function inputValid (formTel, formEmail) {
  if (!formName.value || !formSurname.value || !formEmail.value || !formTel.value) {
    return false;
  } else {
    return true;
  }
};

feedbackForm.addEventListener("submit", function (evt) {
  if (!inputValid(formTel, formEmail)) {
    evt.preventDefault();
    mistakePopup.classList.add("modal__show");
    formTel.classList.add("error");
    formEmail.classList.add("error");
    formName.classList.add("error");
    formSurname.classList.add("error");


  } else {
    mistakePopup.classList.remove("modal__show");
    successPopup.classList.add("modal__show");
  }
  evt.preventDefault();
});

// Close mistake pop-up


var mistakeClose = mistakePopup.querySelector(".modal-close");

mistakeClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mistakePopup.classList.remove("modal__show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mistakePopup.classList.contains("modal__show")) {
      evt.preventDefault();
      mistakePopup.classList.remove("modal__show");
    }
  }
});

// Close success pop-up
var successClose = successPopup.querySelector(".modal-close");

successClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  successPopup.classList.remove("modal__show");
  window.location.reload()
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (successPopup.classList.contains("modal__show")) {
      evt.preventDefault();
      successPopup.classList.remove("modal__show");
      window.location.reload()
    }
  }
});
