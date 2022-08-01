import { Request, ResponseToolkit } from "@hapi/hapi";

export default function redirectFallback(req: Request, session: ResponseToolkit) {
    return session.redirect('/home')
}
 