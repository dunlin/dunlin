var colors = require('colors/safe'),
    express = require('express'),
    app = express(),
    os = require('os'),
    fs = require('fs'),
    path = require('path'),
    handlebars = require('handlebars'),
    layout = handlebars.compile(fs.readFileSync(path.resolve(__dirname, 'src/templates/client.hbs'), 'utf8')),
    port = parseInt(process.env.HTTP_PORT) || 8001;

module.exports = function (options) {
    // Define the static shares
    app.use(express.static(process.cwd() + '/client'));

    app.param('room', function (req, res, next, room) {
        req.room = room;
        next();
    });

    app.get('/', function (req, res, next) {
        res.redirect('/' + require('node-uuid')());
        res.end();
    });

    app.get('/:room', function (req, res, next) {
        res.send(layout({
            'connectionServer': process.env.SIGNALING_SERVER,
            'room': req.room
        }));
        next();
    });

    if (options.secure) {
        require('https').createServer({key: options.keys.serviceKey, cert: options.keys.certificate}, app).listen(port);
    } else {
        app.listen(port);
    }

    console.log(colors.blue('Http server is listening on port ' + port));
    console.log(colors.inverse('Conference server: ' + (options.secure ? 'https://' : 'http://') + os.hostname() + ':' + port));
};