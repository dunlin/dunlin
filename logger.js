var winston = require('winston');

var logger = new (winston.Logger)({
    transports: [
        new winston.transports.File({
            level: process.env.LOG_LEVEL || 'warn',
            filename: 'log/dunlin-all.log'
        })
    ],
    handleExceptions: true,
    exceptionHandlers: [
        new winston.transports.File({filename: "log/dunlin-exceptions.log"})
    ]
});

if (process.env.NODE_ENV == 'development') {
    logger = new (winston.Logger)({
        transports: [
            new winston.transports.Console({
                level: 'silly',
                colorize: true,
                prettyPrint: true
            })
        ]
    });
}

module.exports = logger;
