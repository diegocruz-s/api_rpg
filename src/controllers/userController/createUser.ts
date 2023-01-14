import { User } from '@prisma/client'
import { PrismaClientInitializationError, PrismaClientKnownRequestError, PrismaClientRustPanicError, PrismaClientUnknownRequestError, PrismaClientValidationError } from '@prisma/client/runtime'
import { hashSync } from 'bcryptjs'
import { Request, Response } from 'express'
import {IssueData} from 'zod'

import { prisma } from '../../database/prisma/db'
import { Error } from '../../interfaces/Error'
import { userSchema } from '../../validators/users/createUser'

class CreateUser {
    public async index (req: Request, res: Response) {
        try {
            const userValidate = userSchema.parse(req.body)
            const { email, name, username, password } = userValidate
            // check email and username

            const existsUserEmail = await prisma.user.findFirst({ 
                where: {
                    email
                }
            })

            if(existsUserEmail) {
                const error: Error = {
                    code: 'BAD_REQUEST',
                    message: 'Email already used',
                    status: 409
                } 

                return res.status(+error.status).json({ error })
            }

            const existsUserName= await prisma.user.findFirst({ 
                where: {
                    username
                }
            })

            if(existsUserName) {
                const error: Error = {
                    code: 'BAD_REQUEST',
                    message: 'Username already used',
                    status: 409
                } 

                return res.status(+error.status).json({ error })
            }

            const hashPassword = hashSync(password, 10)
            
            const newUserObj = {
                email, 
                name, 
                username, 
                password: hashPassword, 
            }

            const newUser = await prisma.user.create({
                data: newUserObj,
                select: { email: true, id: true, image: true, name: true, username: true, password: false
                }
            })

            return res.status(201).json({ user: newUser })
            

        } catch (err: any) {
            //const error = err.issues
            console.log(err.issues.length)
            let error: Error | Error[];
            if(err.issues.length > 1){
                error = {
                    code: 'BAD_REQUEST',
                    message: 'Invalid datas',
                    status: 422
                }
            }else {
                console.log('errCode: ', err.issues)
                error = {
                    code: 'BAD_REQUEST',
                    message: err.issues[0].message,
                    status: 422
                }
            }
            return res.json({ error })
        }
                
    }
}

export default new CreateUser()
