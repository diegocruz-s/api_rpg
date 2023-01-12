import { Router } from 'express'
import Test from '../../controllers/userController/test'

const routes = Router()

routes.get('/', Test.index)

export {
    routes 
}
