import express, { Router } from 'express'
import { routes as usersRoutes } from './userRoutes/user'
import { routes as groupsRoutes } from './groupRoutes/group'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/groups', groupsRoutes)

export {
    routes
}
