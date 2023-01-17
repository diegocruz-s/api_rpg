import { Router } from 'express'
import SessionController from '../../controllers/sessionController/session'


const routes = Router()

routes.post('/', SessionController.login)

export {
    routes 
}
