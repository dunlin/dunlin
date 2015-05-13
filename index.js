#!/usr/bin/env node

var cli = require('commander'),
    pem = require('pem'),
    httpServer = require('./http-server'),
    start = function (options) {
        httpServer(options);
    };

cli
    .version('0.0.1')
    .option('-s, --secure', 'Serve over SSL', false)
    .parse(process.argv);


var options = {
    secure: cli.secure
};

if (options.secure) {
    pem.createCertificate({days: 1, selfSigned: true}, function (err, keys) {
        options.keys = keys;
        start(options);
    })
} else {
    start(options);
}