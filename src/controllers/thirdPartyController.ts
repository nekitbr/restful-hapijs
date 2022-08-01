import { genSaltSync, hashSync } from "bcrypt"
import { getRepository } from "typeorm"
import User, { UserType } from "../models/User"


export async function list(req, h, err?: Error) {
    try {
        const userRepo = getRepository(User)

        const users = await userRepo.findBy({thirdPartyRelation: true})

        return h.view('listThirdParties', {user: req.auth.credentials, thirdParties: users})
    } catch(err) {
        console.error(err)
    }
}

export const register = async (req, h, err?: Error) => {
    const userRepo = getRepository(User)

    try {
        const { firstName, lastName, email, cpf, thirdPartyRelation, role } = req.payload as Partial<User>

        console.log(`aqui`)

        const user: Partial<User> = new User(firstName, lastName, email, cpf, !!thirdPartyRelation, undefined, undefined, role)

        await userRepo.save<Partial<User>>(user)

        req.cookieAuth.set({ cpf: cpf, name: firstName + ' ' + lastName })
        return h.view('home', { user })
    } catch (err) {
        console.error(err)
        return {}
    }
}