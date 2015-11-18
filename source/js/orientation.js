var $ = require('jquery');

module.exports = function (toggleBtn) {
    var initialClass,
        $body = $('body'),
        toggle = function () {
            $(toggleBtn).on('click', function () {
                if ($body.hasClass('horizontal')) {
                    $body.removeClass('horizontal').addClass('vertical');
                    $(this).removeClass('horizontal').addClass('vertical');
                } else {
                    $body.removeClass('vertical').addClass('horizontal');
                    $(this).removeClass('horizontal').addClass('vertical');
                }
            });
        };

    if (window.innerHeight < window.innerWidth) {
        initialClass = 'horizontal';
    } else {
        initialClass = 'vertical';
    }

    $body.addClass(initialClass);

    return toggle();
};
