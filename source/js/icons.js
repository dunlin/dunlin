/* eslint-env browser */

var $ = require('jquery');

var iconSprite = 'icons/icons.svg',
    icons = {
        'avatar': {
            'unmuted': '#icon-mute-mic',
            'muted': '#icon-unmute-mic'
        },
        'remote': {
            'unmuted': '#icon-mute-sound',
            'muted': '#icon-unmute-sound',
            'layout-focused': '#icon-layout-splitscreen',
            'layout-default': '#icon-layout-fullscreen'
        }
    };

module.exports = function (section) {
    var collection = icons[section];

    if (collection === undefined) {
        throw new Error('Missing Value', 'Unknown Icon Section');
    }

    return function (node, state) {
        $node = $(node);

        if (collection[state] === undefined) {
            throw new Error('Missing Value', 'Unknown Icon State');
        }

        $node.attr('xlink:href', iconSprite + collection[state]);
    }
};
