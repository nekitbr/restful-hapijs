import 'reflect-metadata'
import { Connection, createConnection } from 'typeorm'
import entities from '../models'
import { fakeUsers } from './faker'

async function populateFakeData(dataSource: Connection) {
    await fakeUsers(dataSource)
}

export const initPostgresDb = async (): Promise<Connection> => {
    const dataSource = await createConnection({
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        schema: process.env.POSTGRES_SCHEMA,
        synchronize: true,
        logging: process.env.DB_LOGGING.toLowerCase() === 'true',
        entities,
    })

    // populateFakeData(dataSource)

    return dataSource
}
