/**
 * error.middleware.js
 * server/middlewares
 *
 */
const { ErrorSerializer } = require('jsonade');
const errors = require('../errors');
const { isArray } = require('lodash');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let errArray = isArray(err) ? err : [err];

  // Validation Error
  if (err.message === 'validation error') {
    errArray = err.errors.map(e => errors.unprocessableEntity({
      title: e.field,
      url: req.originalUrl,
      detail: e.messages[0],
      meta: {
        stack: e,
      },
    }));
  }
  const errRequestExtended = errArray.map((error) => {
    if (error.status) {
      return {
        ...error,
        url: req.originalUrl,
      };
    }

    return errors.internalServerError({
      title: 'Something went wrong 😢',
      url: req.originalUrl,
      detail: error.message,
      meta: { stack: error.stack },
    });
  });
  const serializedError = ErrorSerializer.serialize(errRequestExtended);
  return res.status(errRequestExtended[0].status).send(serializedError);
}
module.exports = errorHandler;
