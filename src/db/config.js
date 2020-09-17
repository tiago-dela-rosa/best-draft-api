const config = require('../config');

module.exports = {
  client: 'pg',
  connection: {
    host: config.db.connection.host,
    user: config.db.connection.username,
    password: config.db.connection.secret,
    database: config.db.connection.database,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};
