import { OAuth2Client } from 'google-auth-library';
import { AppError } from '../../../common/error/error.js';



 const client = new OAuth2Client();
export async function verifyGoogleToken(idToken) {
    try {
       
        const ticket = await client.verifyIdToken({ 
            idToken: idToken,
             audience: process.env.GOOGLE_oAUTH_CLIENT_ID});
        return ticket.getPayload();

    } catch (error) {
        throw new AppError('invalid token', 403);
    }

}