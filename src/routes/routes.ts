import express, { Router } from 'express'
import { routes as usersRoutes } from './userRoutes/user'
import { routes as groupsRoutes } from './groupRoutes/group'
import { routes as sessionRoutes } from './sessionRoutes/session'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/groups', groupsRoutes)
routes.use('/session', sessionRoutes)

export {
    routes
}
