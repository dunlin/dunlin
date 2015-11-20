var $ = require('jquery'),
    webrtc = require('./rtc')(),
    avatar = require('./avatar')($('#avatar'), webrtc),
    idle = require('./idle')(document.body);
