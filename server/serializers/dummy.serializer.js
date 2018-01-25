/**
 * dummy.serializer.js
 * server/serializers
 */

const { Serializer } = require('jsonade');

const serializer = new Serializer('dummy', {
  attributes: ['id', 'name'],
});

module.exports = {
  serializer,
};
