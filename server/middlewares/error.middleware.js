/**
 * error.middleware.js
 * server/middlewares
 *
 */
const { ErrorSerializer } = require('jsonade');
const Errors = require('../errors');
const { isArray } = require('lodash');

// eslint-disable-next-line no-unused-vars
function errorHandeler(err, req, res, next) {
  let errArray = isArray(err) ? err : [err];

  // Validation Error
  if (err.message === 'validation error') {
    errArray = err.errors.map(e => Errors.unprocessableEntity({
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

    return Errors.internalServerError({
      title: 'Something went wrong 😢',
      url: req.originalUrl,
      detail: error.message,
      meta: { stack: error.stack },
    });
  });
  const serializedError = ErrorSerializer.serialize(errRequestExtended);
  return res.status(errRequestExtended[0].status).send(serializedError);
}
module.exports = errorHandeler;
