var express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    handlebars = require('handlebars'),
    logger = require('./logger'),
    expressLogger = require('express-winston'),
    moniker = require('moniker'),
    names = moniker.generator([moniker.adjective, moniker.noun]),
    layout = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'source/templates/client.hbs'), 'utf8')),
    port = parseInt(process.env.HTTP_PORT) || 8001,
    signalingServer = process.env.SIGNALING_SERVER || 'localhost:8080';

app.use(expressLogger.logger({
    winstonInstance: logger,
    statusLevels: true,
    meta: false
}));

app.use(express.static(process.cwd() + '/client'));

app.param('room', function (req, res, next, room) {
    req.room = room;
    next();
});

app.get('/', function (req, res, next) {
    res.redirect('/' + names.choose());
    res.end();
});

app.get('/:room', function (req, res, next) {
    res.send(layout({
        'connectionServer': signalingServer
    }));
    next();
});

app.use(expressLogger.errorLogger({
    winstonInstance: logger
}));

app.listen(port);

logger.info('Http server is listening on port ' + port);
logger.info('Using signaling server ' + signalingServer);
