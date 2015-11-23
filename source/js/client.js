var $ = require('jquery'),
    webrtc = require('./rtc')(),
    avatar = require('./avatar')($('#avatar'), webrtc),
    notification = require('./notification')($('#notifications')),
    idle = require('./idle')(document.body);

notification.title('Welcome', 'welcome-message animation-fadeout');
