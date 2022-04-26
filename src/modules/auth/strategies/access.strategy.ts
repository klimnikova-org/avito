import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { ACCESS_SECRET } from '../constants';
import { TokensService } from '../../tokens/tokens.service';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor(private tokensService: TokensService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ACCESS_SECRET,
            passReqToCallback: true,
        });
    }

    async validate(req: Request, payload: any) {
        const accessToken = req.headers['authorization']
            ?.replace('Bearer', '')
            .trim();

        const tokenData = await this.tokensService.findTokenById(
            payload.sessionId,
        );

        // const atMatches = await compare(accessToken, tokenData.hashAccess);
        const atMatches = accessToken === tokenData.hashAccess;

        if (!tokenData.isRevoked && atMatches) {
            return {
                id: payload.sub,
                email: payload.email,
                sessionId: payload.sessionId,
            };
        }
    }
}
