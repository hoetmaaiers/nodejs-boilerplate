/**
 * dummy.repository.js
 * server/repositories
 */

const knex = require('./../../db/connection');
const { TABLES } = require('./../constants');
const Errors = require('./../errors');

const tableName = TABLES.DUMMY;

async function findOne(id) {
  const result = await knex
    .select('*')
    .from(tableName)
    .where({ id });

  if (result.length === 0) {
    throw Errors.notFound({ title: `Dummy not found: ${id}` });
  }
  return result;
}

async function update(id, data) {
  const result = await knex(tableName)
    .where({ id })
    .update(data)
    .returning('*');

  if (result.length === 0) {
    throw Errors.notFound({ title: `Dummy not found: ${id}` });
  }
  return result;
}

async function destroy(id) {
  const result = await knex(tableName)
    .where({ id })
    .del();

  if (result === 0) {
    throw Errors.notFound({ title: `Dummy not found: ${id}` });
  }
  return Promise.resolve();
}

module.exports = {
  findOne,
  update,
  destroy,
};
