describe('Avatar video', function () {
    var $ = require('jquery'),
        avatarFactory = require('./avatar.js');
    var avatar, webrtc, node;

    beforeEach(function () {
        webrtc = {
            mute: sinon.spy(),
            unmute: sinon.spy()
        };

        node = $('<div></div>');

        avatar = avatarFactory(node, webrtc);
    });

    it('should initialize correctly', function () {
        expect(avatar.muted).to.be.false;
        expect(avatar.node).to.equal(node);
    });

    it('should toggle the mute status on a click', function () {
        node.trigger('click');

        expect(avatar.muted).to.be.true;
        expect(node.hasClass('muted')).to.be.true
        expect(webrtc.mute).to.have.been.called;

        node.trigger('click');

        expect(avatar.muted).to.be.false;
        expect(node.hasClass('muted')).to.be.false;
        expect(webrtc.unmute).to.have.been.called;
    });
});