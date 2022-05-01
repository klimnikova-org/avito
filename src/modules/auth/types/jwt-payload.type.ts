export type JwtPayload = {
    email: string;
    sub: number;
    iat: string;
    exp: string;
    sessionId: string;
};
