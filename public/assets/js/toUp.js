/* скрипт для кнопки вверх*/
$(document).ready(function() {

    $(function() {
            // при нажатии на кнопку scrollup
            $('.scrollup').click(function() {
                // переместиться в верхнюю часть страницы
                $("html, body").animate({
                    scrollTop: 0
                }, 1000);
            })
        })
        // при прокрутке окна (window)
    $(window).scroll(function() {
        // если пользователь прокрутил страницу более чем на 200px
        if ($(this).scrollTop() > 200) {
            // то сделать кнопку scrollup видимой
            $('.scrollup').fadeIn();
            $('.cart').css({
                "position": "fixed",
                "z-index": "999",
                "top": "-10px",
                "width": "100%",
                "border": "1px solid royalblue",
            });
        }
        // иначе скрыть кнопку scrollup
        else {
            $('.scrollup').fadeOut();
            $('.cart').css({
                "position": "static",
                "z-index": "999",
                "width": "240px",
            });
        }
    });

})