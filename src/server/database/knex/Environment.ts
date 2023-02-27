import {Knex} from 'knex';
import { pathsToModuleNameMapper } from 'ts-jest';
import path from 'path';
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

/* 
// sqlite
export const development: Knex.Config = { 
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: path.resolve(__dirname,'..','..','..','..','database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname,'','migrations')
    },
    seeds: {
        directory: path.resolve(__dirname,'','seeds')
    },
    pool:  {
        afterCreate: (connection: any, done: Function) => {
            connection.run('PRAGMA foreign_keys = ON');
            done();
        },
    },
};
*/

// mysql local
export const development: Knex.Config = { 
    client: 'mysql',
      migrations: {
        directory: path.resolve(__dirname,'','migrations')
    },
    seeds: {
        directory: path.resolve(__dirname,'','seeds')
    },
    
    connection: {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB
      }
};

export const production: Knex.Config = { 
    client: 'mysql',
      migrations: {
        directory: path.resolve(__dirname,'','migrations')
    },
    seeds: {
        directory: path.resolve(__dirname,'','seeds')
    },
    connection: {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DB
      }
};

export const test: Knex.Config = {
    ...development,
    connection: ':memory:',
 };

