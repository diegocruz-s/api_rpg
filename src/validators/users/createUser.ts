import { z } from "zod";

// const regexName = /[A-Z][a-z]* [A-Z][a-z]*/

const userSchema = z.object({
    name: z.string().min(4, { message: 'Name must have 4 caracteres.' }),
    email: z.string().email({ message: 'Incorrect email.' }),
    password: z.string().min(6, { message: 'Password must have 6 caracteres.' }),
    username: z.string().min(3, { message: 'Username must be at least 6 characters long.' }),
    //image: z.optional(z.string().url({ message: 'Image must have a URL.' }) || z.null())
})

export {
    userSchema
}

// image, username