import { Request, Response } from 'express'

class Test {
    public async index (req: Request, res: Response) {
        return res.status(200).json({ message: 'Ok group!' })
    }
}

export default new Test()
