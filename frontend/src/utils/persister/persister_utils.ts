
import { encryptTransform } from 'redux-persist-transform-encrypt';

export const encryptor = encryptTransform({
    secretKey: import.meta.env.VITE_PERSISTER_KEY,
    onError:(error:Error)=> {
        console.error("Encryption error:", error);
    },
})