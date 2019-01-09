require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loggerMiddleware = require('./server/middlewares/logger.middleware');
const { getSwaggerDocument } = require('./server/helpers/swagger.helper');
const Errors = require('./server/errors');
const errorhandler = require('./server/middlewares/error.middleware');

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
  })));

// handle Joi error
app.use(errorhandler);

process.on('unhandledRejection', (e) => {
  // Show stack of unhandeld errors
  // eslint-igone-next-line
  console.error('unhandledRejection', e.message);
});

module.exports = app;
