var $ = require('jquery'),
    webrtc = require('./rtc')(),
    avatar = require('./avatar')($('#avatar'), webrtc),
    orientation = require('./orientation')($('#orientation-switch')),
    idle = require('./idle')(document.body);
