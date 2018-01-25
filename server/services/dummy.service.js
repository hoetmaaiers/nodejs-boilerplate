/**
 * dummy.service.js
 * server/services
 */

const dummyRepository = require('../repositories/dummy.repository');

async function findOne(id) {
  return (await dummyRepository.findOne(id))[0];
}

async function update(id, body) {
  return (await dummyRepository.update(id, body))[0];
}

async function destroy(id) {
  return dummyRepository.destroy(id);
}

module.exports = {
  findOne,
  update,
  destroy,
};
