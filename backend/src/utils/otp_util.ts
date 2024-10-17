

export const generate_OTP= ():string =>{

    const OTP = Math.floor(100000+Math.random()*900000) + ''
    

    return OTP
}

