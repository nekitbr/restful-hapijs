import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import { getEntities } from '../models'
import * as fakeData from './faker'

export const initDb = async (): Promise<Connection> => {
    const host: string = process.env.POSTGRES_HOST
    const port: number = Number(process.env.POSTGRES_PORT)
    const username: string = process.env.POSTGRES_USER
    const password: string = process.env.POSTGRES_PASSWORD
    const database: string = process.env.POSTGRES_DATABASE
    const schema: string = process.env.POSTGRES_SCHEMA
    const entities = getEntities()

    const connection = await createConnection({
        type: "postgres",
        host,
        port,
        username,
        password,
        database,
        entities,
        synchronize: process.env.ENVIRONMENT.toLowerCase() === 'dev' ? true : false,
        logging: false,
        schema,
    });

    // await fakeData.fakeUsers(connection)
    // await fakeData.fakePosts(connection)

    return connection
}
