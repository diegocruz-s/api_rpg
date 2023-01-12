/**
 * @jest-environment ./prisma/prisma-environment-jest
 */

import { sum } from "./sum";
import request from 'supertest'
import app from "../src/app";

describe('Tests jest', () => {

    it('should create a user', async () => {
        const response = await request(app).get('/users')

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('user')
    })
    
})