import { Request, Response } from 'express'
import { prisma } from '../../database/prisma/db'
import bcrypt, { compareSync } from 'bcryptjs'
import { Error } from '../../interfaces/Error'
import { generateToken } from '../../helpers/generateToken'

class SessionController {
    public async login (req: Request, res: Response) {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if(!user) {
            const error: Error = {
                code: 'BAD_REQUEST',
                message: 'User not found',
                status: 404
            }
            return res.status(+error.status).json({ error })
        }

        const checkPassword = compareSync(password, user?.password)

        if(!checkPassword) {
            const error: Error = {
                code: 'BAD_REQUEST',
                message: 'User not found',
                status: 404
            }
            return res.status(+error.status).json({ error })
        }

        const token = generateToken(user)

        return res.status(201).send({ 
            user: {
                id: user.id,
                email: user.email,
                username: user.username,
                name: user.name,
                image: user.image
            },
            token
        })
    }
}

export default new SessionController()