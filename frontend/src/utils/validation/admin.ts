import { z } from 'zod'



export const adminSignIn = z.object({
    email: z.string().email() ,
    password : z.string().min(8,'Must be at least 8 characters')
})
export type TsignupSchem = z.infer<typeof adminSignIn>