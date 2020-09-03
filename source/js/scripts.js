//Main-menu
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

//Form-Notification error
//var feedbackLink = document.querySelector(".feedback-show");
//var errorPopup = document.querySelector(".modal__error");
//var errorClose = errorPopup.querySelector(".modal-close");

//Form-Notification success
