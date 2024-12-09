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
        // Главная страница
        pageIndex: function() {
            let filter = $('.js-main-filter');

            filter.tortikFilter({
                сhangeType: '.js-filter-change-type',
                changeGearbox: '.js-filter-change-gearbox',
                changeDrive: '.js-filter-change-drive',
        
                btn: '.js-filter-btn'
            });
        },

        // Страница акций
        pageStock: function() {
            // Кнопка "Поробнее в акциях"
            $('.js-stock-btn').click(function(event) {
                event.preventDefault();

                $(this).parents('.stock__item').find('.stock__item-form').toggleClass('active');
            });
        },

        // Страница списка спецпредложений
        pageSpecials: function() {
            // Инициализация
            this.init = function() {
                this.specialFilter();
            }

            // Фильтр на спецах
            this.specialFilter = function() {
                let filter = {},
                    filterData = {},
                    form = $('.js-special-form'),
                    changeMark = $(form).find('.js-special-change-mark'),
                    changeModel = $(form).find('.js-special-change-model'),
                    changeGearbox = $(form).find('.js-special-gearbox-change'),
                    changePriceTo = $(form).find('.js-special-price-to'),

                    btn = $(form).find('.js-special-btn')
                    
                    queryString = {};

                // Получаем данные из запроса
                location.search.substr(1).split("&").forEach(function(item) {queryString[item.split("=")[0]] = item.split("=")[1]});

                // Закодировать строку запроса
                function encodeQueryData(data) {
                    let ret = [];

                    for (var d in data) { ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d])); }
                        
                    return ret.join('&');
                }

                // Подсчет кол-ва спецпредложений
                function countSpecial() {
                    $(btn).attr('disabled', true);

                    $.ajax({
                        url: '/car/countAssortment?' + encodeQueryData(filter),
                        method: 'GET',

                        success: function(data) {
                            let count = parseInt(data.trim());

                            if(count === 0) {
                                $(btn).text('Автомобили не найдены').attr('disabled', true);
                            } else {
                                $(btn).text('Показать авто').attr('disabled', false);
                            }
                        }
                    });
                }

                // Отправка формы (чистим пустые поля)
                form.submit(function() {
                    $(':input', this).each(function() { this.disabled = !($(this).val()); });
                    $('select', this).each(function() { if($(this).val() == '0') { this.disabled = true; } });
                });

                // Изменение марки
                changeMark.change(function() {
                    delete filter['mark_id'];

                    changeModel.html('<option value="0" selected>Модель</option>');

                    filter['mark_id'] = $(this).val();
            
                    $.ajax({
                        url: '/car/assortment/model/' + filter['mark_id'],
                        method: 'POST',

                        beforeSend: function() {
                            countSpecial();
                        },
            
                        success: function(data) {
                            filterData = {};

                            for(let key in data) {
                                changeModel.append(
                                    $('<option>', { value : data[key].id }).text(data[key].name)
                                );
            
                                filterData[ data[key].id ] = data[key];
                            }        

                            // Если есть ID модели, то подставим
                            if(queryString['body_id'] !== undefined) { changeModel.val(queryString['body_id']).change(); delete queryString['body_id']; }
                        }
                    })

                    console.log(filter);
                });

                // Изменение модели
                changeModel.change(function() {
                    delete filter['body_id'];

                    let value = $(this).val();

                    if(value !== '' && value !== '0' && value !== 0) { 
                        filter['body_id'] = value; 
                    }

                    countSpecial();

                    console.log(filter);
                });


                // Изменение коробки передач
                changeGearbox.change(function() {
                    delete filter['gearbox'];

                    let value = $(this).val();

                    if(value !== '' && value !== '0' && value !== 0) { 
                        filter['gearbox'] = value; 
                    }

                    countSpecial();

                    console.log(filter);
                });

                // Изменение "Цены до"
                changePriceTo.keyup(function() {
                    delete filter['price_to'];

                    let value = $(this).val();

                    if(value !== '' && value !== '0' && value !== 0) { 
                        filter['price_to'] = value; 
                    }

                    countSpecial();

                    console.log(filter);
                });

                // Инициализация
                (function() {
                    if(queryString['mark_id'] !== undefined) { changeMark.val(queryString['mark_id']).change(); }
                    if(queryString['gearbox'] !== undefined) { changeGearbox.val(decodeURI(queryString['gearbox'])).change(); }
                    if(queryString['price_to'] !== undefined) { changePriceTo.val(queryString['price_to']).change(); }
                })();
            }

            this.init();
        },

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

            // Всплывающая форма в комплектации - кредит
            this.modalComplectationOrder = function() {
                let modalComplectationOrder = $('#popup-complectation-order'),
                    btnOpenOrderModal = $('[data-target="#popup-complectation-order"]');
        
                btnOpenOrderModal.click(function() {
                    modalComplectationOrder.find('input[name="mark"]').val( $(this).data('mark') );
                    modalComplectationOrder.find('input[name="model"]').val( $(this).data('model') );
                    modalComplectationOrder.find('input[name="complectation"]').val( $(this).data('complectation') );
                    modalComplectationOrder.find('input[name="price"]').val( $(this).data('price') );
                    modalComplectationOrder.find('input[name="car"]').val( $(this).data('car') );

                    modalComplectationOrder.find('input[name="brand_id"]').val( $(this).data('mark-id') );
                    modalComplectationOrder.find('input[name="model_id"]').val( $(this).data('model-id') );

                    modalComplectationOrder.find('.js-car-benefit').text( tortik.pf($(this).data('sale')) );
                    modalComplectationOrder.find('.js-car-name').text( $(this).data('car') );
                    modalComplectationOrder.find('.js-car-preview').attr( 'src', $(this).data('preview') );
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

        // Страница спецпредложения
        pageSpecial: function() {
            let textMountPayment = $('.js-calculate-credit-mount-payment'),
                rangeInitialPaymentInstance,
                rangeTermInstance;

            // Инициализация
            this.init = function() {
                this.calculateDiscount();

                this.calculateCreditForm();

                this.modalComplectationCredit();
                this.modalComplectationTradein();
            }

            // Форма: "Рассчитать кредит"
            this.calculateCreditForm = function() {
                // Расчет ежемесячного платежа
                let calculateMountPayment = function() {
                    let price = $('.js-assortment-price').data('price'),
                        initialPayment = parseInt(rangeInitialPaymentInstance.result.from),
                        term = 6;

                    // Вычислим кол-во месяцев
                    if(rangeTermInstance.result.from >= 1) { term = rangeTermInstance.result.from * 12; }

                    textMountPayment.text(tortik.pf(tortik.getMountPayment(price, application.params.percentRate, term, initialPayment / price)));
                };

                // Слайдер с первоначальным взносом
                (function() {
                    let price = $('.js-assortment-price').data('price'),
                        rangeInitialPayment = $('.js-calculate-credit-initial-payment-range'),
                        inputInitialPayment = $('.js-calculate-credit-initial-payment-input'),
                        min = 0, 
                        max = price * 0.7;

                    rangeInitialPayment.ionRangeSlider({
                        min: min,
                        max: max,
                        from: 100000,
                        postfix: "₽",
                        step: 10000,
                        
                        onStart: function(data) {
                            inputInitialPayment.prop("value", tortik.pf(data.from) + '₽');
                        },

                        onChange: function(data) {
                            inputInitialPayment.prop("value", tortik.pf(data.from) + '₽');

                            calculateMountPayment();
                        }
                    });
                
                    rangeInitialPaymentInstance = rangeInitialPayment.data("ionRangeSlider");
                
                    inputInitialPayment.on("change keyup", function() {
                        let val = $(this).prop("value");
                
                        // validate
                        if (val < min) {
                            val = min;
                        } else if (val > max) {
                            val = max;
                        }
                
                        rangeInitialPaymentInstance.update({
                            from: val
                        });
                    });
                })();

                // Слайдер с сроком кредита
                (function() {
                    var rangeTerm= $(".js-calculate-credit-term-range"),
                        inputTerm = $(".js-calculate-credit-term-input")
            
                    rangeTerm.ionRangeSlider({
                        values: ['6 мес','1 год','2 года','3 года','4 года','5 лет','6 лет','7 лет'],
                        from: 7,

                        onStart: function(data) {
                            inputTerm.prop("value", data.from_value);
                        },

                        onChange: function(data) {
                            inputTerm.prop("value", data.from_value);

                            calculateMountPayment();
                        }
                    });


                    rangeTermInstance = rangeTerm.data("ionRangeSlider");
                })();

                calculateMountPayment();
            }

            // Расчет скидки чекбоксами
            this.calculateDiscount = function() {
                let changeAssortmentDiscount = '.js-change-assortmen-discount',
                    textAssortmentPrice = '.js-assortment-price',
                    textAssortmentPriceOld = '.js-assortment-price-old';
                
                // Клик на чекбоксе по смене ежемесячного платежа
                $(changeAssortmentDiscount).click(function() {
                    let summaryDiscount = 0,
                        priceOld = parseInt($(textAssortmentPriceOld).data('price'));

                    // ПОсчитаем все активные скидки
                    $(changeAssortmentDiscount).each(function() {
                        if(this.checked) {
                            summaryDiscount += parseInt($(this).data('discount'));
                        }
                    });

                    console.log(priceOld, summaryDiscount);

                    let newPrice = priceOld - summaryDiscount;

                    // Установим цену
                    $(textAssortmentPrice).data('price', newPrice);

                    // Делаем анимацию для цены
                    $({ counter: parseInt(tortik.onlyDigits($(textAssortmentPrice).text())) }).animate({
                        counter: newPrice
                    }, {
                        duration: 1000,
                        easing: 'swing',

                        step: function() {
                            $(textAssortmentPrice).text(tortik.pf(Math.ceil(this.counter)));
                        },

                        complete: function() {
                            $(textAssortmentPrice).text(tortik.pf(newPrice));
                        }
                    });

                    // Установим цену в нижнюю форму с кредитом (первоначальный взнос)
                    rangeInitialPaymentInstance.update({ max: newPrice * 0.7 });
                });
            }

            // Всплывающая форма кредита
            this.modalComplectationCredit = function() {
                let modalComplectationCredit = $('#popup-special-credit'),
                    btnOpenCreditModal = $('[data-target="#popup-special-credit"]');
        
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

            // Всплывающая форма tradein
            this.modalComplectationTradein = function() {
                let modalComplectationCredit = $('#popup-special-tradein'),
                    btnOpenCreditModal = $('[data-target="#popup-special-tradein"]');
        
                btnOpenCreditModal.click(function() {
                    modalComplectationOrder.find('input[name="need_car_mark"]').val( $(this).data('mark') );
                    modalComplectationOrder.find('input[name="need_car_model"]').val( $(this).data('model') );
                    modalComplectationOrder.find('input[name="need_car_year"]').val( $(this).data('year') );
                    modalComplectationOrder.find('input[name="need_car_price"]').val( $(this).data('price') );
                    modalComplectationOrder.find('input[name="need_car_name"]').val( $(this).data('car') );

                    modalComplectationOrder.find('input[name="brand_id"]').val( $(this).data('mark-id') );
                    modalComplectationOrder.find('input[name="model_id"]').val( $(this).data('model-id') );

                    modalComplectationCredit.find('.js-car-name').text( $(this).data('car') );
                    modalComplectationCredit.find('.js-car-preview').attr( 'src', $(this).data('preview') );
                });
            }

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

    // Кнопка мобильного звонка внизу страницы на мобилке
    mobileBottomNumber() {
        let target = $('.mobile-fixed-number');

        /* $(window).scroll(function() {
            if( $(window).scrollTop() + $(window).height() == $(document).height() ) {
                target.hide();
            } else {
                target.show();
            }
        }); */
    },

    // События для попапов
    popupsEventsInit: function() {
        $('.js-open-modal').click(function(event) {
            event.preventDefault();

            let target = $(this).data('target');

            $.fancybox.open({
                src: target
            });
        });
    },

    // Попапы
    popupsInit: function() {
        let self = this,
            exceptPages = [
                "\/credit",
                "\/tradein",
                "\/buyout"
            ];

        // Таймеры
        this.timers = {
            main: tortik.createTimer({
                name: 'main',
                exceptPages: exceptPages
            }),

            model: tortik.createTimer({
                name: 'model',
                defer: true,
                exceptPages: exceptPages
            })
        };

        // Всплывашки
        this.popups = {};
        // Совмесная акция с ВТБ
        this.popups.stockWithVtb = tortik.createPopup({
            name: 'popup-stocks-with-vtb',
            target: '#popup-stocks-with-vtb',
            timer: this.timers.main,
            event: 'timer',
            delay: 35
        });

        // Бронироване автомобиля (с модели)
        this.popups.getBestOffer = tortik.createPopup({
            name: 'popup-get-best-offer',
            target: '#popup-get-best-offer',
            timer: this.timers.model,
            event: 'timer',
            delay: 20,

            onClose: function() {
                self.timers.main.pause();
                self.timers.model.pause();

                self.timers.main.minus(15);
            },

            onShow: function(payload) {
                let modal = $('#popup-get-best-offer'),
                    modalCarName = $(modal).find('.js-car-name'),
                    modalCarPreview = $(modal).find('.js-car-preview');

                modalCarName.text(payload.name);
                modalCarPreview.attr('src', payload.preview);
            }
        });       
    }
}