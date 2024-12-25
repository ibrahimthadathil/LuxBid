const {createLogger, format, transports ,addColors} = require("winston");

addColors({
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
  });

const customFormate =format.combine(
    format.json(),
    format.colorize()
  ); 

const logger = createLogger({
  level: "debug",
  format: customFormate,
  transports: [new transports.Console()],
});


// for errr
export const logError = (error: unknown): void => {
  logger.error((error as Error).message);
};

export const logWarning = (message: string): void => {
  logger.warn(message);
};

export const logInfo = (message: string): void => {
  logger.info(message);
};

export const logDebug = (message: string): void => {
  logger.debug(message);
};

export default logger;
