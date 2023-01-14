import { Router } from 'express'

import createUser from '../../controllers/userController/createUser'

const routes = Router()

routes.post('/', createUser.index)

export {
    routes 
}
