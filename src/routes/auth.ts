import { controllers } from '../controllers'

export const auth = [
    {
        method: 'GET',
        path: '/',
        handler: controllers.home.get
    },
]
