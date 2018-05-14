/**
 * logger.middleware.js
 * server/middlewares
 *
 */

const winston = require('winston');
const expressWinston = require('express-winston');

const logLevel = process.env.LOG_LEVEL || 'info';
const requestBlackList = ['password'];

module.exports = expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
      prettyPrint: true,
    }),
  ],
  meta: ['debug', 'trace'].includes(logLevel),
  responseWhitelist: ['body'],
  responseFilter: (res, propName) => res[propName],
  requestFilter: (res, propName) => { // eslint-disable-line
    if (!requestBlackList.includes(propName)) return res[propName];
  },
  statusLevels: true,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true,
  colorize: true,
  skip: () => process.env.NODE_ENV === 'test',
});

