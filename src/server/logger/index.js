// flow

const winston = require('winston');

// TODO brush it up later
const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

export default logger;
