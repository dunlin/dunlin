/* eslint-env: browser */
/* globals require, module */
var $ = require('jquery'),
    $template = $(require('../templates/notification.hbs')());

module.exports = function (container) {
    'use strict';

    var $container = $(container),
        $notification = $('#notification'),
        $title, $message;

    if ($notification.length === 0) {
        $title = $template.find('.title');
        $message = $template.find('.message');
        $container.append($template);
    } else {
        $title = $notification.find('.title');
        $message = $notification.find('.message');
    }

    return {
        title: function (text, classes) {
            $title.attr('class').split(' ').forEach(function (className) {
                if (className === 'title') {
                    return;
                }
                $title.removeClass(className);
            });

            if (classes !== undefined) {
                $title.addClass(classes);
            }

            $title.html(text);
        },
        message: function (text) {
            $message.html(text);
        }
    };
};
