import { getRepository } from "typeorm"
import Accident from "../models/Accident"
import User, { UserType } from "../models/User"


export async function get(req, h, err?: Error) {
    const userRepo = getRepository(User)

    const users = await userRepo.findBy({role: UserType.thirdParty})

    return h.view('registerAccident', {user: req.auth.credentials, thirdParty: users})
}

export const register = async (req, h, err?: Error) => {
    try {

        const userRepo = getRepository(User)
        const accidentRepo = getRepository(Accident)

        const {title, description, vehiclePlate, thirdPartyId} = req.payload
        const createdBy_UserInfo = req.auth.credentials

        const createdBy_User: User = await userRepo.findOneBy({id: createdBy_UserInfo.id})
        const thirdParty_User: User = await userRepo.findOneBy({id: thirdPartyId})
        thirdParty_User.thirdPartyRelation = true

        const savedThirdParty_User: User = await userRepo.save(thirdParty_User)

        const accident: Partial<Accident> = new Accident(title, description, vehiclePlate ? vehiclePlate : undefined, savedThirdParty_User, createdBy_User)

        return await accidentRepo.save(accident)
    } catch (err) {
        console.error(err)
    }
}

export const list = async (req, h, err?: Error) => {
    try {
        const accidentsRepo = getRepository(Accident)

        const accidents = await accidentsRepo.find({
            relations: ['thirdParty', 'createdByUser']
        })
        console.log(accidents[0])

        return h.view('listAccidents', {user: req.auth.credentials, accidents})
    } catch (err) {
        console.error(err)
    }
}
