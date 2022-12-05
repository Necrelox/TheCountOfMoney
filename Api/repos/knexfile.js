require('dotenv').config({
    path: '../.env'
})

/**
 * @type { Object.<string, import('knex').Knex.Config> }
 */
module.exports = {
    development: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'MIGRATION',
        }
    },
    production: {
        client: 'mysql2',
        connection: {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'MIGRATION',
        }
    },
};
