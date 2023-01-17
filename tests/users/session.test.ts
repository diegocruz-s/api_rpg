
import { UserFactory } from "../factories/factories"
import request from 'supertest'
import app from "../../src/app"

describe('Session', () => {    
    it('should login user', async () => {
        
        const user = UserFactory({
            email: 'diego123@gmail.com',
            password: 'Diego@123'
        })

        await request(app).post('/users').send(user).expect(201)

        const response = await request(app).post('/session').send({
            email: 'diego123@gmail.com',
            password: 'Diego@123'
        }).expect(201)

        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('id')
        expect(response.body.user.email).toEqual(user.email)
        expect(response.body.user.username).toEqual(user.username)
        expect(response.body.user.password).toBeFalsy()

    })

    it('should return an api token when sessions is created', async () => {
        const user = UserFactory({
            email: 'alex@gmail.com',
            password: 'Alex@123'
        })

        await request(app).post('/users').send(user).expect(201)

        const response = await request(app).post('/session').send({
            email: 'alex@gmail.com',
            password: 'Alex@123'
        }).expect(201)

        expect(response.body).toHaveProperty('token')
    })
})
