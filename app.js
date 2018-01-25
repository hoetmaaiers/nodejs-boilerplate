require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { isArray } = require('lodash');
const loggerMiddleware = require('./server/middlewares/logger.middleware');
const { getSwaggerDocument } = require('./server/helpers/swagger.helper');
const Errors = require('./server/errors');
const { ErrorSerializer } = require('jsonade');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const router = require('./server/routes');

router.use(loggerMiddleware);

const swaggerDocument = getSwaggerDocument();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);

// 404
app.use((req, res, next) =>
  next(Errors.notFound({
    title: 'Shits gone yo 😢',
    code: '9999',
    url: req.originalUrl,
  })));

// handle Joi error
app.use((err, req, res, next) => {
  if (err.message === 'validation error') {
    const errors = err.errors.map(e => Errors.unprocessableEntity({
      title: e.field,
      url: req.originalUrl,
      detail: e.messages[0],
      meta: {
        stack: e,
      },
    }));

    throw errors;
  }

  return next((isArray(err) && err) || [err]);
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const errRequestExtended = err.map((e) => {
    if (e.status) {
      return {
        ...e,
        url: req.originalUrl,
      };
    }

    // All non intentional errors will be internal server error
    // AKA the scary 500 monster 🎃
    return Errors.internalServerError({
      title: 'Something went wrong 😢',
      url: req.originalUrl,
      detail: e.message,
      meta: { stack: e.stack },
    });
  });

  const serializedError = ErrorSerializer.serialize(errRequestExtended);
  return res.status(errRequestExtended[0].status).send(serializedError);
});

module.exports = app;
