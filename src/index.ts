require('dotenv').config({ path: __dirname+'/.env' });
import { Server } from '@hapi/hapi'
import { initPostgresDb } from './db/conn'
import 'colors'
import { auth } from "./routes/auth"
import { guest } from "./routes/guest"
import path = require('path');
import Handlebars = require('handlebars');

process.on('uncaughtException', (err) => {
    console.error(err.name.bgRed.white)
    console.error(err.message.red)
    if(err.stack) console.error(err.stack)

    // log function
})

process.on('warning', (warning) => {
    console.warn(warning.name.bgYellow.green)
    console.warn(warning.message.yellow)
    if(warning.stack) console.warn(warning.stack)
})

const init = async () => {
    const server: Server = new Server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    })

    await server.register([
        {
            plugin: require('@hapi/cookie')
        },
        {
            plugin: require('@hapi/inert')
        },
        {
            plugin: require('@hapi/vision')
        }
    ])

    Handlebars.registerHelper("log", function(value) {
        console.log(value)
    })

    server.views({
        engines: {
            hbs: Handlebars
        },
        path: path.join(__dirname, 'views'),
        layout: 'default'
    })

    server.auth.strategy('session', 'cookie', { 
        cookie: {
            name: 'session',
            password: '3de15fe6-0433-4280-952d-04fae162d0c4',
            isSecure: false,
            ttl: 1000 * 60 * 60 * 24, // 1 day in ms
        },
        redirectTo: '/login',
    })
    server.auth.default('session')

    // @ts-ignore
    server.route([...auth, ...guest]) // <-- throwing error because routes have options: { auth: { mode: 'try' } }, don't know why, probably forgot something about @types.

    await initPostgresDb()
    console.log('\n', ' Database initialized '.bgGreen.black, '\n')

    await server.start()
    console.log(` ${'Server is now running on'.yellow} ${(server.info.uri).green} `)
}

init()
