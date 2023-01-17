
import FormData from 'form-data';
import fs from 'fs'
import { UserFactory } from "../factories/factories"
import request from 'supertest'
import app from "../../src/app"

describe('User', () => {
    // Create user
    it('should create a user', async () => {
        const user = {
            email: 'alex123@gmail.com',
            name: 'Diego Cruz',
            password: 'Diego@123456',
            username: 'asc123__00',
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

    //update user

})

    // id?: string
    // name: string
    // email: string
    // username: string
    // password: string
    // image?: string | null

// // // /**
// // //  * @jest-environment ./prisma/prisma-environment-jest
// // //  */
// // // import { UserFactory } from "../factories/factories"
// // // import request from 'supertest'
// // // import app from "../../src/app"
// // // import { prisma } from "../../src/database/prisma/db"

// describe('Session', () => {    
//     it('should login user', async () => {
        
//         const user = UserFactory({
//             email: 'diego123@gmail.com',
//             password: 'Diego@123'
//         })

//         await request(app).post('/users').send(user).expect(201)

//         const response = await request(app).post('/session').send({
//             email: 'diego123@gmail.com',
//             password: 'Diego@123'
//         }).expect(201)

//         expect(response.body).toHaveProperty('user')
//         expect(response.body.user).toHaveProperty('id')
//         expect(response.body.user.email).toEqual(user.email)
//         expect(response.body.user.username).toEqual(user.username)
//         expect(response.body.user.password).toBeFalsy()

//     })

//     it('should return an api token when sessions is created', async () => {
//         const user = UserFactory({
//             email: 'alex@gmail.com',
//             password: 'Alex@123'
//         })

//         await request(app).post('/users').send(user).expect(201)

//         const response = await request(app).post('/session').send({
//             email: 'alex@gmail.com',
//             password: 'Alex@123'
//         }).expect(201)

//         expect(response.body).toHaveProperty('token')

//         const allUsers = await prisma.user.findMany()
//         console.log('allUsers:', allUsers)
//     })
// })
