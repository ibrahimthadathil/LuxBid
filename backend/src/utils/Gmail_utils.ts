import nodemailer from "nodemailer";

export const sendOTPMail = async( email:string ,matter:string , otp:string )=>{
    let transporter = nodemailer.createTransport({  
    
        service : 'gmail' ,
        auth :{
            user : process.env.EMAIL_USER ,
            pass : process.env.PASSWORD_USER , 
        }
    
    })
    
    let mailOptions = {
        from : process.env.EMAIL_USER ,
        to : email,
        subject : 'Verify Your Email to Complete The process on LuxBid' ,
        html : `
        <div style="font-family: Arial, sans-serif; color: #333;">
        <h1 style="color: white; background-color: #5B4BAE; padding: 10px; text-align: center;">
        Welcome to LuxBid!
        </h1>
        <p style="font-size: 16px;">
          Please enter the OTP to verify your email and complete your process of <strong>${matter}</strong>:
        </p>
        <div style="text-align: center;">
         <h3 style=" padding: 25px; display: inline-block; border: 2px solid #5B4BAE; border-radius: 8px;">
        Verification: ${otp}
        </h3>
        </div>
        <p style="font-size: 14px;">Thank you for joining us!</p>
        <p style="font-size: 14px;">
        Best regards,<br>LuxBid Team
        </p>
        </div> `
    }

        transporter.sendMail(mailOptions, function (error, info) {

        if (error) {

          console.log("Error sending mail :- ", error.message);

        } else {

          console.log("Email has been sended :- ", info.response);

        }

      })
}