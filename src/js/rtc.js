var $ = require('jquery'),
    SimpleWebRTC = require('simplewebrtc'),
    videoContainerTemplate = require('../templates/video-container.hbs');

module.exports = function () {
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

    // we have to wait until it's ready
    webrtc.on('readyToCall', function () {
        // you can name it anything
        webrtc.joinRoom(room);
    });

    webrtc.on('videoAdded', function (video, peer) {
        var $remotes = $('#remotes'),
            $videoContainer = $(videoContainerTemplate());

        $videoContainer.append(video);
        streams.add(peer.id, video, $videoContainer);
    });

    webrtc.on('videoRemoved', function (video, peer) {
        streams.remove(peer.id);
    });

    return webrtc;
};