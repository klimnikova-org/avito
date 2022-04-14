import { DataSource } from 'typeorm';

import { UserEntity } from './modules/users/model/user.entitiy';

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const somethingIsNotDefined = [
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
].some((it) => it === undefined);

if (somethingIsNotDefined) {
    throw new Error(`One or more environmental variables are not defined`);
}

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize: true,
    logging: true,
    entities: [UserEntity],
    subscribers: [],
    migrations: [],
});
