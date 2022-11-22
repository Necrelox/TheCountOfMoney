require('dotenv').config();

/**
 * @type { Object.<string, import('knex').Knex.Config> }
 */
module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            user: 'ruby',
            password: 'gw86!e7h',
            database: 'TheCountOfMoney',
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'MIGRATION',
        }
    },

    staging: {
        client: 'mysql2',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'MIGRATION'
        }
    },

    production: {
        client: 'mysql2',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'MIGRATION'
        }
    }

};
