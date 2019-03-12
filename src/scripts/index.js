/**Слайдер для отзывов **/

$('.reviews_list').slick({
  dots: false,
  infinite: true,
  speed: 1300,
  slidesToShow: 3,
  slidesToScroll: 3,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [{
      breakpoint: 1000,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 700,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


/**Слайдер для галлереи **/
$('.about-gallery_wrap').slick({
  dots: false,
  infinite: true,
  speed: 1300,
  slidesToShow: 5,
  slidesToScroll: 2,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [{
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,

      }
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        centerMode: true,
        centerPadding: '40px',
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '40px',
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});


/*/** Кастом скрол для услуг**/
/*(function ($) {
  $(window).on("load", function () {
    $(".services_list").mCustomScrollbar({
      axis: "x",
      theme: "dark-3"
    });
  });
})(jQuery);*/

/**Кастом скрол для попапа услуги **/
(function ($) {
  $(window).on("load", function () {
    $(".service-popup_content-right").mCustomScrollbar({
      axis: "y",
      theme: "dark-3"
    });
  });
})(jQuery);


/**Аккордеон часто задаваемые вопросы **/

const faqItem = document.querySelectorAll('.faq_item');

faqItem[0].classList.add('faq_item--active');

for (let i = 0; i < faqItem.length; i++) {
  faqItem[i].addEventListener('click', function () {
    for (let i = 0; i < faqItem.length; i++) {
      faqItem[i].classList.remove('faq_item--active');
    }
    faqItem[i].classList.add('faq_item--active');
  })
}


/**Плавный скрол на меню **/

$(".nav_item-link").on("click", function (event) {
  //отменяем стандартную обработку нажатия по ссылке
  event.preventDefault();
  //забираем идентификатор бока с атрибута href
  var id = $(this).attr('href'),
    //узнаем высоту от начала страницы до блока на который ссылается якорь
    top = $(id).offset().top
  //анимируем переход на расстояние - top за 500 мс
  $('body,html').animate({
    scrollTop: top - 100
  }, 1200);
});


/**Плавный скрол на контакты**/

$(".link-contact").on("click", function (event) {
  //отменяем стандартную обработку нажатия по ссылке
  event.preventDefault();
  //забираем идентификатор бока с атрибута href
  var id = $(this).attr('href'),
    //узнаем высоту от начала страницы до блока на который ссылается якорь
    top = $(id).offset().top
  //анимируем переход на расстояние - top за 500 мс
  $('body,html').animate({
    scrollTop: top
  }, 1200);
});


/**Фиксирование меню при скроле **/
const avatarElem = document.querySelector('.nav');

var avatarSourceBottom = avatarElem.getBoundingClientRect().bottom + window.pageYOffset;

window.onscroll = function () {
  if (avatarElem.classList.contains('nav--fixed') && window.pageYOffset < avatarSourceBottom) {
    avatarElem.classList.remove('nav--fixed');
  } else if (window.pageYOffset > avatarSourceBottom) {
    avatarElem.classList.add('nav--fixed');
  }
};


/**Вызов формы обратной связи **/

const formBtnCall = document.querySelectorAll('.form-call');
const formPopup = document.querySelector('.popup-form');

for (let i = 0; i < formBtnCall.length; i++) {
  formBtnCall[i].addEventListener('click', function (e) {
    e.preventDefault();
    formPopup.classList.add('popup-form--active');
  })
}

formPopup.addEventListener('click', function (event) {
  if (event.target == formPopup) {
    formPopup.classList.remove('popup-form--active');
  }
})


/** Вызов попапа услуги **/

const servicesBtnOpen = document.querySelectorAll('.services-btn');
const servicesItemLinks = document.querySelectorAll('.services_item-wrap');
const servicesPopupClose = document.querySelector('.service-popup_btn');
const servicesPopup = document.querySelector('.service-popup');
const servicePopupCross = document.querySelector('.service-popup_cross');

for (let i = 0; i < servicesBtnOpen.length; i++) {
  servicesBtnOpen[i].addEventListener('click', function (e) {
    e.preventDefault();
    servicesPopup.classList.add('service-popup--active');
  });

  servicesItemLinks[i].addEventListener('click', function (e) {
    e.preventDefault();
    servicesPopup.classList.add('service-popup--active');
  });
}

servicesPopupClose.addEventListener('click', function (e) {
  e.preventDefault();
  servicesPopup.classList.remove('service-popup--active');

});

servicePopupCross.addEventListener('click', function () {
  servicesPopup.classList.remove('service-popup--active');

})


/**Переключение табов в контактах **/

const contactTabs = document.querySelectorAll('.contact_tabs-btn');

contactTabs[0].classList.add('contact_tabs-btn--active');

for (let i = 0; i < contactTabs.length; i++) {
  contactTabs[i].addEventListener('click', function (e) {
    e.preventDefault();
    for (let i = 0; i < contactTabs.length; i++) {
      contactTabs[i].classList.remove('contact_tabs-btn--active');
    }
    contactTabs[i].classList.add('contact_tabs-btn--active');
  })
}


/**Раскрытие мобильного меню **/

const burgerBtn = document.querySelector('.ham');
const mobileMenu = document.querySelector('.mobile-menu');

burgerBtn.addEventListener('click', function () {
  mobileMenu.classList.toggle('mobile-menu--active');
});

/**Закрывание меню при переходам по ссылкам меню**/

const menuLinks = document.querySelectorAll('.nav_item-link-mobile');

for (let i = 0; i < menuLinks.length; i++) {
  menuLinks[i].addEventListener('click', function () {
    mobileMenu.classList.toggle('mobile-menu--active');
    burgerBtn.classList.toggle('active');
  })
}


/**Кастом google map **/

const readyMap = function () {
  const mapImg = document.querySelectorAll('#map img');

  for (let i = 0; i < contactTabs.length; i++) {
    mapImg[1].classList.add('map-marker');
    contactTabs[i].addEventListener('click', function () {
      for (let i = 0; i < contactTabs.length; i++) {
        mapImg[i].classList.add('map-marker');
      }
      mapImg[i].classList.remove('map-marker');
    })
  }
};


const mapTimer = function () {
  setTimeout(readyMap, 2000);
};


document.addEventListener("DOMContentLoaded", mapTimer);




/**Обработчик формы**/
$('#form').on('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  var form = $(e.target),
    data = form.serialize(),
    url = form.attr('action');

  var request = $.ajax({
    type: 'POST',
    url: url,
    data: data
  });

  let formPopupSuccess = document.querySelector('.popup-form_success');
  let formPopup = document.querySelector('.popup-form');

  const closeForm = function () {
    formPopupSuccess.classList.remove('popup-form_success--active');
    formPopup.classList.remove('popup-form--active');
  }

  request.done(function (msg) {
    formPopupSuccess.classList.add('popup-form_success--active');
    setTimeout(closeForm, 1800);
    $("form")[0].reset();
  });

  request.fail(function (jqXHR, textStatus) {
    formPopupSuccess.classList.add('popup-form_success--active');
    setTimeout(closeForm, 1800);
    $("form")[0].reset();
  })
};

/*********************************** */
$('#form-second').on('submit', submitFormSecond);

function submitFormSecond(e) {
  e.preventDefault();

  var form = $(e.target),
    data = form.serialize(),
    url = form.attr('action');

  var request = $.ajax({
    type: 'POST',
    url: url,
    data: data
  });



  request.done(function (msg) {
    $('#form-second')[0].reset();
  });

  request.fail(function (jqXHR, textStatus) {
    $('#form-second')[0].reset();
  })
};



/*const closeFormPopup = function () {
    let formPopup = document.querySelector('.form-popup');
    let closeBtn = document.querySelector('.close-btn');
formPopup.classList.remove('popup-form--active');
    closeBtn.addEventListener('click', function (e) {
        e.preventDefault();

        formPopup.classList.remove('form-popup-active');
        $("form")[0].reset();
    })
};
closeFormPopup();*/