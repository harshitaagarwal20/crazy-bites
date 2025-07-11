// logger.js
import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'info', // default log level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),       // include stack trace
    format.splat(),
    format.json()                         // use format.simple() for human-readable
  ),
  transports: [
    new transports.Console(),            
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // error logs
    new transports.File({ filename: 'logs/combined.log' })                // all logs
  ]
});

export default logger;
