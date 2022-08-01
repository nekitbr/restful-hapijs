import * as user from './userController'
import * as auth from './authController'
import * as thirdParty from './thirdPartyController'
import * as accident from './accidentController'
import fallback from './fallbackController'

export const controllers = {
    user,
    auth,
    thirdParty,
    accident,
}
