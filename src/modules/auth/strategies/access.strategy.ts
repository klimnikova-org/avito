import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { ACCESS_SECRET } from '../constants';

@Injectable()
export class AccessStrategy extends PassportStrategy(Strategy, 'access') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: ACCESS_SECRET,
        });
    }

    async validate(payload: any) {
        return { id: payload.sub, email: payload.email };
    }
}
