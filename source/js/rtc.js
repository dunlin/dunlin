var $ = require('jquery'),
    SimpleWebRTC = require('simplewebrtc'),
    videoContainerTemplate = require('../templates/video-container.hbs'),
    notification = require('./notification'),
    room = window.location.pathname.split('/').pop();

module.exports = function () {
    'use strict';

    var webrtc = new SimpleWebRTC({
            url: '//' + connectionServer,
            autoRequestMedia: true, // immediately ask for camera access
            enableDataChannels: false, // enable if you need client events like speaking, stopped speaking ...
            detectSpeakingEvents: false,
            autoAdjustMic: true, // set level of microphone automatically
            localVideoEl: 'local', // the id/element dom element that will hold "our" video
            remoteVideosEl: '' // the id/element dom element that will hold remote videos
        }),

        streams = require('./streams.js')($('#remotes'));

    function fail(message) {
        return function (peer) {
            streams.get(peer.id).node.addClass('status-error')
                .find('.status').text(message);
        }
    }

    // we have to wait until it's ready
    webrtc.on('readyToCall', function () {
        // you can name it anything
        webrtc.joinRoom(room);
    });

    webrtc.on('videoAdded', function (video, peer) {
        var $videoContainer = $(videoContainerTemplate({status: 'Connecting'}));

        $videoContainer.append(video);
        streams.add(peer.id, video, $videoContainer);
    });

    webrtc.on('videoRemoved', function (video, peer) {
        streams.remove(peer.id);
    });

    webrtc.connection.on('noSlotsAvailable', function (msg) {
        notification.title(msg.title);
        notification.message(msg.message);
    });

    webrtc.on('iceFailed', fail('Connection to peer failed.'));
    webrtc.on('connectivityError', fail('Connection from peer failed.'));

    return webrtc;
};
