const config = require('../knexfile.js');
const knex = require('knex')(config);

knex.migrate.latest([config]);
//initializing the connection with the database

module.exports = knex;
//exporting the connection with the database 