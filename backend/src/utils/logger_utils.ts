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

export default logger;
