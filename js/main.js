/*$(document).ready(function() {
    $('#stock-btn-1').click(function(event) {
        $('#stock__item-form-1').toggleClass('active');
    });
    $('#stock-btn-2').click(function(event) {
        $('#stock__item-form-2').toggleClass('active');
    });
    $('#stock-btn-3').click(function(event) {
        $('#stock__item-form-3').toggleClass('active');
    });
    $('#stock-btn-4').click(function(event) {
        $('#stock__item-form-4').toggleClass('active');
    });
 })*/

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


// tabs
$(function() {
	var tab = $('#tabs .tabs-items > div'); 
	tab.hide().filter(':first').show(); 
	
	// Клики по вкладкам.
	$('#tabs .special__tabs-nav a').click(function(){
		tab.hide(); 
		tab.filter(this.hash).show(); 
		$('#tabs .special__tabs-nav-inner a').removeClass('active');
		$(this).addClass('active');
		return false;
	}).filter(':first').click();
});

// tabs questions
$(function() {
	var tab = $('#tabs .special__questions-content > div'); 
	tab.hide().filter(':first').show(); 
	
	// Клики по вкладкам.
	$('#tabs .special__questions-nav a').click(function(){
		tab.hide(); 
		tab.filter(this.hash).show(); 
		$('#tabs .special__questions-nav-inner a').removeClass('active');
		$(this).addClass('active');
		return false;
	}).filter(':first').click();
});

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



//popup
$(document).ready(function() {
    $('#btn__popup, #btn__popup1').click(function(){
       $.fancybox.open({
          src: '#popup',
          type: 'inline'
       });
    });
 })

 

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



 $(document).ready(function() {
    $('#stock-btn-1').click(function(event) {
        $('#stock__item-form-1').toggleClass('active');
    });
    $('#stock-btn-2').click(function(event) {
        $('#stock__item-form-2').toggleClass('active');
    });
    $('#stock-btn-3').click(function(event) {
        $('#stock__item-form-3').toggleClass('active');
    });
    $('#stock-btn-4').click(function(event) {
        $('#stock__item-form-4').toggleClass('active');
    });
 })

 $(document).ready(function() {
    $('.intro__list-btn').click(function(event) {
        $('.intro__list-btn').toggleClass('active');
        $('.intro__list ul').toggleClass('active');
    });
 })


$(document).ready(function(){
    $(window).scroll(function(){
        $('.mobile-fixed-number').toggleClass('active', $(this).scrollTop() > 200);
    });
    $(window).scroll(function() {
        if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $('.mobile-fixed-number').removeClass('active');
        }
     });

    // Quiz banner
    $(function () {
        let $banner = $('.bottom-quiz-banner'),
            $bannerClose = $('.bottom-quiz-banner__close');

        $(window).scroll(function () {
            let $this = $(this);

            if ($this.scrollTop() > 100) {
                $banner.addClass('--show')
            } else {
                $banner.removeClass('--show')
            }
        });

        $bannerClose.on('click', function (e) {
            e.preventDefault()

            $banner.addClass('--closed')
        })
    })

    // Questions
    /*$('.questions__item').justweAccordion({
        slideAnimation: true,
    });*/

    // Main catalog items gallery
    const catalogCardGallery = new Swiper('.catalog-item-carousel', {
        pagination: {
            el: '.swiper-pagination',
        },
        on: {
            afterInit: function (swiper) {
                if ($(window).width() > 992) {
                    let $paginationItems = $(swiper.el).find('span.swiper-pagination-bullet')

                    $paginationItems.on('mouseenter', (e) => {
                        swiper.slideTo($paginationItems.index(e.currentTarget), 0)
                    })
                }
            }
        }
    });
});

// fancybox
$(document).ready(function() {
    $("a.gallery-prem-slide").fancybox();
    $(".mySwiper2 a.special__car-slide").fancybox();
 });

