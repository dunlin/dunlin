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
            transform: [['hbsfy', {"extensions": "hbs"}]]
        },
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS2'],
    });
};
