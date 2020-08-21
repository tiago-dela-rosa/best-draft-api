import winston from "winston";

const myCustomLevels = {
  levels: {
    info: 0,
    debug: 1,
    warn: 2,
    error: 3,
    pizza: 4,
  },
  colors: {
    info: "blue",
    debug: "green",
    warn: "yellow",
    error: "red",
    pizza: "orange",
  },
};

const logger = winston.createLogger({
  level: "error",
  levels: myCustomLevels.levels,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(myCustomLevels.colors),
        winston.format.simple()
      ),
    }),
  ],
});

export default logger;
