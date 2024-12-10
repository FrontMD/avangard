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
        .toggleClass('active');
  });
  $('.new__price').on('click', function(){
    $('.packaging__modal-info').removeClass('active');
    $(this)
      .closest('.packaging__item')
      .find('.packaging__modal-price')
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

    //переключение табов в карточке товара
    $('.js-change-tab').click(function(event) {
        event.preventDefault();

        let target = $(this).data('target');

        $('.js-tab').hide();
        $('.js-tab-' + target).show();
    });

    // Переключение цвета авто
    const modelImg = document.querySelector('[data-js="modelImg"]')

    if(modelImg) {

        $('.color__item').click(function(event) {
            $('.color__item').removeClass('active');
            $(this).toggleClass('active');
        });
    
        $('.model__color-list').on('click', '[data-image]', function() {
            $('.model__img-inner').attr('src', this.dataset.image);
        });

        modelImg.querySelector('.model__color-list').addEventListener('click', e => {
            const {name} = e.target.dataset;
            if (name) {
                modelImg.querySelector('.model__color-des-inner').innerText = name;
            }
        });

        // Свайп на фото тачки
        let touchstartX = 0,
            touchendX = 0,
            slider = modelImg;
        
        // Начало касания
        slider.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
        });
        
        // Конец касания
        slider.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
    
            detectSwipeX();
        });
        
        // Обработка касания
        function detectSwipeX() {
            let container = $(slider);
    
            // left
            if (touchendX < touchstartX) {
                let next = container.find('.color__item.active').next();
    
                if(next.length === 0) {
                    container.find('.color__item').first().click();
                } else {
                    next.click();
                }
            }
    
            // right 
            if (touchendX > touchstartX) {
                let prev = container.find('.color__item.active').prev();
    
                if(prev.length === 0) {
                    container.find('.color__item').last().click();
                } else {
                    prev.click();
                }
            }
        }
    }

    // галерея в карточке товара
 
    if(document.querySelector(".swiper-gallery-1")) {

        var swiper = new Swiper(".swiper-gallery-2", {
            spaceBetween: 5,
            slidesPerView: 5,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                370: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                640: {
                    slidesPerView: 5,
                    spaceBetween: 40
                }
            }
        });

        var swiper2 = new Swiper(".swiper-gallery-1", {
            spaceBetween: 10,
            spaceBetween: 1,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
    
            thumbs: {
                swiper: swiper,
            },
        });
    }

    if(document.querySelector(".swiper-int-2")) {
        var swiper = new Swiper(".swiper-int-2", {
            spaceBetween: 5,
            slidesPerView: 5,
            freeMode: true,
            watchSlidesProgress: true,
            breakpoints: {
                370: {
                    slidesPerView: 3,
                    spaceBetween: 30
                },
                640: {
                    slidesPerView: 5,
                    spaceBetween: 40
                }
            }
        });

        var swiper2 = new Swiper(".swiper-int-1", {
            spaceBetween: 10,
            spaceBetween: 1,
            autoHeight: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
    
            thumbs: {
                swiper: swiper,
            },
        });
    }

    // спойлеры вопрос-ответ
    function spoilers() {
        const accordions = document.querySelectorAll("[data-js='accordion']");
    
        if(accordions.length < 1) return
    
        accordions.forEach(accordion => {
    
            let firstSpoiler = accordion.querySelector('[data-js="spoiler"]')
    
            if(firstSpoiler) {
                openSpoiler(firstSpoiler)
            }
    
            accordion.addEventListener('click', (e) => {
                let eventTarget = e.target
    
                if(eventTarget.closest('[data-js="spoiler"]')) {
                    let clickedSpoiler = eventTarget.closest('[data-js="spoiler"]')
    
                    if(clickedSpoiler.classList.contains('active')) {
                        return
                    }
    
                    let spoilers = accordion.querySelectorAll('[data-js="spoiler"]')
    
                    spoilers.forEach(spoiler => {
                        closeSpoiler(spoiler)
                    })
    
                    openSpoiler(clickedSpoiler)
                }
            })
        })
    
        function openSpoiler(spoiler) {
            const content = $(spoiler).find('[data-js="spoilerContent"]');
            spoiler.classList.add("active");
            $(content).slideDown(400);
        };
    
        function closeSpoiler(spoiler) {
            const content = $(spoiler).find('[data-js="spoilerContent"]');
            spoiler.classList.remove("active");
            $(content).slideUp(400);
        };
    }

    spoilers()

    // Всплывающая форма в комплектации - кредит    
    let modalComplectationCredit = $('#popup-complectation-credit'),
        btnOpenCreditModal = $('[data-target="#popup-complectation-credit"]');

    btnOpenCreditModal.click(function() {
        modalComplectationCredit.find('input[name="mark"]').val( $(this).data('mark') );
        modalComplectationCredit.find('input[name="model"]').val( $(this).data('model') );
        modalComplectationCredit.find('input[name="complectation"]').val( $(this).data('complectation') );
        modalComplectationCredit.find('input[name="price"]').val( $(this).data('price') );
        modalComplectationCredit.find('input[name="car"]').val( $(this).data('car') );
        modalComplectationCredit.find('input[name="brand_id"]').val( $(this).data('mark-id') );
        modalComplectationCredit.find('input[name="model_id"]').val( $(this).data('model-id') );

        modalComplectationCredit.find('.js-car-name').text( $(this).data('car') );
        modalComplectationCredit.find('.js-car-preview').attr( 'src', $(this).data('preview') );
    });
    

    // Расчет цены в комплектациях по чекбоксам 
    $('.js-check-credit, .js-check-tradein, .js-check-util').click(function() {
        parent = $(this).closest('.js-checked-table');

        var total = $(parent).data('price');

        parent.find(".checkbox").each(function(index) {
            if ($(this).is(':checked') === true) {
                total = total - parseInt($(this).val());
            }
        }); 

        $(parent).find('.js-inner-price').text(new Intl.NumberFormat('ru-RU').format(total) + "");
    });



});

// fancybox
$(document).ready(function() {
    $("a.gallery-prem-slide").fancybox();
 });

// Формы
document.addEventListener('DOMContentLoaded', () => {
    validation()
})


//Валидация форм
 function validation() {

    const forms = document.querySelectorAll('[data-validate]')

    if (!forms.length) return

    forms.forEach(form => {

        inputMasksInit(form);

        form.addEventListener('submit', event => {
            event.preventDefault()

            const inputFields = form.querySelectorAll('[data-js="formField"]');

            const dataReqexp = {
                space: /^(\s)+$/,
            }

            function error(el, isCheckbox = false) {
                return {
                    set: () => {
                        if(isCheckbox) {
                            el.querySelector('label').classList.add("has-error")
                        }
                        el.querySelector('input').classList.add("has-error")
                        el.classList.add("has-error")
                    },
                    remove: () => {
                        if(isCheckbox) {
                            el.querySelector('label').classList.remove("has-error")
                        }
                        el.querySelector('input').classList.remove("has-error")
                        el.classList.remove("has-error")
                        
                    },
                }
            }

            function validateInput(input) {
                const field = input.querySelector('input')

                if(!field) return

                const name = field.getAttribute('data-v-name');
                let valueField = field.value;
                let spaceTrigger = !valueField.match(dataReqexp.space);

                if (field.hasAttribute('required') && !field.hasAttribute('disabled')) {
                    if (valueField !== '' && spaceTrigger) {
                        switch (name) {
                            case 'phone':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 11) {
                                    error(input).remove()
                                } else {
                                    error(input).set()
                                }
                                break                              
                            case 'checkbox':
                                if (field.checked) {
                                    error(input, true).remove()
                                } else {
                                    error(input, true).set()
                                }
                                break                            
                            default:
                                if (valueField.length !== 0) {
                                    error(input).remove()
                                } else {
                                    error(input).set()
                                }
                        }
                    } else {
                        error(input).set()
                    }
                }
            }

            function checkFields() {
            
                inputFields.forEach(input => {
                    validateInput(input)
                })
            }

            function lifeValidate() {
                inputFields.forEach(input => {
                    input.addEventListener('click', () => {
                        if (form.getAttribute('data-validate')) {
                            const field = input.querySelector('input')

                            if(!field) return

                            field.addEventListener('input', () =>
                                validateInput(input),
                            )

                            checkFields()

                        }
                    })
                })
            }

            function validate() {
                let errors = 0

                inputFields.forEach(input => {
                    if (input.classList.contains('has-error')) {
                        errors += 1
                    }
                })

                // тут отправляем данные
                if (errors === 0) {
                    const formData = new FormData(form);
                    
                    form.reset();
                    $.fancybox.defaults.closeExisting = true;
                    $.fancybox.open({
                        src:'#success-popup'
                    });
                }
            }

            lifeValidate()
            checkFields()
            form.setAttribute('data-validate', 'true')

            validate()

        })
    })
}

function inputMasksInit(form) {

    const phones = form.querySelectorAll('input[data-type="phoneNumber"]');
    const letters = form.querySelectorAll('input[data-type="letters"]');

    if(phones.length > 0) {
        phones.forEach(phone => {
            Inputmask({
                'mask': '+7 (999) 999-99-99',
                'showMaskOnHover': false
            }).mask(phone); 
        })
    }

    if(letters.length > 0) {
        letters.forEach(letter => {
            letter.addEventListener('input', function(e){
                
                let val = e.target.value.replace(/[^А-Яа-яA-Za-z\s-]/g, "");
                this.value = val;
            })
        })
    }

}

