require('dotenv').config({ path: __dirname+'/.env' });
import * as Hapi from '@hapi/hapi'
import { Server } from 'hapi'
import { initDb } from './db/conn'
import { routes } from './routes'
import 'colors'


const init = async () => {
    const server: Server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST
    })

    server.route(routes.auth)
    server.route(routes.guest)

    await initDb().then(() => {
        console.log('\n', ' Database initialized '.bgGreen.black, '\n')
    })

    server.start().then(() => {
        console.log(` ${'Server is now running on'.yellow} ${(server.info.uri).green} `)
    })
}

process.on('uncaughtException', (err) => {
    console.error(err)

    // log function
})

init()
