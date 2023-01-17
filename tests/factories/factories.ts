import { IUser } from '../../src/interfaces/User'
import { faker } from '@faker-js/faker'
import { randomUUID } from 'crypto'

interface IUserFactory {
    name?: string
    email?: string
    username?: string
    password?: string
    image?: string
}

export function UserFactory(props?: IUserFactory) {
    const user: IUser = {
        name:  props?.name ? props?.name : faker.internet.userName() + ' ' + faker.internet.userName(),
        username: props?.username ? props?.username : faker.internet.userName(),
        email: props?.email ? props?.email : faker.internet.email(),
        password:  props?.password ? props?.password : faker.internet.password(),
    }

    return user 
}


