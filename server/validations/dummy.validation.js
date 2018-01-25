const Joi = require('joi');

module.exports = {
  get: {
    // Cannot validate path arguments
  },
  patch: {
    options: {
      allowUnknownBody: false,
    },
    body: {
      name: Joi.string(),
    },
  },
  delete: {
    // Cannot validate path arguments
  },
};
