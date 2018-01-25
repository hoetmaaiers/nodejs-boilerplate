/**
 * dummy.controller.js
 * server/controllers
 */

const { serializer } = require('./../serializers/dummy.serializer.js');
const dummyService = require('./../services/dummy.service');

async function findOne(req, res, next) {
  try {
    const { id } = req.params;
    const data = await dummyService.findOne(id);
    const response = serializer.serialize(data);
    return res.json(response);
  } catch (ex) {
    return next(ex);
  }
}

async function update(req, res, next) {
  try {
    const { params: { id }, body } = req;
    const data = await dummyService.update(id, body);
    const response = serializer.serialize(data);
    return res.json(response);
  } catch (ex) {
    return next(ex);
  }
}

async function destroy(req, res, next) {
  try {
    const { params: { id } } = req;
    await dummyService.destroy(id);
    return res.status(204).send(null);
  } catch (ex) {
    return next(ex);
  }
}

module.exports = {
  findOne,
  update,
  destroy,
};
