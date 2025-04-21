const rateLimit = require('express-rate-limit');

export const apiLimiter = (windowMs:number,max:number)=>{

  return rateLimit({
   windowMs,
   max,// limit each IP to 100 requests per window
   standardHeaders: true, // Return rate limit info in headers
   legacyHeaders: false,  // Disable `X-RateLimit-*` headers
   message: 'Too many requests , please try again later.',
 });
}


