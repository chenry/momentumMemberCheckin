/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('test_table', function (table) {
      table.increments('test_id');
      table.string('test_name');
      table.string('test_description');
      table.string('testColumn1');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('test_table');
};
