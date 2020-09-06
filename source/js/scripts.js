//Main-menu
var navMain = document.querySelector(".main-nav");
var navToggle = document.querySelector(".main-nav__toggle");


navMain.classList.remove("main-nav--nojs");

navToggle.addEventListener("click", function () {
  if (navMain.classList.contains("main-nav--closed")) {
    navMain.classList.remove("main-nav--closed");
    navMain.classList.add("main-nav--opened");
    navMain.classList.add("main-nav--test");


  } else {
    navMain.classList.add("main-nav--closed");
    navMain.classList.remove("main-nav--opened");
    navMain.classList.remove("main-nav--test");
  }
});

//Form-Notifications

var feedbackForm = document.querySelector(".feedback-form");
var formName = feedbackForm.querySelector("[name=user]");
var formSurname = feedbackForm.querySelector("[name=surname]");
var formEmail = feedbackForm.querySelector("[name=email]");
var formTel = feedbackForm.querySelector("[name=tel]");
var formInputs = feedbackForm.querySelectorAll("input[data-rule]");


feedbackForm.addEventListener("submit", function (evt) {
  if (!formName.value || !formSurname.value || !formEmail.value || !formTel.value) {
    mistakePopup.classList.add("modal-show");
  } else {
    mistakePopup.classList.remove("modal-show");
    successPopup.classList.add("modal-show");
  }
  evt.preventDefault();
});

//попытка добавить тени на незаполненые инпуты
/*for (let formInput of formInputs) {

  var checkinput = formInput.value;
  if (checkinput.length == 0) {
    formInput.classList.add("error");
  }
};*/
// Close mistake pop-up

var mistakePopup = document.querySelector(".modal__mistake");
var mistakeClose = mistakePopup.querySelector(".modal-close");

mistakeClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mistakePopup.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (mistakePopup.classList.contains("modal-show")) {
      evt.preventDefault();
      mistakePopup.classList.remove("modal-show");
    }
  }
});

// Close success pop-up
var successPopup = document.querySelector(".modal__success");
var successClose = successPopup.querySelector(".modal-close");

successClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  successPopup.classList.remove("modal-show");
  window.location.reload()
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (successPopup.classList.contains("modal-show")) {
      evt.preventDefault();
      successPopup.classList.remove("modal-show");
      window.location.reload()
    }
  }
});

//Map

function initMap() {
  var myLatLng = { lat: 34.8544438, lng: 111.8301578 };

  var map = new google.maps.Map(document.getElementById("map"), {
    disableDefaultUI: true,
    center: myLatLng
  });
}
