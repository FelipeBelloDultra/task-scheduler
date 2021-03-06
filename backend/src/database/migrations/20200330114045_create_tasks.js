exports.up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments();

    table.string('type').notNullable();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.enu('check', [true, false]).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('tasks');
};
