/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('tasks', table => {
        table.increments('id').primary()
        table.string('desc').notNull()
        table.string('estimateAt')
        table.string('doneAt')
        table.integer('userId').references('id').inTable('users').notNull()
    });
    //retorne uma promessa que cria uma tabela chamada 'tasks' com os campos id, description, estimateAt, doneAt e user_id
    //o campo user_id é uma chave estrangeira que referencia a tabela 'users' e o campo 'id'
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
        
     return knex.schema.dropTable('tasks')
     //retorne uma promessa que deleta a tabela 'tasks'
  
};
