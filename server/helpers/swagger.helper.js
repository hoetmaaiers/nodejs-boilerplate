const yaml = require('js-yaml');
const fs = require('fs');

function getSwaggerDocument() {
  const swagger = yaml.safeLoad(fs.readFileSync('./docs/api/swagger.yaml', 'utf8'));

  return Object.assign(
    {},
    swagger,
    {
      host: process.env.SWAGGER_BASE_URL,
      schemes: [process.env.SWAGGER_SCHEME],
    },
  );
}

module.exports = {
  getSwaggerDocument,
};
