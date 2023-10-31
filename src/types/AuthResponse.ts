export interface IAuthResponse {
    authToken: string;
    payload: Payload;
}

interface Payload {
    email?: string;
    userId?: string;
    roles: string[];
}