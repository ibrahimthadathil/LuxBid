import { Request, Response } from "express";
import Container, { Service } from "typedi";
import { stripeService } from "../../../service/implements/stripe/stripeService";
import { AuthRequest } from "../../../types/api";


// @Service()
// class stripeContoller{
//     constructor(private stripeService :stripeService){}
//     async make_Payment(req:Request,res:Response){        
//         try {
//           const session = await this.stripeService.makePaymentSession(req.body)
//           if(session)res.send({clientSecret: session.client_secret})
//           else throw new Error('failed to send the session')  
//         } catch (error) {
//             console.log('errr from stripe 121212');
//             console.log((error as Error).message);
            
//         }
//     }

//     async payment_Status(req:AuthRequest,res:Response){
//         const user = req.user 
//       try {
//         const response = await this.stripeService.payment_Status(req.query,user?._id as string)    
//         if(response)res.send({
//           status: response.status,
//           customer_email: response.customer_details.email
//         })
//       } catch (error) {
    
//         res.status(500)
//       }
//     }
// }

// export const stripe_Contoller = Container.get(stripeContoller)

