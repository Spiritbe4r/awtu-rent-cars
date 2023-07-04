export interface IAuthResponse {
    accessToken: string;
    payload: Payload;
}

interface Payload {
    email?: string;
    userId?: string;
    isAdmin: boolean;
}