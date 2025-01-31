import { SubmitErrorHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// for signup
export const ZsignUp =z.object({email:z.string().min(1,'Email is required').email('Enter valid format')}) 
export type TzsignUp = z.infer<typeof ZsignUp> 

//  for register 
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
  );
 
export const Zregister = z.object({
    firstName : z.string().min(3,'3 character is required'),
    lastName:z.string().optional(),
    password : z.string().min(6,' minimum 6 character password').regex(passwordValidation,'Password not in valid formate'),
    Phone : z.string().min(10,'Enter valid phone number').max(10,'Not a valid number'),
    gender: z.enum(["Male", "Female", "Other"],{message:'Select your gender'}),
    policy : z.boolean().refine((value) => value === true, { message:"You must accept the policy to proceed"})
})
export type TZregister = z.infer<typeof Zregister> 

// for signIn 

export const zsignIn = z.object({
  email : z.string().min(1,'Email is required').email(),
  password: z.string().min(6,'Minimum 6 character')
})
export type TzsignIn = z.infer<typeof zsignIn>  


// for reset password 

export const ZresetPass = z.object({
  password : z.string().min(6,' minimum 6 character password').regex(passwordValidation,'Password not in valid formate'),
  confirmPassword : z.string().min(6,' minimum 6 character password').regex(passwordValidation,'Password not in valid formate')
}).refine(data => data.password===data.confirmPassword ,{
  message:'Password not match'
})

export  type TZresetPass = z.infer<typeof ZresetPass>

export const errorFn: SubmitErrorHandler<any> = (err) => {
  Object.values(err).forEach((e:any) => {   
    // if (typeof e === 'object') {
    //   for(let v in e){
    //     toast.error(e[v].message)
    //     // toast.error(v.message)
    //   }
    // }
    toast.error(e.message);
  });
};

// for edit form 


export const ZeditProfile = z.object({
  firstName : z.string().min(3,'Minimum 3 character is required'),
  lastName:z.string().optional(),
  phone : z.string().min(10,'Enter valid phone number').max(10,'Not a valid number'),
  email : z.string().min(1,'Email is required').email(),
})

export type TZprofile = z.infer<typeof ZeditProfile> 


// for address 

export const ZAddress = z.object({
  propertyName: z.string().min(1, { message: 'Property Name is required' }),
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  pincode: z.string().min(1, { message: 'Pincode is required' }).length(6, { message: 'Pincode must be 6 digits' }),
});

export type TZAddress = z.infer<typeof ZAddress>;