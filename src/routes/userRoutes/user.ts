import { Router } from 'express'

import createUser from '../../controllers/userController/createUser'
import { imageUpload } from '../../middlewares/imageUpload'

const routes = Router()

routes.post('/', createUser.index)
routes.put('/', imageUpload.single('image'),createUser.abc)

export {
    routes 
}
