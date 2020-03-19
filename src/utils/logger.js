import winston from 'winston';

const myCustomLevels = {
    levels: {
        info: 0,
        debug: 1,
        warn: 2,
        error: 3
    },
    colors: {
        info: 'blue',
        debug: 'green',
        warn: 'yellow',
        error: 'red'
    }
};

winston.addColors(myCustomLevels);

const logger = winston.createLogger({
    levels: myCustomLevels.levels,
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        })
    ]
});

export default logger;
