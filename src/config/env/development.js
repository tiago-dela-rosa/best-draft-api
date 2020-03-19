module.exports = {
    api: {
        port: process.env.DEV_PORT
    },
    db: {
        client: 'pg',
        connection: {
            type: 'postgres',
            host: 'localhost',
            port: '5432',
            username: 'tiago',
            password: 'tiago123',
            database: 'bestdraft',
            entitySchemas: [
                require("../../db/entities/User.js")
            ]
        },
        migrations: {
            directory: './../../db/migrations'
        },
        seeds: {
            directory: './../../db/seeds'
        }
    }
}