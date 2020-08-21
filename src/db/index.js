import { createConnection, getManager, getRepository } from 'typeorm';

class Database {
    static async connect(settings) {
        const connection = await createConnection(settings);

        return connection;
    }

    getRepository(target) {
        return getManager().getRepository(target);
    }

    createQueryBuilder(target, table) {
        return getRepository(target).createQueryBuilder(table);
    }

    async executeNativeQuery(query) {
        const result = await getManager().query(query);

        return result;
    }

    async check() {
        const now = await this.executeNativeQuery('SELECT now();');

        if (now.length !== 0 && now[0].now !== undefined) return true;

        return false;
    }
}

export default Database;
