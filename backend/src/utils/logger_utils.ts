import path from "path";
import winston from "winston";
import { TransformableInfo } from "logform"; 
const { createLogger, format, transports, addColors } = winston;

addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
});
const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf((info: TransformableInfo) => {
    return ` ${info.timestamp} ${info.level} : ${info.message}`;
  }),
  format.json(),
  format.colorize({ all: true })
);

const logger = createLogger({
  level: "debug",
  format: customFormat,
  transports: [
    new transports.Console(),
    new transports.File({
      filename: path.join(__dirname, "logs", "combined.log"),
      level: "debug",
    }),
    new transports.File({
      filename: path.join(__dirname, "logs", "errors.log"),
      level: "error",
    }),
  ],
});

// for errr
export const logError = (error: unknown): void => {
  logger.error((error as Error).message);
};

export const logInfo = (message: string): void => {
  logger.info(message);
};

export const logDebug = (message: string): void => {
  logger.debug(message);
};

export default logger;
