import { Router } from 'express'
import Test from '../../controllers/groupController/test'

const routes = Router()

routes.get('/', Test.index)

export {
    routes 
}
