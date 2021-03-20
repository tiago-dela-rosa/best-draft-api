import * as path from 'path';

module.exports = {
  api: {
    port: process.env.DEV_PORT,
  },
  db: {
    client: 'pg',
    connection: {
      database: process.env.DEV_DB_DATABASE,
      entities: [path.resolve(__dirname, '../../domain/models/**/index.js')],
      host: process.env.DEV_DB_HOST,
      password: process.env.DEV_DB_SECRET,
      port: process.env.DEV_DB_PORT,
      type: 'postgres',
      username: process.env.DEV_DB_USER,
      extra: {
        ssl: true,
        rejectUnauthorized: false,
      },
    },
    migrations: {
      directory: './../../db/migrations',
    },
    seeds: {
      directory: './../../db/seeds',
    },
  },
};
