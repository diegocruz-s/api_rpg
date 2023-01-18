
import { UserFactory } from "../factories/factories"
import request from 'supertest'
import app from "../../src/app"
import { prisma } from "../../src/database/prisma/db"

describe('Session', () => {    
    beforeEach(async () => {
        await prisma.$executeRawUnsafe(`TRUNCATE TABLE user`)
    })

    it('should login user', async () => {
        
        const user = UserFactory({
            email: 'diego@gmail.com',
            password: 'Diego@123'
        })

        await request(app).post('/users').send(user).expect(201)

        const response = await request(app).post('/session').send({
            email: 'diego@gmail.com',
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
            email: 'diego@gmail.com',
            password: 'Diego@123'
        })

        await request(app).post('/users').send(user).expect(201)

        const response = await request(app).post('/session').send({
            email: 'diego@gmail.com',
            password: 'Diego@123'
        }).expect(201)

        expect(response.body).toHaveProperty('token')
    })

    it('should return 422 when email is incorrect', async () => {
        const user = UserFactory({
            email: 'diego@gmail.com',
            password: 'Diego@123'
        })

        await request(app).post('/users').send(user).expect(201)

        const response = await request(app).post('/session').send({
            email: 'diego',
            password: 'Diego@123'
        }).expect(422)

        expect(response.body).toHaveProperty('error')
        expect(response.body.error.code).toEqual('BAD_REQUEST')
        expect(response.body.error.status).toEqual(422)
        expect(response.body.error.message.includes('email')).toBeTruthy()
    })

    it('should return 422 when password is incorrect', async () => {
        const user = UserFactory({
            email: 'diego@gmail.com',
            password: 'Diego@123'
        })

        await request(app).post('/users').send(user).expect(201)

        const response = await request(app).post('/session').send({
            email: 'diego@gmail.com',
            password: 'dieg'
        }).expect(422)

        expect(response.body).toHaveProperty('error')
        expect(response.body.error.code).toEqual('BAD_REQUEST')
        expect(response.body.error.status).toEqual(422)
        expect(response.body.error.message.includes('Password')).toBeTruthy()
    })

    it('should return 422 when datas is not provided', async () => {
        const user = UserFactory({
            email: 'diego@gmail.com',
            password: 'Diego@123'
        })

        await request(app).post('/users').send(user).expect(201)

        const response = await request(app).post('/session').send({}).expect(422)

        expect(response.body).toHaveProperty('error')
        expect(response.body.error.code).toEqual('BAD_REQUEST')
        expect(response.body.error.status).toEqual(422)
        expect(response.body.error.message.includes('Invalid datas')).toBeTruthy()
    })

    it('should return 404 when email not used by a user', async () => {
        const user = UserFactory({
            email: 'diego@gmail.com',
            password: 'Diego@123'
        })

        await request(app).post('/users').send(user).expect(201)

        const response = await request(app).post('/session').send({
            email: 'alex@gmail.com',
            password: 'Diego@123'
        }).expect(404)

        expect(response.body).toHaveProperty('error')
        expect(response.body.error.code).toEqual('BAD_REQUEST')
        expect(response.body.error.status).toEqual(404)
        expect(response.body.error.message.includes('Authentication')).toBeTruthy()
    })

    it('should return 404 when password not match by user', async () => {
        const user = UserFactory({
            email: 'diego@gmail.com',
            password: 'Diego@123'
        })

        await request(app).post('/users').send(user).expect(201)

        const response = await request(app).post('/session').send({
            email: 'diego@gmail.com',
            password: 'teste@123'
        }).expect(404)

        expect(response.body).toHaveProperty('error')
        expect(response.body.error.code).toEqual('BAD_REQUEST')
        expect(response.body.error.status).toEqual(404)
        expect(response.body.error.message.includes('Authentication')).toBeTruthy()
    })
})
