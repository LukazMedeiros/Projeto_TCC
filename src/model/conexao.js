const connection = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./src/database/db_test.sqlite3"
  },
  useNullAsDefault: true,
});
  
  module.exports = connection;