import { Request, Response } from 'express'
import { prisma } from '../../database/prisma/db'
import bcrypt, { compareSync } from 'bcryptjs'
import { Error } from '../../interfaces/Error'
import { generateToken } from '../../helpers/generateToken'
import { sessionSchema } from '../../validators/users/sessionUser'

class SessionController {
    public async login (req: Request, res: Response) {
        try {
            const { email, password } = sessionSchema.parse(req.body)

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if(!user) {
                const error: Error = {
                    code: 'BAD_REQUEST',
                    message: 'Authentication invalid',
                    status: 404
                }
                return res.status(+error.status).json({ error })
            }
    
            const checkPassword = compareSync(password, user?.password)
    
            if(!checkPassword) {
                const error: Error = {
                    code: 'BAD_REQUEST',
                    message: 'Authentication invalid',
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
        } catch (err: any) {
            let error: Error | Error[];
            if(err.issues.length > 1){
                error = {
                    code: 'BAD_REQUEST',
                    message: 'Invalid datas',
                    status: 422
                }
            }else {
                error = {
                    code: 'BAD_REQUEST',
                    message: err.issues[0].message,
                    status: 422
                }
            }
            return res.status(+error.status).json({ error })
        }
        
    }
}

export default new SessionController()