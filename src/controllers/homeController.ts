import { ResponseToolkit, Request } from 'hapi'

export function get(request: Request, h: ResponseToolkit, err?: Error) {
    return { data: 'Hello World' }
}

export function post(request: Request, h: ResponseToolkit, err?: Error) {
    return {data: 'post'}
}