var $ = require('jquery'),
    $body = $(document.body),
    $template = $(require('../templates/notification.hbs')());

module.exports = (function () {
    'use strict';

    var $notification = $('#notification'),
        $title, $message;

    if ($notification.length === 0) {
        $title = $template.find('.title');
        $message = $template.find('.message');
        $body.append($template);
    } else {
        $title = $notification.find('.title');
        $message = $notification.find('.message');
    }

    return {
        title: function (text) {
            $title.html(text);
        },
        message: function (text) {
            $message.html(text);
        }
    };
}());
