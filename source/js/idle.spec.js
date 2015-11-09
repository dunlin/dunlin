describe('Idle logic', function () {
    var $ = require('jquery'),
        idleFactory = require('./idle.js');

    var inactivityTimeout = 2100,
        target, clock;

    beforeEach(function () {
        clock = sinon.useFakeTimers();
        target = $('<div></div>');
        idleFactory(target);
    });

    afterEach(function () {
        clock.restore();
    });

    it('should enter idle mode after a time of inactivity', function () {
        clock.tick(inactivityTimeout);

        expect(target.hasClass('idle')).to.be.true;
    });

    it('should exit idle mode after mouse activity', function () {
        clock.tick(inactivityTimeout);

        expect(target.hasClass('idle')).to.be.true;

        target.trigger('mousemove');

        expect(target.hasClass('idle')).to.be.false;
    });

    it('should exit idle mode after a click', function () {
        clock.tick(inactivityTimeout);

        expect(target.hasClass('idle')).to.be.true;

        target.trigger('click');

        expect(target.hasClass('idle')).to.be.false;
    });

    it('should reenter idle after inactivity', function () {
        clock.tick(inactivityTimeout);

        expect(target.hasClass('idle')).to.be.true;

        target.trigger('click');

        expect(target.hasClass('idle')).to.be.false;

        clock.tick(inactivityTimeout);

        expect(target.hasClass('idle')).to.be.true;
    });
});