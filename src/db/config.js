module.exports = {
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'tiago',
        password: 'tiago123',
        database: 'bestdraft'
    },
    migrations: {
        directory: './migrations'
    },
    seeds: {
        directory: './seeds'
    }
};
