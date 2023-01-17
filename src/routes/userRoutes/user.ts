import { Router } from 'express'

import createUser from '../../controllers/userController/createUser'
import updateUser from '../../controllers/userController/updateUser'
import { imageUpload } from '../../middlewares/imageUpload'

const routes = Router()

routes.post('/', createUser.index)
// routes.patch('/', imageUpload.single('image'), updateUser.index)

export {
    routes 
}
