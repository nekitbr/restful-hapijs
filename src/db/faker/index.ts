import { name, internet, random, lorem, br } from 'faker-br'
import { Condition, DataSource, Repository, FindManyOptions } from 'typeorm'
import User, { UserType } from '../../models/User'
import { performance } from 'perf_hooks'
import 'colors'
import { genSaltSync, hashSync } from 'bcrypt'

export const fakeUsers = async (db: DataSource, amount: number = 15) => {
    const userRepo: Repository<User> = db.getRepository(User)
    const usedEmails: Array<string> = []

    console.log('Populating users table...'.green)

    const start: number = performance.now()
    for (let i = 0; i < amount; i++) {
        const firstName = name.firstName()
        const lastName = name.lastName()
        let email = internet.email()
        let cpf = br.cpf()
        const thirdPartyRelation = Math.random() > 0.5
        console.log('thirdparty', Math.random() > 0.5)
        const salt = genSaltSync()
        const password = hashSync('secret', salt)
        const role: UserType = random.arrayElement(Object.values(UserType))

        let emailWhile: number;
        while(usedEmails.includes(email)) {
            email = internet.email()
            emailWhile++

            if(emailWhile > 100) break
        }

        if(emailWhile > 100) break

        console.log()
        usedEmails.push(email)

        const user: Partial<User> = new User(firstName, lastName, email, cpf, thirdPartyRelation, password, salt, role)

        await userRepo.save<Partial<User>>(user);
    }
    const end: number = performance.now()
    const timeMs = end - start

    console.log(`Finished populating users table in ${timeMs > 1000 ? `${(timeMs / 1000).toFixed(3)} sec` : `${Math.round(timeMs)} ms`} !`.green)
}

// export const fakePosts = async (db: DataSource) => {
//     const postRepo: Repository<Post> = db.getRepository(Post)
//     const userRepo: Repository<User> = db.getRepository(User)
//     const users = await userRepo.find()
//     console.log(users)

//     console.log('Populating posts table...'.green)
//     let count = 0

//     const start: number = performance.now()
//     for(const key in users){
//         const user = users[key]
//         const body = lorem.paragraphs()

//         const post: Partial<Post> = new Post(body, user)

//         await postRepo.save<Partial<Post>>(post)

//         const shouldSaveTwo = Math.random() > 0.5
//         if(shouldSaveTwo){
//             const body = lorem.paragraphs()
//             const post: Partial<Post> = new Post(body, user)
//             await postRepo.save<Partial<Post>>(post)
//             count++
//         }
//         count++
//     }
//     const end: number = performance.now()
//     const timeMs = end - start

//     console.log(`Finished populating ${count} items on posts table in ${timeMs > 1000 ? `${(timeMs / 1000).toFixed(3)} sec` : `${Math.round(timeMs)} ms`} !`.green)


//     // console.log(users)
// }
