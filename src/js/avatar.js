var $ = require('jquery');

module.exports = function (node, webrtc) {
    var avatar = {
        node: node,
        muted: false
    };

    // Avatar Events
    avatar.node.on('click', function () {
        if (avatar.muted) {
            webrtc.unmute();
            avatar.muted = false;
            $(this).removeClass('muted');
            return;
        }

        webrtc.mute();
        avatar.muted = true;
        $(this).addClass('muted');
    });
    
    return avatar;
};