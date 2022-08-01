import { controllers } from '../controllers'

export const auth = [
    {
        method: 'GET',
        path: '/home',
        handler: (req, h) => h.view('home', {user: req.auth.credentials, }),
    },
    {
        method: 'post',
        path: '/logout',
        handler: controllers.auth.logout,
    },
    {
        method: 'get',
        path: '/register-thirdparty',
        handler: (req, h) => h.view('registerThirdParty', {user: req.auth.credentials, }),
    },
    {
        method: 'post',
        path: '/register-thirdparty',
        handler: controllers.thirdParty.register,
    },
    {
        method: 'get',
        path: '/register-accident',
        handler: controllers.accident.get,
    },
    {
        method: 'post',
        path: '/register-accident',
        handler: controllers.accident.register,
    },
    {
        method: 'get',
        path: '/my-account',
        handler: controllers.user.getUser,
    },
    {
        method: 'post',
        path: '/user/update',
        handler: controllers.user.updateUser,
    },
    {
        method: 'get',
        path: '/list-thirdparty',
        handler: controllers.thirdParty.list,
    },
    {
        method: 'get',
        path: '/list-accidents',
        handler: controllers.accident.list,
    }
]
