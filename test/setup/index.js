// Setup environment
require('dotenv').config();

const environment = {
  NODE_ENV: 'test',
  ELASTIC_LOG_LEVEL: 'info',
  POSTGRES_LOG_LEVEL: 'info',
};

Object.keys(environment, (key) => {
  process.env[key] = environment[key];
});
