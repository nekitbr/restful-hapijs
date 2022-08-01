import { genSaltSync, hashSync } from 'bcrypt'
import { getRepository } from 'typeorm'
import User, { UserType } from '../models/User'

export async function get(req, h, err?: Error) {
    try{
        const userRepo = getRepository(User)

        const users = await userRepo.find()
        
        return {data: users}
    }catch(err){
        console.log(err)
        return h.response().code(200)
    }
}

export const getUser = async (req, h, err?: Error) => {
    try {
        const userRepo = getRepository(User)

        const {id: userId} = req.auth.credentials

        const user: User = await userRepo.findOneBy({id: userId})

        return h.view('editUser', {user})
    } catch (err) {
        console.error(err)
    }
}

export const register = async (req, h, err?: Error) => {
    try {
        const userRepo = getRepository(User)

        const { firstName, lastName, email, cpf, thirdPartyRelation, password, role } = req.payload
        const previousUser = await userRepo.findOneBy({cpf})

        const salt = genSaltSync()
        const hashedPassword = hashSync(password, salt)

        const existingUser: User = await userRepo.findOneBy({cpf})

        if(existingUser){
            existingUser.password = hashedPassword
            existingUser.salt = salt
            existingUser.role = UserType.user

            await userRepo.update({cpf}, existingUser)

            req.cookieAuth.set({ id: existingUser.id, cpf: existingUser.cpf, password: existingUser.password, name: existingUser.firstName + ' ' + existingUser.lastName })
            return h.view('home', { user: existingUser })
        } else {
            const user: Partial<User> = new User(firstName, lastName, email, cpf, previousUser?.thirdPartyRelation ?? !!thirdPartyRelation, hashedPassword, salt, role)
            const savedUser: User = await userRepo.save<Partial<User>>(user)

            req.cookieAuth.set({ id: savedUser.id, cpf: savedUser.cpf, password: savedUser.password, name: savedUser.firstName + ' ' + savedUser.lastName })
            return h.view('home', { user })
        }
    } catch (err) {
        console.error(err)
    }
}

export const updateUser = async (req, h, err?: Error) => {
    try {
        const userRepo = getRepository(User)

        const {newPassword, newEmail} = req.payload
        const {id: userId} = req.auth.credentials

        const user: User = await userRepo.findOneBy({id: userId})

        console.log({newPassword, newEmail, userId}, user)

        if(newPassword){
            const salt = genSaltSync()
            const hashedPassword = hashSync(newPassword, salt)
    
            user.password = hashedPassword
            user.salt = salt
        }

        user.email = newEmail

        await userRepo.save(user)

        return h.response().code(200)
    } catch (err) {
        console.error(err)
    }
}
