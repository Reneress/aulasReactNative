/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNull();
        table.string('email').notNull().unique();
        table.string('password').notNull();
    });
    //retorne uma promessa que cria uma tabela chamada 'users' com os campos id, name, email e password
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
      
     return knex.schema.dropTable('users');
     //retorne uma promessa que deleta a tabela 'users'
  
};
