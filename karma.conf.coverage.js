var istanbul = require('browserify-istanbul');

module.exports = function (config) {
    config.set({
        basePath: 'source',
        frameworks: ['browserify', 'mocha', 'chai-sinon'],
        files: [
            'js/**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
            'js/**/*.spec.js': ['browserify']
        },
        browserify: {
            debug: true,
            extensions: ["js", "hbs"],
            transform: [['hbsfy', {"extensions": "hbs"}], istanbul({
                ignore: ['**/node_modules/**', '**/*.spec.js']
            })]
        },
        coverageReporter: {
            type: 'lcov',
            dir: '../coverage'
        },
        reporters: ['dots', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: true
    });
};
