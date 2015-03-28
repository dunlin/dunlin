var $ = require('jquery');

module.exports = function (remotes) {
    var streams = {
        peers: {},
        add: function (id, video) {
            streams.peers[id] = {
                'id': id,
                'stream': $(video),
                'node': $(video).closest('.video-container'),
                'muted': false,
                'mute': streams.mute(id),
                'unmute': streams.unmute(id)
            };

            streams.updateLength();
            streams.updateDom();
            streams.registerEvents(streams.peers[id]);
        },
        remove: function (id) {
            delete streams.peers[id];

            streams.updateLength();
            streams.updateDom();
        },
        updateLength: function () {
            streams.length = Object.keys(streams.peers).length;
        },
        updateDom: function () {
            $(document.body).attr('class', function (i, attr) {
                attr = attr || 'peers-0';
                return attr.replace(/peers-\d+/g, 'peers-' + streams.length);
            });
        },
        mute: function (id) {
            return function () {
                var video = streams.peers[id];
                if (video.muted) {
                    return;
                }

                video.stream.prop('muted', true);
                video.node.addClass('muted');
                video.muted = true;
            }
        },
        unmute: function (id) {
            return function () {
                var video = streams.peers[id];

                if (!video.muted) {
                    return;
                }

                video.stream.prop('muted', false);
                video.node.removeClass('muted');
                video.muted = false;
            }
        },
        registerEvents: function (video) {
            video.node.find('.mute-trigger').on('click', function () {
                if (video.muted) {
                    video.unmute();
                } else {
                    video.mute();
                }
            });
        },
        length: 0
    };

    return streams;
};
