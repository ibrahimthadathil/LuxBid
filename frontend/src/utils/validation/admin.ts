import { z } from 'zod'



export const adminSignIn = z.object({
    email: z.string().email() ,
    password : z.string().min(8,'Must be at least 8 characters')
})
export type TsignupSchem = z.infer<typeof adminSignIn>


// for category add
export const formSchema = z.object({
    name: z.string().min(2, {
      message: "Category name must be at least 2 characters.",
    }),
    isActive: z.boolean({
      required_error: "You need to select if the category is active.",
    }),
  })

export  type TCateForm =z.infer<typeof formSchema>