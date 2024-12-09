let application = {
    // Инициализация
    init: function(params) {
        this.params = params;

        this.popupsInit();
        this.popupsEventsInit();

        this.mobileBottomNumber();
    },

    // Страницы сайта
    pages: {
    

        // Страница модели
        pageModel: function() {
            let self = this;
        
            // Процентная ставка
            this.percentRate = application.params.percentRate;
        
            // Инициализация
            this.init = function() {
                this.complectationCompare();

                this.calculatePriceForComplectation();
        
                this.modalComplectationCredit();
                
                this.modalComplectationOrder();

                this.testSwipe();

                this.tabs();
            }

            // Перключение табов
            this.tabs = function() {
                $('.js-change-tab').click(function(event) {
                    event.preventDefault();

                    let target = $(this).data('target');

                    $('.js-tab').hide();
                    $('.js-tab-' + target).show();
                });
            }
        
            // Всплывающая форма в комплектации - кредит
            this.modalComplectationCredit = function() {
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
            }
        
            // Расчет цены в комплектациях по чекбоксам
            this.calculatePriceForComplectation = function() {
                $('.js-check-credit, .js-check-tradein, .js-check-util').click(function() {
                    parent = $(this).closest('.js-checked-table');
            
                    var total = $(parent).data('price');
            
                    parent.find(".checkbox").each(function(index) {
                        if ($(this).is(':checked') === true) {
                            total = total - parseInt($(this).val());
                        }
                    }); 
            
                    $(parent).find('.js-inner-price').text(tortik.pf(total + ""));
                });
            }
        
            // Сравнение комплектаций
            this.complectationCompare = function() {
                let btnCompareComplectation = $('.js-btn-compare-complectation'),
                    compareCheckbox = $('.js-compare-checkbox');
        
                btnCompareComplectation.click(function(event) {
                    let isOnceChecked = false, 
                        form = '';

                    form += '<form id="compare-form" action="/auto/compare" method="post" style="display:none;">';
                        form += '<input type="hidden" name="_token" value="' + $('meta[name="csrf-token"]').attr('content') + '" />';

                        compareCheckbox.each(function() {
                            if(this.checked) {
                                form += '<input checked type="checkbox" value="' + $(this).val() + '" name="complectation_id[]" />';

                                isOnceChecked = true;
                            }
                        });
            
                        if(!isOnceChecked) {
                            alert('Выберите комплектацию');
                
                            event.preventDefault();
                            return; 
                        }

                    form += '</form>';

                    $(document.body).append(form);
                    $('#compare-form').submit();
                });
            }

            // Свайп на фото тачки
            this.testSwipe = function() {
                let touchstartX = 0,
                    touchendX = 0,
                    slider = document.getElementsByClassName('model__img');
                
                // Начало касания
                slider[0].addEventListener('touchstart', function(event) {
                    touchstartX = event.changedTouches[0].screenX;
                });
                
                // Конец касания
                slider[0].addEventListener('touchend', function(event) {
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
            },
        
            this.init();
        },

        // Страница кредита
        pageCredit: function() {
            let form = $('.js-form-credit-page'),
                sliderInitialPaymentInstance;

            this.init = function() {
                this.initCreditPage();
                this.initCreditPageInitialPaymentSlider(0, 1500000);
            }

            this.initCreditPage = function() {
                let changeCreditTermCheckbox = $(form).find('.tradein__form-check-item');
            
                form.tortikForm({
                    changeMark: '.js-change-mark',
                    changeModel: '.js-change-model',
                    changeComplectation: '.js-change-price',
            
                    changeInitialPayment: '.js-change-intial-payment',
                    changeCreditTerm: '.js-change-credit-term',
                    
                    textCarMark: '.js-car-mark',
                    textCarName: '.js-car-name',
                    textCarPrice: '.js-car-price',
                    textCarBenefit: '.js-car-benefit',
                    textMountPayment: '.js-mount-payment',
                    textCreditTerm: '.js-credit-term',
            
                    imgCarPreview: '.js-car-preview',
        
                    emptyPreview: '/assets/images/tradein-price-img.png',
            
                    autoSelectFirstComplectation: true,
                        
                    credit: {
                        percentRate: application.params.percentRate,
                        creditTerm: 84,
                        initialPayment: 0
                    },

                    onChangeComplectaion: function(credit) {
                        sliderInitialPaymentInstance.update({
                            from: 0,
                            max: parseInt(credit.cost * 0.7)
                        });
                    }
                });

                // Чекбоксы с сроком кредита
                changeCreditTermCheckbox.click(function() {
                    changeCreditTermCheckbox.removeClass('active');
                    $(this).addClass('active');

                    let mount = parseInt( $(this).data('mount') );

                    form.externalChangeCreditTerm(mount);
                });
            }

            // Инициализация слайдера первоначального взноса
            this.initCreditPageInitialPaymentSlider = function(min, max) {
                var $range = $(".js-range-slider"),
                    $input = $(".js-input");
        
                $range.ionRangeSlider({
                    min: min,
                    max: max,
                    from: 0,
                    postfix: "₽",
                    step: 10000,

                    onStart: function(data) {
                        $input.prop("value", tortik.pf(data.from) + '₽');
                    },

                    onUpdate: function (data) {
                        $input.prop("value", tortik.pf(data.from) + '₽');
                    },

                    onChange: function(data) {
                        let initialPaymentCost = data.from,
                            carCost = form.credit.cost;

                            $input.prop("value", tortik.pf(data.from) + '₽');

                        if(carCost !== null) {
                            form.externalChangeInitialPayment( initialPaymentCost / (carCost / 100) );
                        }
                    }
                });
            
                sliderInitialPaymentInstance = $range.data("ionRangeSlider");
            
                $input.on("change keyup", function() {
                    var val = $(this).prop("value");
            
                    // validate
                    if (val < min) {
                        val = min;
                    } else if (val > max) {
                        val = max;
                    }
            
                    sliderInitialPaymentInstance.update({
                        from: val
                    });
                });
            }

            this.init();
        },

        // Страница tradein
        pageTradein: function() {
            let form = $('.js-form-tradein-page');
            
            form.tortikForm({
                changeMark: '.js-change-mark',
                changeModel: '.js-change-model',
                changeComplectation: '.js-change-price',
                
                textCarPrice: '.js-car-price',
                textMountPayment: '.js-mount-payment',
        
                imgCarPreview: '.js-car-preview',
    
                emptyPreview: '/assets/images/tradein-price-img.png',
        
                autoSelectFirstComplectation: true,
                    
                credit: {
                    percentRate: application.params.percentRate,
                    creditTerm: 84,
                    initialPayment: 0
                }
            });
        },
    },
}