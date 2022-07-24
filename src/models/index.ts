import * as User from './User'
import * as Post from './Post'

const models = [User, Post]

export function getEntities(){
    const entities = []

    /* data structure: multidimensional array 
        [
            [ 
                {},    <-- something like an exportable type, not useful for us
                ()=>{} <-- that's what we want to return, Entity function
            ], 
            [ 
                {}, 
                ()=>{} 
            ] 
        ]
    */
    for (const i in models) {
        const model = models[i]
        const modelKeys = Object.keys(model)

        for (const i in modelKeys) {
            const value = model[modelKeys[i]]

            if(typeof value !== 'function')
                continue

            entities.push(value)
        }
    }

    return entities
}

// import { UsersEntity } from './users'

// export const entities = [
//     UsersEntity
// ]
