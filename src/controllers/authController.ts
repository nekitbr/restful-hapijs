import { Connection, getRepository, Repository } from 'typeorm';
import User, { UserType } from '../models/User';
import { genSalt, genSaltSync, hashSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { string, object, date } from '@hapi/joi';
import { ServerRoute, Request, ResponseToolkit } from '@hapi/hapi';
import { unauthorized } from '@hapi/boom';

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

export const authController = (con: Connection): Array<ServerRoute> => {
    const userRepo: Repository<User> = con.getRepository(User);
    return [
        {
            method: 'POST',
            path: '/login',
            async handler({ auth: { credentials } }: Request) {
                return {
                    ...credentials,
                    accessToken: sign({ ...credentials }, 'getMeFromEnvFile'),
                };
            },
            options: {
                auth: {
                    strategy: 'basic',
                },
            },
        },
        // {
        //     method: 'POST',
        //     path: '/register',
        //     async handler({ payload }: Request) {
        //         try {
        //             const {
        //                 firstName,
        //                 lastName,
        //                 email,
        //                 password,
        //                 birthOfDate,
        //             } = payload as Partial<User>;
        //             const salt = await genSalt();
        //             const u = new User(
        //                 firstName,
        //                 lastName,
        //                 email,
        //                 password,
        //                 salt,
        //                 birthOfDate
        //             );
        //             await userRepo.save(u);
        //             delete u.password;
        //             delete u.salt;
        //             return {
        //                 user: u,
        //                 accessToken: sign({ ...u }, 'getMeFromEnvFile'),
        //             };
        //         } catch (error) {
        //             console.error(error);
        //             return { err: 'something went wrong :(' };
        //         }
        //     },
        //     options: {
        //         auth: false,
        //         validate: {
        //             payload: object({
        //                 firstName: string().required().max(250).min(3),
        //                 lastName: string().required().max(250).min(3),
        //                 email: string().required().max(250).min(4),
        //                 birthOfDate: date().optional().min('1950-01-01').max('2010-01-01'),
        //                 password: string().required().min(5).max(15),
        //             }) as any,
        //             failAction(request: Request, h: ResponseToolkit, err: Error) {
        //                 throw err;
        //             },
        //             options: {
        //                 abortEarly: false,
        //             },
        //         },
        //     },
        // },
    ];
};