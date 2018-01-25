exports.up = (knex, Promise) => Promise.all([
  knex.schema.createTable('dummies', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.timestamps(false, true);
  }),
]);

exports.down = knex => knex.schema.dropTable('dummies');
