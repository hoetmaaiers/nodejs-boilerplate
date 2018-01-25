/**
 * helpers.test.js
 * test
 */

const { reduce } = require('lodash');
const knex = require('../db/connection');

async function dropTables() {
  const { rows } = await knex.raw(`
    select 'drop table if exists "' || tablename || '" cascade;' from pg_tables where tableowner='developer';
  `);

  return reduce(rows, async (promise, promiseItem) => {
    await promise;
    await knex.raw(promiseItem['?column?']);
    return Promise.resolve();
  }, Promise.resolve());
}

async function dropSequences() {
  const { rows } = await knex.raw(`
    select 'drop sequence if exists "' || relname || '" cascade;' from pg_class where relkind = 'S';
  `);

  return reduce(rows, async (promise, promiseItem) => {
    await promise;
    await knex.raw(promiseItem['?column?']);
    return Promise.resolve();
  }, Promise.resolve());
}

async function startWithCleanDatabase() {
  await dropTables();
  await dropSequences();
  await knex.migrate.latest();
  await knex.seed.run();
  return Promise.resolve();
}

module.exports = {
  startWithCleanDatabase,
};
