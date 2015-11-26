var $ = require('jquery');
    icons = require('./icons')('avatar');

module.exports = function (node, webrtc) {
    var avatar = {
        node: node,
        muted: false,
        icon: $('#avatar-icon')
    };

    // Avatar Events
    avatar.node.on('click', function () {
        if (avatar.muted) {
            webrtc.unmute();
            avatar.muted = false;
            $(this).removeClass('muted');
            icons(avatar.icon, 'unmuted');
            return;
        }

        webrtc.mute();
        avatar.muted = true;
        $(this).addClass('muted');
        icons(avatar.icon, 'muted');
    });

    return avatar;
};
