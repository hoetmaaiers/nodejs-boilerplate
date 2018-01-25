/**
 * knexfile.js
 * .
 */

require('dotenv').config();

const defaultConfig = {
  client: 'pg',
  connection: process.env.POSTGRES_URL,
  debug: (process.env.POSTGRES_LOG_LEVEL === 'DEBUG'),
  pool: {
    min: 1,
    max: 2,
  },
  migrations: {
    directory: `${__dirname}/db/migrations`,
  },
  seeds: {
    directory: `${__dirname}/db/seeds`,
  },
};

module.exports = {
  development: Object.assign({}, defaultConfig, {}),
  test: Object.assign({}, defaultConfig, {
    connection: 'postgres://developer:developer@localhost:5432/db_test',
    debug: false,
  }),
  production: Object.assign({}, defaultConfig, {}),
};
