exports.up = (knex) => knex.schema.withSchema('public').createTable('preferences', (table) => {
  table.uuid('preference_uid', 30).primary().notNull();
  table.json('data').comment('User preferences data in json format');
  table.uuid('created_by', 30).notNull().comment('Created By for user_uid');
  table.uuid('config', 11);
  table.timestamps();
  table.foreign('created_by').references('user_uid').inTable('user');
});

exports.down = (knex, Promise) => Promise.all([
  knex.schema.withSchema('public').dropTableIfExists('preferences'),
]);
