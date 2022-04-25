import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { REFRESH_SECRET } from '../constants';
import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
            secretOrKey: REFRESH_SECRET,
            passReqToCallback: true,
        });
    }

    validate(req: Request, payload: JwtPayload) {
        const refreshToken = req?.body.refreshToken;

        if (!refreshToken) {
            throw new ForbiddenException('Refresh token malformed');
        }

        return {
            id: payload.sub,
            email: payload.email,
            exp: payload.exp,
            refreshToken,
        };
    }
}
