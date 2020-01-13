import config from '../../config'

const winston = require('winston');
const logForm = require('logform');
const { combine, timestamp, label, printf } = logForm.format;
require('winston-daily-rotate-file');

const transport = new (winston.transports.DailyRotateFile)({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: (config.log.dirname) ? config.log.dirname : './storage/logs'
});

transport.on('rotate', function(oldFilename, newFilename) {
  // do something fun
});

export default new winston.createLogger({
  transports: [
    transport
  ],
  format: combine(
    label({ label: 'right meow!' }),
    timestamp(),
    printf(nfo => {
      return `${nfo.timestamp} [${nfo.label}] ${nfo.level}: ${nfo.message}`;
    })
  ),
});