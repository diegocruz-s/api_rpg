import cors from 'cors'
import express, { Express } from 'express'

import { routes } from './routes/routes'

import 'dotenv/config'

class AppController {
    app: Express

    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cors())
    }

    routes() {
        this.app.use('/', routes)
    }

}

export default new AppController().app
