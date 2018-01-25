/**
 * dummies.seed.js
 * db/seeds
 */


async function seed(knex) {
  await knex('dummies').insert([
    {
      name: 'Dummy 1',
    },
    {
      name: 'Dummy two',
    },
    {
      name: 'Dummy THREE',
    },
  ]);
}

module.exports = {
  seed,
};
