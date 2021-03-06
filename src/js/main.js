$(function (){
    // Слайдер в на странице продукта
    $('.product-main-slider').slick({
        dots: false,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    // Увеличение фото при наведении
    $('.product-main-slider').on('click',function(){
        $(this).toggleClass('product-main-slider--active');
    });


    $('.product-nav-slider__wrap').slick({
        //slidesToShow: 2,
        slidesToScroll: 1,
        dots: false,
        infinite: true,
        asNavFor: '.product-main-slider',
        centerMode: true,
        variableWidth: true,
        focusOnSelect: true,
        prevArrow: $('.product-nav-slider .slider-prev'),
        nextArrow: $('.product-nav-slider .slider-next'),
    });
    // Слайдер на странице инфомация для пациентов
    $('.info-slider').slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: $('.info-slider__wrapper .slider-prev'),
        nextArrow: $('.info-slider__wrapper .slider-next'),
        responsive: [
            {
              breakpoint: 576,
              settings: {
                arrows: false,
              }
            },
        ]
    });

    

    // Слайдеры на страницу о нас
    $('.article-section-slider__wrapper-1').slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        // asNavFor: '.product-main-slider',
        prevArrow: $('.article-section-slider_1 .slider-prev'),
        nextArrow: $('.article-section-slider_1 .slider-next'),
    });
    $('.article-section-slider__wrapper-2').slick({
        dots: true,
        arrows: true,
        slidesToShow: 1,
        // asNavFor: '.product-main-slider',
        prevArrow: $('.article-section-slider_2 .slider-prev'),
        nextArrow: $('.article-section-slider_2 .slider-next'),
    });

    //Скролл на странице о нас
    $(".history-inner").mousewheel(function (event, delta) {
        this.scrollLeft -= (delta * 60);
        event.preventDefault();
    });

     

    function filterCatalog(hoverElem, highLightElem, dataStr){
        hoverElem.on('mouseover', function () {
            $(this).each(function () {
                $.each(this.attributes, function (i, a) {
                    if (a.name.indexOf(dataStr) + 1) {
                        dataAttr = a.name.replace('class', '');
                    }
                    highLightElem.removeClass('active');
                    highLightElem.filter('[' + dataAttr + ']').addClass('active');
                });
            });
            hoverElem.removeClass('active');
            $(this).addClass('active');
        });
    }


    filterCatalog($('.catalog-tabs-content li'), $('.catalog-tabs li'), 'data-catalog-');
    filterCatalog($('.catalog-tabs li'), $('.catalog-tabs-content li'), ('data-product-'));



    /* 
    ======== Модальные окна ========
    */
   // Закрыть на крестик или мимо
   $('.modal-close, .modal').on("click", function (e) {
       e.preventDefault();
       $(this).closest('.modal').addClass('closed');
       $('html').css('overflow','auto');

   })
    // Отменяем нажатие на родителя при клике на модалку
   $('.modal-area').on("click",function (e) {
        e.stopPropagation();
   });

   // Открытие модальных окон
   $('.open-modal-form').on("click",function (e) {
        $('#modal-form').removeClass('closed');
        $('html').css('overflow','hidden');
   })
   $('.open-modal-thanks').on("click",function (e) {
        $('#modal-thanks').removeClass('closed'); 
        $('html').css('overflow','hidden');

    })
    $('.open-modal-clinics').on("click",function (e) {
        e.preventDefault();
        $('#modal-clinic').removeClass('closed'); 
        $('html').css('overflow','hidden');
    })
    $('.open-modal-news').on("click",function (e) {
        e.preventDefault();
        $('#modal-clinic').removeClass('closed'); 
        $('html').css('overflow','hidden');
    })
   
    /* 
    ======== Мобильно меню ========
    */
   // Открытие закрытие
   $('#burger').on("click", function () {
       $('#mob-menu').toggleClass('menu-closed');
   })
    // Добавляем класс, если есть под меню
    $( document ).ready(function(){
        $('.mob-menu-ul-1').find('.sub-menu-mob').parent('.mob-menu-li--main_lvl_1').addClass('menu-item-has-children'); 
    });
   // Отмена перехода по ссылке, которая раскрывается
   $('.mob-menu-a').on("click", function (e) {
       // Если есть дочернее меню, то НЕ переходим по ссылке
       if($(this).siblings('.sub-menu-mob').length > 0) {
        e.preventDefault();
        $(this).siblings('.sub-menu-mob').slideToggle();
       }
        
   });
   

    /* 
    ======== Аккордеон ========
    */
    
     $('input[name="tab-group"]').on("click", function(el){
        
        // el.preventDefault();
        // Запоминаем prop элемента 
        var currentProp = $(this).prop('checked');
        // Делаем у всех эдементов false(чтобы закрыть)
        $('input[name="tab-group"]').prop('checked',false);
        // Возвращаем нашему элементу prop
        $(this).prop('checked', currentProp);

        $('input[name="tab-group"]').each(function (){
            
            if($(this).prop('checked')) {
                $(this).siblings('.tab-content').slideDown();
            }else {
                $(this).siblings('.tab-content').slideUp();
            } 
        });
        
    })
    /* 
    ======== Выпадающий список на стр. продукта(ещё) ========
    */
   // Действие по нажатию на кнопку Ещё
   $('.product-use__list').on('click','.down-ul', function(){
    var ul = $(this).parents('.product-use__list');
        li = $(ul).children('li'); 
        
        $.each(li, function(ind, cur){
            if($(cur).attr('data-status') == 'hide'){
                $(cur).show();
                $(cur).attr('data-status', 'show');
                $(ul).find('.down-ul--show').hide();
                $(ul).find('.down-ul--hide').show();
            }else if ($(cur).attr('data-status') == 'show'){
                $(cur).attr('data-status','hide');
                $(cur).hide();
                $(ul).find('.down-ul--show').show();
                $(ul).find('.down-ul--hide').hide();
            }
        }); 
   });

   // Скрытие элементов
   $( document ).ready(function(){
        var ul = $('.product-use__list');
            li = $(ul).children('li');
            max = 6;

        if (li.length > max) {
            // скрываем доп. элементы
            $.each(li, function(ind, cur){
                // если больше разрешенного числа
                if(ind > max -1 ){
                    $(cur).attr('data-status','hide');
                    $(cur).hide();
                }
            });
            // Добавляем кнопку Ещё
            var button_show = "<button class='down-btn down-ul down-ul--show'><em class='down-btn-text'>Ещё </em> <img src='assets/img/down-black.svg' alt='Open'></button>";
                button_hide = "<button class='down-btn down-ul down-ul--hide'><em class='down-btn-text'>Скрыть </em> <img src='assets/img/down-black.svg' alt='Open'></button>";
            $(ul).append(button_show);
            $(ul).append(button_hide);
            $('.down-ul--hide').hide();
            
        }
   });

    /* 
    ======== После отправки формы ========
    */ 
        document.addEventListener( 'wpcf7mailsent', function( event ) {
            document.getElementById('modal-thanks').classList.remove("closed");
        }, false );

});



/* 
========================================
======== Выполнить после програзки DOM ========
========================================
*/
$( document ).ready(function(){

    /* 
    ======== Блок с текстом ПОДРОБНЕЕ ========
    */

   // Выравнивание высоты всех срытых блоков
   $('.product-info-box_min .product-info-box__body').each(function(){
        setBlockMaxHeight($(this));
    });

    // Функция установки максимальной высоты блока
    function setBlockMaxHeight(block, max = 0){
        if(max == 0){
            var lineHieght  = $(block).find('p').css('line-height').split('px')[0];
            newHeight = lineHieght * 3 + 5 + 18;
            $(block).css('max-height',newHeight);
        }else{
            $(block).css('max-height',max);
        }
        
    }

    // Кнопка больше на странице продукта 
    $('.product-info-box_min .down-btn').click(function (){
        $(this).toggleClass('down-btn_active');
        $(this).parent('.product-info-box__body').toggleClass('product-info-box__body_active');
        
        if($(this).parent('.product-info-box__body').hasClass('product-info-box__body_active')){
            setBlockMaxHeight($(this).parent('.product-info-box__body'), 9999);
        }else{
            setBlockMaxHeight($(this).parent('.product-info-box__body'));
        }
        
        if($(this).hasClass('down-btn_active')) {
            $('.down-btn-text').text('Закрыть');
        } else {
            $('.down-btn-text').text('Открыть');
        }
    });

    /* 
    ======== Заголовки в ораньжевой рамке ========
    */
    // Изменяем отступ (top) заголовка, в зависимости от количества строк
    $('.box-border__title').each(function(){
        var divSize     = $(this).height();
            lineHieght  = $(this).css('line-height').split('px')[0];

        // Высоту элемента делим на высоту строки
        if (parseInt(divSize / lineHieght) == 2){
            $(this).css('top','-32px');
            $(this).css('line-height','32px');
            $(this).parent('.box-border').css('padding-top', '50px');
        }else if (parseInt(divSize / lineHieght) == 3){
            $(this).css('top','-58px');
            $(this).css('line-height','30px');
            $(this).parent('.box-border').css('padding-top', '60px');
        }else {
            $(this).css('top','-12px');
        }
    })
    /* 
    ======== index накидываем класс на body ========
    */
   $('.index-main').parents('body').addClass('index-body');
});