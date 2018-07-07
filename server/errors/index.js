/**
 * index.js
 * server/errors
 */

const HttpStatus = require('http-status');
const uuid = require('uuid/v4');
const { pick } = require('lodash');

const form = errorDefault => customException =>
  Object.assign(
    {},
    errorDefault,
    { id: uuid() },
    pick(customException, ['id', 'code', 'url', 'meta', 'title', 'detail']),
  );

const errors = {
  notFound: form({
    status: HttpStatus.NOT_FOUND,
    title: 'Not Found',
    detail: 'The origin server did not find a current representation for the target resource or is not willing to disclose that one exists.',
  }),
  unauthorized: form({
    status: HttpStatus.UNAUTHORIZED,
    title: 'Unauthorized',
    detail: 'The request has not been applied because it lacks valid authentication credentials for the target resource.',
  }),
  badRequest: form({
    status: HttpStatus.BAD_REQUEST,
    title: 'Bad Request',
    detail: 'The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).',
  }),
  internalServerError: form({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    title: 'Internal Server Error',
    detail: 'The server encountered an unexpected condition that prevented it from fulfilling the request.',
  }),
  unprocessableEntity: form({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    title: 'Unprocessable Entity',
    detail: 'The server understands the content type of the request entity, and the syntax of the request entity is correct but was unable to process the contained instructions.',
  }),
};

module.exports = errors;

