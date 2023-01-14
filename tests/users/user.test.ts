/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import request from 'supertest'
import app from "../../src/app";
import { UserFactory } from '../factories/factories';
import { Error } from '../../src/interfaces/Error';

describe('User', () => {

    // Create user
    it('should create a user', async () => {
        const user = {
            email: 'diego@gmail.com',
            name: 'Diego Cruz',
            password: 'Diego@123456',
            username: 'dsc__00',
        }
        const response = await request(app).post('/users').send(user)

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('id')
        expect(response.body.user.email).toEqual(user.email)
        expect(response.body.user.name).toEqual(user.name)
        expect(response.body.user.password).toBeFalsy()
        expect(response.body.user.username).toEqual(user.username)
        expect(response.body.user).toHaveProperty('image')
    })

    it('should return 409 when email is already exists', async () => {
        const user = UserFactory({ email: 'diego@gmail.com' })
        await request(app).post('/users').send(user)

        const newUser = UserFactory({ email: 'diego@gmail.com' })
        const response = await request(app).post('/users').send(newUser)

        expect(response.body).toHaveProperty('error')
        expect(response.body.error.status).toEqual(409)
        expect(response.body.error.message.includes('Email')).toBeTruthy()
        expect(response.body.error.code).toEqual('BAD_REQUEST')

    })

    it('should return 409 when username is already exists', async () => {
        const user = UserFactory({ username: 'dsc_00' })
        await request(app).post('/users').send(user)

        const newUser = UserFactory({ username: 'dsc_00' })
        const response = await request(app).post('/users').send(newUser)

        expect(response.body).toHaveProperty('error')
        expect(response.body.error.status).toEqual(409)
        expect(response.body.error.message.includes('Username')).toBeTruthy()
        expect(response.body.error.code).toEqual('BAD_REQUEST')

    })

    it('should return 422 when email is incorrect', async () => {
        const user = UserFactory({ email: 'diego' })

        const response = await request(app).post('/users').send(user)

        console.log(response.body.error)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error.code).toEqual('BAD_REQUEST')
        expect(response.body.error.status).toEqual(422)
        expect(response.body.error.message.includes('email')).toBeTruthy()

    })

    it('should return 422 when password is incorrect', async () => {
        const user = UserFactory({ password: 'ab12s' })

        const response = await request(app).post('/users').send(user)

        expect(response.body).toHaveProperty('error')
        expect(response.body.error.code).toEqual('BAD_REQUEST')
        expect(response.body.error.status).toEqual(422)
        expect(response.body.error.message.includes('Password')).toBeTruthy()

    })

    it('should return 422 when data is not provided', async () => {
        const response = await request(app).post('/users').send({})

        expect(response.body).toHaveProperty('error')
        expect(response.body.error.code).toEqual('BAD_REQUEST')
        expect(response.body.error.status).toEqual(422)
        expect(response.body.error.message).toEqual('Invalid datas')
    })

})