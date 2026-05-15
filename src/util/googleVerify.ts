import { OAuth2Client } from "google-auth-library";

import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';

const client  = new OAuth2Client(GOOGLE_CLIENT_ID);

export interface GoogleUserPayload {
    sub: string;
    email: string;
    email_verified: boolean;
    name: string;
    picture: string;
}

export async function verifyGoogleIdToken(idToken:string): Promise<GoogleUserPayload> {

    const ticket = await client.verifyIdToken({
        idToken,
        audience: GOOGLE_CLIENT_ID
    });
    console.log("Ticket>>>>", ticket);

    const payload = ticket.getPayload();
    console.log("Ticket2>>>>", payload);

    if(!payload){
        throw new Error('No payload in Google Token')
    }

    return payload as GoogleUserPayload
}