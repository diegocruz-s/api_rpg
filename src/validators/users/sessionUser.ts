import { z } from "zod";

// const regexName = /[A-Z][a-z]* [A-Z][a-z]*/

const sessionSchema = z.object({
    email: z.string().email({ message: 'Incorrect email.' }),
    password: z.string().min(6, { message: 'Password must have 6 caracteres.' }),
})

export {
    sessionSchema
}