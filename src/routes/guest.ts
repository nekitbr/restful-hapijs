import path = require('path')
import { controllers } from '../controllers'

export const guest = [
    {
        method: 'get',
        path: '/login',
        handler: (req, h) => h.view('login', req.auth.credentials),
    },
    {
        method: 'post',
        path: '/login',
        handler: controllers.auth.login,
    },
    {
        method: 'get',
        path: '/register',
        handler: (req, h) => h.view('register', req.auth.credentials),
    },
    {
        method: 'post',
        path: '/register',
        handler: controllers.user.register,
    },
    {
        method: 'get',
        path: '/public/{filename}',
        handler: (req, h) => h.file(`${req.params.filename}`),
        options: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    },
].map(r => {
    return {
        ...r, 
        options: {
            auth: {
                mode: 'try',
            },
        },
    }
})
