// intro slider
$(document).ready(function() {
    const swiper = new Swiper('.swiper-intro', {
    loop: true,
    autoplay: {
        delay: 10000,
    },
    });
})

// select2
$(document).ready(function() {
    $('.js-example-basic-single').select2({
        width: '100%',
    });
})

// tabs gallery
$(function() {
	var tab = $('#tabs .gallery__inner-content > div'); 
	tab.hide().filter(':first').show(); 
	
	// Клики по вкладкам.
	$('#tabs .gallery__inner-nav a').click(function(){
		tab.hide(); 
		tab.filter(this.hash).show(); 
		$('#tabs .gallery__inner-nav-inner a').removeClass('active');
		$(this).addClass('active');
		return false;
	}).filter(':first').click();
});

// headerBurger
$(document).ready(function () {
    $('.header__burger').click(function(event) {
      $('.header__burger').toggleClass('active');
      $('.header__mobil-navigation').toggleClass('active');
      $('body').toggleClass('active');
   });
  });

// packagingModal
$(document).ready(function() {
    $('.packaging__name').on('click', function(){
      $('.packaging__modal-price').removeClass('active');
      $(this)
        .closest('.packaging__item')
        .find('.packaging__modal-info')
        // .toggleClass('active');
        .toggleClass('active');
  });
  $('.new__price').on('click', function(){
    $('.packaging__modal-info').removeClass('active');
    $(this)
      .closest('.packaging__item')
      .find('.packaging__modal-price')
      // .toggleClass('active');
      .toggleClass('active');
  });
});

$(document).ready(function() {
   $('#model__list-btn').click(function(event) {
       $('.header__model-list').toggleClass('actve-modal-list');
       $('.header__model-list-content').toggleClass('active');
       $('body').toggleClass('active');
   });
   $('.header__model-list').click(function(event){
       $('.header__model-list').removeClass('actve-modal-list');
       $('.header__model-list-content').removeClass('active');
       $('body').removeClass('active');
   });
})

$(document).ready(function() {
   $('.page__name').click(function(event) {
       $('.header__model-list').toggleClass('actve-modal-list');
       $('.header__model-list-content').toggleClass('active');
       $('body').addClass('active');
   });
   $('.header__model-list').click(function(event){
       $('.header__model-list').removeClass('actve-modal-list');
       $('.header__model-list-content').removeClass('active');
       $('body').removeClass('active');
   });
})

$(document).ready(function(){
    
    // Questions
    /*$('.questions__item').justweAccordion({
        slideAnimation: true,
    });*/

    // Кнопка "Поробнее в акциях"
    $('.js-stock-btn').click(function(event) {
        event.preventDefault();

        $(this).parents('.stock__item').find('.stock__item-form').toggleClass('active');
    });

    // События для попапов
    $('.js-open-modal').click(function(event) {
        event.preventDefault();

        let target = $(this).data('target');

        $.fancybox.open({
            src: target
        });
    });

});

// fancybox
$(document).ready(function() {
    $("a.gallery-prem-slide").fancybox();
 });

