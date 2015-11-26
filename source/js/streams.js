var $ = require('jquery'),
    icons = require('./icons')('remote');

var updateBodyPeers = function (peers) {
    $(document.body).attr('class', function (i, attr) {
        attr = attr || 'peers-0';
        return attr.replace(/peers-\S+/g, 'peers-' + peers);
    });
};

module.exports = function (remotes) {
    var streams = {
        peers: {},
        focused: undefined,
        add: function (id, video, container) {
            streams.peers[id] = {
                'id': id,
                'stream': $(video),
                'node': container,
                'muted': false,
                'focused': false,
                'mute': streams.mute(id),
                'unmute': streams.unmute(id),
                'focus': streams.focus(id),
                'unfocus': streams.unfocus(id)
            };

            streams.registerEvents(streams.peers[id]);
            streams.updateLength();

            if (!streams.focused) {
                streams.updateDom();
                $('#remotes').append(streams.peers[id].node);
            } else {
                $('#remotes-unfocused').append(streams.peers[id].node);
                streams.peers[id].stream.get(0).play();
            }
        },
        get: function (id) {
            return streams.peers[id]
        },
        remove: function (id) {
            var peer = streams.peers[id];

            if (peer.focused) {
                peer.unfocus();
            }

            peer.node.remove();
            delete streams.peers[id];

            streams.updateLength();

            if (!streams.focused) {
                streams.updateDom();
                return;
            }

            if (streams.length < 2) {
                streams.peers[streams.focused].unfocus();
            }
        },
        updateLength: function () {
            streams.length = Object.keys(streams.peers).length;
        },
        updateDom: function () {
            updateBodyPeers(streams.length);
        },
        playAll: function () {
            Object.keys(streams.peers).forEach(function (key) {
                streams.peers[key].stream.get(0).play();
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
                icons($(video.node).find('.icon-sound'), 'muted');
            };
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
                icons($(video.node).find('.icon-sound'), 'unmuted');
            };
        },
        focus: function (id) {
            return function () {
                var video = streams.peers[id],
                    bench;

                if (video.focused) return;

                bench = $('#remotes-unfocused');

                streams.focused = id;

                video.node.addClass('focused');
                video.focused = true;
                icons($('.icon-layout'), 'layout-focused');

                Object.keys(streams.peers).forEach(function (key) {
                    if (key === id) {
                        return;
                    }

                    streams.peers[key].focused = false;
                    bench.append(streams.peers[key].node.removeClass('focused'));
                    icons($(streams.peers[key].node).find('.icon-layout'), 'layout-default');
                });

                $('#remotes').append(video.node);

                updateBodyPeers('focused');
                streams.playAll();
            };
        },
        unfocus: function (id) {
            return function () {
                var video = streams.peers[id],
                    remotes;

                if (!video.focused) return;

                remotes = $('#remotes');

                streams.focused = undefined;

                video.node.removeClass('focused');
                video.focused = false;
                icons($('.icon-layout'), 'layout-default');

                Object.keys(streams.peers).forEach(function (key) {
                    streams.peers[key].node.detach();
                });

                Object.keys(streams.peers).forEach(function (key) {
                    remotes.append(streams.peers[key].node);
                });

                streams.updateDom();
                streams.playAll();
            };
        },
        registerEvents: function (video) {
            video.node.find('.mute-trigger').on('click', function () {
                if (video.muted) {
                    video.unmute();
                } else {
                    video.mute();
                }
            });
            video.node.find('.focus-trigger').on('click', function () {
                if (video.focused) {
                    video.unfocus();
                } else {
                    video.focus();
                }
            });
        },
        length: 0
    };

    return streams;
};
