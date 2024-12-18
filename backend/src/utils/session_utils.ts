import 'express-session';
declare module 'express-session' {
    interface SessionData {
      userId?: string | number; // Define the type of userId you'll be storing
    }
}

export const sessionConfig = {
    secret:process.env.SECRET_SESSION||'secret_key',
    resave: false,
    saveUninitialized: true,
}
