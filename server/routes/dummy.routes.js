/**
 * dummy.routes.js
 * server/routes
 */

const express = require('express');
const validation = require('express-validation');
const validationRules = require('./../validations/dummy.validation');
const controller = require('./../controllers/dummy.controller');

const router = express.Router();

router.get(
  '/:id',
  validation(validationRules.get),
  controller.findOne,
);

router.patch(
  '/:id',
  validation(validationRules.patch),
  controller.update,
);

router.delete(
  '/:id',
  validation(validationRules.delete),
  controller.destroy,
);

module.exports = router;
