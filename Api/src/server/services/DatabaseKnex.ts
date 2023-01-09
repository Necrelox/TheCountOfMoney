import { Knex, knex } from 'knex';
import Transaction = Knex.Transaction;

export type { Transaction };

export interface ErrorDatabase extends Error {
    code?: string | number;
    errno?: number;
    sqlState?: string;
    sqlMessage?: string;
    sql?: string;
    stack?: string;
}

export class DatabaseKnex {
    private static instance: Knex;

    public static initializeDatabasePool() {
        DatabaseKnex.instance = knex({
            client: 'mysql2',
            connection: {
                host: process.env.MYSQL_HOST,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                port: Number(process.env.MYSQL_PORT) || 3306,
            },
            pool: {
                min: 0,
                max: 10,
            },
            acquireConnectionTimeout: 10000,
        });
    }

    public static getInstance() {
        return DatabaseKnex.instance;
    }
}
