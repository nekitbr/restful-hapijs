import { Connection, getRepository, Repository } from 'typeorm';
import User from '../models/User';
import { hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi';

export const login = async ( req, h: ResponseToolkit) => {
    const { cpf, password } = req.payload

    const userRepo = getRepository(User)
    const user = await userRepo.createQueryBuilder("users")
        .select('users.cpf', 'cpf')
        .addSelect('users.salt', 'salt')
        .addSelect('users.id', 'id')
        .addSelect('users.password', 'password')
        .addSelect('users.firstName', 'firstName')
        .addSelect('users.lastName', 'lastName')
        .addSelect('users.role', 'role')
        .where(`users.cpf = '${cpf}'`)
        .getRawOne()

    if(!user || user.password !== hashSync(password, user.salt))
        return h.view('login', { error: 'invalid login'})

    req.cookieAuth.set({ id: user.id, name: user.firstName + ' ' + user.lastName, role: user.role })
    return h.view('home', { user })
}

export const logout = async (req: Request, h: ResponseToolkit) => {
    req.cookieAuth.clear()
    return h.redirect('/login')
}
