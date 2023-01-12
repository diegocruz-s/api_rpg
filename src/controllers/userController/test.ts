import { Request, Response } from 'express'
import { prisma } from '../../database/prisma/db'

class Test {
    public async index (req: Request, res: Response) {
        const newUser = await prisma.user.create({
            data: {
                email: 'alex@gmail.com',
                name: 'Alex Cruz',
                password: 'Alex@123',
                username: 'asc_00',
            }
        })
        return res.status(201).json({ user: newUser })
    }
}

export default new Test()
